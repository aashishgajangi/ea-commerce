import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/categories';
import { getProducts } from '@/lib/products';

/**
 * GET /api/categories/[slug] - Get category by slug with products
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const offset = (page - 1) * limit;

    // Get category by slug
    const category = await getCategoryBySlug(slug);
    
    if (!category || !category.isActive) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Determine sort order
    let orderBy: 'name' | 'price' | 'createdAt' | 'updatedAt' = 'createdAt';
    let order: 'asc' | 'desc' = 'desc';

    switch (sortBy) {
      case 'name':
        orderBy = 'name';
        order = 'asc';
        break;
      case 'price-low':
        orderBy = 'price';
        order = 'asc';
        break;
      case 'price-high':
        orderBy = 'price';
        order = 'desc';
        break;
      case 'oldest':
        orderBy = 'createdAt';
        order = 'asc';
        break;
      case 'newest':
      default:
        orderBy = 'createdAt';
        order = 'desc';
        break;
    }

    // Get products in this category
    const { products, total } = await getProducts({
      categoryId: category.id,
      status: 'published',
      isActive: true,
      limit,
      offset,
      orderBy,
      order,
    });

    return NextResponse.json({
      category,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + products.length < total,
      },
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
