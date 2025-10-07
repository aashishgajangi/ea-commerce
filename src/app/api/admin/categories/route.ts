import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory, generateUniqueCategorySlug, getCategoryHierarchy } from '@/lib/categories';
import { z } from 'zod';

// Validation schema for creating a category
const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  order: z.number().int().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/admin/categories - List all categories
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check if hierarchy view is requested
    const viewType = searchParams.get('view');
    if (viewType === 'hierarchy') {
      const hierarchy = await getCategoryHierarchy();
      return NextResponse.json({ categories: hierarchy });
    }

    const search = searchParams.get('search') || '';
    const parentId = searchParams.get('parentId') || undefined;
    const isActive = searchParams.get('isActive') === 'true' ? true : searchParams.get('isActive') === 'false' ? false : undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const orderBy = (searchParams.get('orderBy') || 'order') as 'name' | 'createdAt' | 'updatedAt' | 'order';
    const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
    const includeChildren = searchParams.get('includeChildren') === 'true';

    const result = await getCategories({
      search,
      parentId: parentId === 'null' ? null : parentId,
      isActive,
      limit,
      offset,
      orderBy,
      order,
      includeChildren,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/categories - Create a new category
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = createCategorySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate slug if not provided
    const slug = data.slug || await generateUniqueCategorySlug(data.name);

    // Create the category
    const category = await createCategory({
      ...data,
      slug,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}