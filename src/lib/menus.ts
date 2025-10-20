import { db } from './db';
import { cache } from './redis';
import type { Menu, MenuItem, Prisma } from '@prisma/client';

// Cache configuration
const MENU_CACHE_PREFIX = 'menu:';
const MENU_CACHE_TTL = 3600; // 1 hour cache

export interface MenuWithItems extends Menu {
  items: MenuItemWithChildren[];
}

export interface MenuItemWithChildren extends MenuItem {
  children: MenuItemWithChildren[];
  page?: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

export interface CreateMenuInput {
  name: string;
  slug: string;
  location: string;
}

export interface UpdateMenuInput {
  name?: string;
  slug?: string;
  location?: string;
}

export interface CreateMenuItemInput {
  menuId: string;
  label: string;
  url?: string;
  type: 'page' | 'custom' | 'external';
  pageId?: string;
  target?: '_self' | '_blank';
  cssClass?: string;
  parentId?: string;
  order?: number;
}

export interface UpdateMenuItemInput {
  label?: string;
  url?: string;
  type?: 'page' | 'custom' | 'external';
  pageId?: string;
  target?: '_self' | '_blank';
  cssClass?: string;
  parentId?: string;
  order?: number;
}

/**
 * Get all menus
 */
export async function getMenus() {
  return db.menu.findMany({
    include: {
      items: {
        include: {
          page: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get a single menu with items
 */
export async function getMenu(id: string): Promise<MenuWithItems | null> {
  const menu = await db.menu.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          page: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!menu) return null;

  // Build hierarchical structure
  const itemsMap = new Map<string, MenuItemWithChildren>();
  const rootItems: MenuItemWithChildren[] = [];

  // First pass: create all items
  menu.items.forEach((item) => {
    itemsMap.set(item.id, { ...item, children: [] });
  });

  // Second pass: build hierarchy
  menu.items.forEach((item) => {
    const menuItem = itemsMap.get(item.id)!;
    if (item.parentId) {
      const parent = itemsMap.get(item.parentId);
      if (parent) {
        parent.children.push(menuItem);
      } else {
        rootItems.push(menuItem);
      }
    } else {
      rootItems.push(menuItem);
    }
  });

  return {
    ...menu,
    items: rootItems,
  };
}

/**
 * Get menu by location with caching
 */
export async function getMenuByLocation(location: string): Promise<MenuWithItems | null> {
  try {
    // Try cache first
    const cacheKey = `${MENU_CACHE_PREFIX}location:${location}`;
    const cached = await cache.get<MenuWithItems>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Fetch from database
    const menu = await db.menu.findFirst({
      where: { location },
      include: {
        items: {
          include: {
            page: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!menu) return null;

    // Build hierarchical structure (same as getMenu)
    const itemsMap = new Map<string, MenuItemWithChildren>();
    const rootItems: MenuItemWithChildren[] = [];

    menu.items.forEach((item) => {
      itemsMap.set(item.id, { ...item, children: [] });
    });

    menu.items.forEach((item) => {
      const menuItem = itemsMap.get(item.id)!;
      if (item.parentId) {
        const parent = itemsMap.get(item.parentId);
        if (parent) {
          parent.children.push(menuItem);
        } else {
          rootItems.push(menuItem);
        }
      } else {
        rootItems.push(menuItem);
      }
    });

    const result: MenuWithItems = {
      ...menu,
      items: rootItems,
    };

    // Cache for future requests
    await cache.set(cacheKey, result, MENU_CACHE_TTL);

    return result;
  } catch (error) {
    console.error(`Failed to get menu by location ${location}:`, error);
    return null;
  }
}

/**
 * Create a new menu and clear cache
 */
export async function createMenu(data: CreateMenuInput): Promise<Menu> {
  const result = await db.menu.create({
    data: {
      name: data.name,
      slug: data.slug,
      location: data.location,
    },
  });
  
  await clearMenuCache();
  return result;
}

/**
 * Update a menu and clear cache
 */
export async function updateMenu(id: string, data: UpdateMenuInput): Promise<Menu> {
  const result = await db.menu.update({
    where: { id },
    data,
  });
  
  // Clear menu cache
  await clearMenuCache();
  
  return result;
}

/**
 * Delete a menu and clear cache
 */
export async function deleteMenu(id: string): Promise<void> {
  await db.menu.delete({
    where: { id },
  });
  await clearMenuCache();
}

/**
 * Create a menu item and clear cache
 */
export async function createMenuItem(data: CreateMenuItemInput): Promise<MenuItem> {
  // Get the highest order number for this menu/parent
  const siblings = await db.menuItem.findMany({
    where: {
      menuId: data.menuId,
      parentId: data.parentId || null,
    },
    orderBy: { order: 'desc' },
    take: 1,
  });

  const order = data.order ?? (siblings.length > 0 ? siblings[0].order + 1 : 0);

  const itemData: Prisma.MenuItemCreateInput = {
    label: data.label,
    type: data.type,
    target: data.target || '_self',
    order,
    menu: { connect: { id: data.menuId } },
  };

  if (data.url) itemData.url = data.url;
  if (data.cssClass) itemData.cssClass = data.cssClass;
  if (data.pageId) itemData.page = { connect: { id: data.pageId } };
  if (data.parentId) itemData.parent = { connect: { id: data.parentId } };

  const result = await db.menuItem.create({
    data: itemData,
  });
  
  await clearMenuCache();
  return result;
}

/**
 * Update a menu item and clear cache
 */
export async function updateMenuItem(id: string, data: UpdateMenuItemInput): Promise<MenuItem> {
  const updateData: Prisma.MenuItemUpdateInput = {};

  if (data.label !== undefined) updateData.label = data.label;
  if (data.url !== undefined) updateData.url = data.url;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.target !== undefined) updateData.target = data.target;
  if (data.cssClass !== undefined) updateData.cssClass = data.cssClass;
  if (data.order !== undefined) updateData.order = data.order;

  if (data.pageId !== undefined) {
    if (data.pageId) {
      updateData.page = { connect: { id: data.pageId } };
    } else {
      updateData.page = { disconnect: true };
    }
  }

  if (data.parentId !== undefined) {
    if (data.parentId) {
      updateData.parent = { connect: { id: data.parentId } };
    } else {
      updateData.parent = { disconnect: true };
    }
  }

  const result = await db.menuItem.update({
    where: { id },
    data: updateData,
  });
  
  await clearMenuCache();
  return result;
}

/**
 * Delete a menu item and clear cache
 */
export async function deleteMenuItem(id: string): Promise<void> {
  await db.menuItem.delete({
    where: { id },
  });
  await clearMenuCache();
}

/**
 * Reorder menu items and clear cache
 */
export async function reorderMenuItems(items: { id: string; order: number }[]): Promise<void> {
  await db.$transaction(
    items.map((item) =>
      db.menuItem.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  await clearMenuCache();
}

/**
 * Get menu item URL
 */
export function getMenuItemUrl(item: MenuItemWithChildren): string {
  if (item.type === 'page' && item.page) {
    return item.page.slug === '' ? '/' : `/${item.page.slug}`;
  }
  return item.url || '#';
}

/**
 * Clear all menu cache
 */
export async function clearMenuCache(): Promise<void> {
  try {
    await cache.delPattern(`${MENU_CACHE_PREFIX}*`);
  } catch (error) {
    console.error('Failed to clear menu cache:', error);
  }
}