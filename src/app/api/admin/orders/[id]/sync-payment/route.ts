import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { syncRazorpayPaymentStatus } from '@/lib/orders';

/**
 * POST /api/admin/orders/[id]/sync-payment
 * Sync Razorpay payment status
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const result = await syncRazorpayPaymentStatus(id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to sync payment status:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to sync payment status' },
      { status: 500 }
    );
  }
}
