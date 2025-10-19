import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get search parameters
    const query = searchParams.get('q') || '';
    const categoryId = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const inStock = searchParams.get('inStock') === 'true' || undefined;
    const sortBy = (searchParams.get('sort') || 'relevance') as 'relevance' | 'name' | 'price' | 'date';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Validate query
    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { 
          error: 'Search query must be at least 2 characters',
          products: [],
          total: 0,
          page: 1,
          totalPages: 0,
          query: ''
        },
        { status: 400 }
      );
    }

    // Validate page and limit
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Search products
    const result = await searchProducts({
      query,
      categoryId,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      order,
      limit,
      offset,
    });

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search products',
        products: [],
        total: 0,
        page: 1,
        totalPages: 0,
      },
      { status: 500 }
    );
  }
}
