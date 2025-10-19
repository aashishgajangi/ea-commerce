import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getOrCreateCart, addToCart, clearCart, calculateCartSummary } from '@/lib/cart';
import { z } from 'zod';

// ============================================
// GET /api/cart - Get user's cart
// ============================================
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    // Get cart for authenticated user or guest session
    const cart = await getOrCreateCart(
      session?.user?.id,
      sessionId || undefined
    );

    // Calculate cart summary
    const summary = calculateCartSummary(cart);

    return NextResponse.json({
      cart,
      summary,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/cart - Add item to cart
// ============================================
const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  selectedWeight: z.number().positive().optional(),
  sessionId: z.string().optional(), // For guest users
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    // Validate input
    const validation = addToCartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { productId, variantId, quantity, selectedWeight, sessionId } = validation.data;

    // Get or create cart
    const cart = await getOrCreateCart(
      session?.user?.id,
      sessionId
    );

    // Add item to cart
    const result = await addToCart(cart.id, {
      productId,
      variantId,
      quantity,
      selectedWeight,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Calculate cart summary
    const summary = calculateCartSummary(result.cart);

    return NextResponse.json({
      message: result.message,
      cart: result.cart,
      summary,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/cart - Clear cart
// ============================================
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    // Get cart
    const cart = await getOrCreateCart(
      session?.user?.id,
      sessionId || undefined
    );

    // Clear cart
    const result = await clearCart(cart.id);

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
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
