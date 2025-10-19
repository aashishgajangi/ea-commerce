import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { mergeGuestCartWithUserCart } from '@/lib/cart';
import { z } from 'zod';

// ============================================
// POST /api/cart/merge - Merge guest cart with user cart after login
// ============================================
const mergeCartSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = mergeCartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { sessionId } = validation.data;

    // Merge guest cart with user cart
    const result = await mergeGuestCartWithUserCart(sessionId, session.user.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    console.error('Error merging carts:', error);
    return NextResponse.json(
      { error: 'Failed to merge carts' },
      { status: 500 }
    );
  }
}
