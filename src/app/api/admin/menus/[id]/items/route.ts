import { NextRequest, NextResponse } from 'next/server';
import { createMenuItem, reorderMenuItems } from '@/lib/menus';
import { z } from 'zod';

const createMenuItemSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().optional(),
  type: z.enum(['page', 'custom', 'external']),
  pageId: z.string().optional(),
  target: z.enum(['_self', '_blank']).optional(),
  cssClass: z.string().optional(),
  parentId: z.string().optional(),
  order: z.number().optional(),
});

const reorderSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number(),
  })),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * POST /api/admin/menus/[id]/items - Create a new menu item
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id: menuId } = await params;
    const body = await request.json();

    const validationResult = createMenuItemSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const menuItem = await createMenuItem({
      ...validationResult.data,
      menuId,
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/menus/[id]/items - Reorder menu items
 */
export async function PATCH(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const validationResult = reorderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    await reorderMenuItems(validationResult.data.items);
    return NextResponse.json({ message: 'Menu items reordered successfully' });
  } catch (error) {
    console.error('Error reordering menu items:', error);
    return NextResponse.json(
      { error: 'Failed to reorder menu items' },
      { status: 500 }
    );
  }
}