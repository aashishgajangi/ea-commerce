import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/categories';

/**
 * GET /api/categories - Get all active categories
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const search = searchParams.get('search') || '';
    const parentId = searchParams.get('parentId') || undefined;
    const includeChildren = searchParams.get('includeChildren') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const orderBy = (searchParams.get('orderBy') || 'order') as 'name' | 'createdAt' | 'updatedAt' | 'order';
    const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';

    const result = await getCategories({
      search,
      parentId: parentId === 'null' ? null : parentId,
      isActive: true,
      includeChildren,
      limit,
      offset,
      orderBy,
      order,
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
