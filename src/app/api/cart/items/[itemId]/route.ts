import { NextRequest, NextResponse } from 'next/server';
import { updateCartItem, removeFromCart, calculateCartSummary } from '@/lib/cart';
import { z } from 'zod';

// ============================================
// PUT /api/cart/items/[itemId] - Update cart item quantity
// ============================================
const updateItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater'),
});

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;
    const body = await request.json();

    // Validate input
    const validation = updateItemSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { quantity } = validation.data;

    // Update cart item
    const result = await updateCartItem(itemId, quantity);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Calculate cart summary
    const summary = result.cart ? calculateCartSummary(result.cart) : null;

    return NextResponse.json({
      message: result.message,
      cart: result.cart,
      summary,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/cart/items/[itemId] - Remove item from cart
// ============================================
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;

    // Remove item from cart
    const result = await removeFromCart(itemId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Calculate cart summary
    const summary = result.cart ? calculateCartSummary(result.cart) : null;

    return NextResponse.json({
      message: result.message,
      cart: result.cart,
      summary,
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
