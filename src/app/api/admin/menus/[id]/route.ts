import { NextRequest, NextResponse } from 'next/server';
import { getMenu, updateMenu, deleteMenu } from '@/lib/menus';
import { z } from 'zod';

const updateMenuSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().optional(),
  location: z.enum(['header', 'footer', 'sidebar']).optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/menus/[id] - Get a single menu
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const menu = await getMenu(id);

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/menus/[id] - Update a menu
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validationResult = updateMenuSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const menu = await updateMenu(id, validationResult.data);
    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { error: 'Failed to update menu' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/menus/[id] - Delete a menu
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const menu = await getMenu(id);
    if (!menu) {
      return NextResponse.json(
        { error: 'Menu not found' },
        { status: 404 }
      );
    }

    await deleteMenu(id);
    return NextResponse.json(
      { message: 'Menu deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu' },
      { status: 500 }
    );
  }
}