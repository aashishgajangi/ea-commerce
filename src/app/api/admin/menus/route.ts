import { NextRequest, NextResponse } from 'next/server';
import { getMenus, createMenu } from '@/lib/menus';
import { z } from 'zod';

const createMenuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  location: z.enum(['header', 'footer', 'sidebar']),
});

/**
 * GET /api/admin/menus - List all menus
 */
export async function GET() {
  try {
    const menus = await getMenus();
    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/menus - Create a new menu
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validationResult = createMenuSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const menu = await createMenu(validationResult.data);
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      { error: 'Failed to create menu' },
      { status: 500 }
    );
  }
}