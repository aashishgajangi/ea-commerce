import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

/**
 * Generate a unique slug for a category
 */
export async function generateUniqueCategorySlug(name: string, excludeId?: string): Promise<string> {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Check if slug exists
  const existing = await db.category.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });

  if (!existing) {
    return slug;
  }

  // If slug exists, append a number
  let counter = 1;
  let newSlug = `${slug}-${counter}`;
  
  while (await db.category.findFirst({
    where: {
      slug: newSlug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  })) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }

  return newSlug;
}

/**
 * Get all categories with optional filtering
 */
export async function getCategories(options: {
  search?: string;
  parentId?: string | null;
  isActive?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'createdAt' | 'updatedAt' | 'order';
  order?: 'asc' | 'desc';
  includeChildren?: boolean;
}) {
  const {
    search = '',
    parentId,
    isActive,
    limit = 50,
    offset = 0,
    orderBy = 'order',
    order = 'asc',
    includeChildren = false,
  } = options;

  const where: Prisma.CategoryWhereInput = {
    ...(search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    } : {}),
    ...(parentId !== undefined ? { parentId } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
  };

  const [categories, total] = await Promise.all([
    db.category.findMany({
      where,
      include: {
        parent: true,
        ...(includeChildren ? {
          children: {
            orderBy: { order: 'asc' },
          },
        } : {}),
        _count: {
          select: {
            products: true,
            children: true,
          },
        },
      },
      orderBy: { [orderBy]: order },
      skip: offset,
      take: limit,
    }),
    db.category.count({ where }),
  ]);

  return {
    categories,
    total,
    limit,
    offset,
  };
}

/**
 * Get a single category by ID
 */
export async function getCategoryById(id: string) {
  return db.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: {
        orderBy: { order: 'asc' },
      },
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: {
        orderBy: { order: 'asc' },
      },
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}

/**
 * Create a new category
 */
export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
  isActive?: boolean;
}) {
  const slug = data.slug || await generateUniqueCategorySlug(data.name);

  return db.category.create({
    data: {
      ...data,
      slug,
    },
    include: {
      parent: true,
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}

/**
 * Update a category
 */
export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    parentId?: string | null;
    order?: number;
    metaTitle?: string;
    metaDescription?: string;
    isActive?: boolean;
  }
) {
  // If name is being changed and slug is not provided, generate new slug
  if (data.name && !data.slug) {
    data.slug = await generateUniqueCategorySlug(data.name, id);
  } else if (data.slug) {
    // Validate slug uniqueness
    data.slug = await generateUniqueCategorySlug(data.slug, id);
  }

  // Prevent self-parenting and circular references
  if (data.parentId) {
    const isCircular = await checkCircularReference(id, data.parentId);
    if (isCircular) {
      throw new Error('Cannot set parent: circular reference detected');
    }
  }

  return db.category.update({
    where: { id },
    data,
    include: {
      parent: true,
      children: {
        orderBy: { order: 'asc' },
      },
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string) {
  // Check if category has products
  const category = await db.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  if (category._count.products > 0) {
    throw new Error('Cannot delete category with products. Move or delete products first.');
  }

  if (category._count.children > 0) {
    throw new Error('Cannot delete category with subcategories. Delete subcategories first.');
  }

  return db.category.delete({
    where: { id },
  });
}

/**
 * Get category hierarchy (tree structure)
 */
export async function getCategoryHierarchy() {
  // Get all top-level categories (no parent)
  const topLevel = await db.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: {
          children: {
            include: {
              children: true, // Support up to 4 levels
            },
          },
        },
        orderBy: { order: 'asc' },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: { order: 'asc' },
  });

  return topLevel;
}

/**
 * Check for circular reference in category hierarchy
 */
async function checkCircularReference(categoryId: string, targetParentId: string): Promise<boolean> {
  if (categoryId === targetParentId) {
    return true;
  }

  let currentParentId: string | null = targetParentId;
  const visited = new Set<string>([categoryId]);

  while (currentParentId) {
    if (visited.has(currentParentId)) {
      return true;
    }
    visited.add(currentParentId);

    const parent: { parentId: string | null } | null = await db.category.findUnique({
      where: { id: currentParentId },
      select: { parentId: true },
    });

    if (!parent) break;
    currentParentId = parent.parentId;
  }

  return false;
}

/**
 * Reorder categories
 */
export async function reorderCategories(orders: { id: string; order: number }[]) {
  const updates = orders.map(({ id, order }) =>
    db.category.update({
      where: { id },
      data: { order },
    })
  );

  return db.$transaction(updates);
}

/**
 * Get category breadcrumb path
 */
export async function getCategoryBreadcrumb(categoryId: string) {
  const breadcrumb: Array<{ id: string; name: string; slug: string }> = [];
  let currentId: string | null = categoryId;

  while (currentId) {
    const category: { id: string; name: string; slug: string; parentId: string | null } | null = await db.category.findUnique({
      where: { id: currentId },
      select: { id: true, name: true, slug: true, parentId: true },
    });

    if (!category) break;

    breadcrumb.unshift({
      id: category.id,
      name: category.name,
      slug: category.slug,
    });

    currentId = category.parentId;
  }

  return breadcrumb;
}