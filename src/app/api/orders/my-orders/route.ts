import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getCustomerOrders } from '@/lib/orders';

/**
 * GET /api/orders/my-orders
 * Get customer's order history
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await getCustomerOrders(session.user.id, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch customer orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
