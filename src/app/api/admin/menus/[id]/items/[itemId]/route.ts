import { NextRequest, NextResponse } from 'next/server';
import { updateMenuItem, deleteMenuItem } from '@/lib/menus';
import { z } from 'zod';

const updateMenuItemSchema = z.object({
  label: z.string().min(1).optional(),
  url: z.string().optional(),
  type: z.enum(['page', 'custom', 'external']).optional(),
  pageId: z.string().optional().nullable(),
  target: z.enum(['_self', '_blank']).optional(),
  cssClass: z.string().optional(),
  parentId: z.string().optional().nullable(),
  order: z.number().optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
}

/**
 * PATCH /api/admin/menus/[id]/items/[itemId] - Update a menu item
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { itemId } = await params;
    const body = await request.json();

    const validationResult = updateMenuItemSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const updateData = {
      ...data,
      pageId: data.pageId === null ? undefined : data.pageId,
      parentId: data.parentId === null ? undefined : data.parentId,
    };

    const menuItem = await updateMenuItem(itemId, updateData);
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/menus/[id]/items/[itemId] - Delete a menu item
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { itemId } = await params;

    await deleteMenuItem(itemId);
    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}