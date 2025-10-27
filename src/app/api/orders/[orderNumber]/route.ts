import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getOrderByNumber } from '@/lib/orders';

/**
 * GET /api/orders/[orderNumber]
 * Get order details by order number (customer access)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const session = await auth();
    const { orderNumber } = await params;

    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if user has access to this order
    if (session?.user?.id) {
      // Logged in user - check if order belongs to them
      if (order.userId !== session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    } else {
      // Guest user - require email verification (could be enhanced)
      // For now, allow access if they have the order number
      // In production, you might want to send a verification email
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
