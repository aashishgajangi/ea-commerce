import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews } from '@/lib/reviews';

/**
 * GET /api/admin/reviews - Get all reviews for admin management
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const productId = searchParams.get('productId') || undefined;
    const status = (searchParams.get('status') || 'all') as 'pending' | 'approved' | 'rejected' | 'all';
    const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!, 10) : undefined;
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const orderBy = (searchParams.get('orderBy') || 'createdAt') as 'createdAt' | 'rating' | 'status';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';

    const result = await getAllReviews({
      productId,
      status,
      rating,
      search,
      limit,
      offset,
      orderBy,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}