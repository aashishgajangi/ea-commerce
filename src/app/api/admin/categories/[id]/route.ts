import { NextRequest, NextResponse } from 'next/server';
import { getCategoryById, updateCategory, deleteCategory, getCategoryBreadcrumb } from '@/lib/categories';
import { z } from 'zod';

// Validation schema for updating a category
const updateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().nullable().optional(),
  order: z.number().int().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().optional(),
});

/**
 * GET /api/admin/categories/[id] - Get a single category
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const includeBreadcrumb = searchParams.get('breadcrumb') === 'true';

    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Include breadcrumb if requested
    let breadcrumb;
    if (includeBreadcrumb) {
      breadcrumb = await getCategoryBreadcrumb(id);
    }

    return NextResponse.json({
      ...category,
      ...(breadcrumb ? { breadcrumb } : {}),
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/categories/[id] - Update a category
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updateCategorySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Update the category
    const category = await updateCategory(id, data);

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/categories/[id] - Delete a category
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteCategory(id);

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}