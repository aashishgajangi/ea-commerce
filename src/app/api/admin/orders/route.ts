import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getOrders, type OrderFilters } from '@/lib/orders';

/**
 * GET /api/admin/orders
 * List all orders with filters
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') as OrderFilters['status'];
    const paymentStatus = searchParams.get('paymentStatus') as OrderFilters['paymentStatus'];
    const search = searchParams.get('search') || undefined;
    const dateFrom = searchParams.get('dateFrom') ? new Date(searchParams.get('dateFrom')!) : undefined;
    const dateTo = searchParams.get('dateTo') ? new Date(searchParams.get('dateTo')!) : undefined;

    // Build filters
    const filters: OrderFilters = {
      status: status || undefined,
      paymentStatus: paymentStatus || undefined,
      search,
      dateFrom,
      dateTo,
    };

    // Fetch orders
    const result = await getOrders(filters, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
