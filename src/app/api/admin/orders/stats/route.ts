import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getOrderStats } from '@/lib/orders';

/**
 * GET /api/admin/orders/stats
 * Get order statistics
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getOrderStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch order stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order stats' },
      { status: 500 }
    );
  }
}
