import { db } from '@/lib/db';
import { cache as redis } from '@/lib/redis';

// ============================================
// CART LIBRARY - Shopping Cart Management
// ============================================

export interface CartItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
  selectedWeight?: number; // For weight-based products
}

export interface CartSummary {
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CartData = any;

// Get or create cart for user or guest session
export async function getOrCreateCart(userId?: string, sessionId?: string) {
  if (!userId && !sessionId) {
    throw new Error('Either userId or sessionId is required');
  }

  let cart;

  if (userId) {
    // Try to find existing cart for user
    cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
      },
    });

    // If not found, create new cart for user
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                  },
                },
              },
              variant: true,
            },
          },
        },
      });
    }
  } else {
    // Guest cart - use sessionId
    cart = await db.cart.findFirst({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
      },
    });

    // If not found, create new guest cart with expiry
    if (!cart) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // Expire in 30 days

      cart = await db.cart.create({
        data: {
          sessionId,
          expiresAt,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                  },
                },
              },
              variant: true,
            },
          },
        },
      });
    }
  }

  return cart;
}

// Get cart by ID (bypasses cache, always fresh from DB)
export async function getCart(cartId: string) {
  console.log('📦 Fetching cart from database:', cartId);
  
  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
          variant: true,
        },
      },
    },
  });

  if (cart) {
    console.log('📦 Cart items from DB:', cart.items.map(i => ({
      id: i.id.slice(-8),
      productId: i.productId.slice(-8),
      selectedWeight: i.selectedWeight,
      quantity: i.quantity,
    })));
  }

  return cart;
}

// Add item to cart
export async function addToCart(
  cartId: string,
  item: CartItemInput
): Promise<{ success: boolean; message: string; cart?: CartData }> {
  try {
    // Validate product exists and is available
    const product = await db.product.findUnique({
      where: { id: item.productId },
      include: {
        variants: item.variantId
          ? {
              where: { id: item.variantId },
            }
          : undefined,
      },
    });

    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (!product.isActive || product.status !== 'published') {
      return { success: false, message: 'Product is not available' };
    }

    // Check stock availability
    let availableStock = product.stockQuantity;
    let price = product.price;

    if (item.variantId && product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      if (!variant.isActive) {
        return { success: false, message: 'Product variant is not available' };
      }
      availableStock = variant.stockQuantity;
      price = variant.price || product.price;
    }

    if (product.trackInventory && availableStock < item.quantity) {
      return {
        success: false,
        message: `Only ${availableStock} items available in stock`,
      };
    }

    // Calculate final price for weight-based products
    if (product.weightBasedPricing && item.selectedWeight) {
      price = price * item.selectedWeight;
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        cartId,
        productId: item.productId,
        variantId: item.variantId || null,
        selectedWeight: item.selectedWeight || null,
      },
    });

    if (existingItem) {
      // Update quantity of existing item
      const newQuantity = existingItem.quantity + item.quantity;

      if (product.trackInventory && newQuantity > availableStock) {
        return {
          success: false,
          message: `Cannot add more items. Only ${availableStock} available in stock`,
        };
      }

      await db.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          updatedAt: new Date(),
        },
      });
    } else {
      // Add new item to cart
      await db.cartItem.create({
        data: {
          cartId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price,
          selectedWeight: item.selectedWeight,
        },
      });
    }

    // Update cart timestamp
    await db.cart.update({
      where: { id: cartId },
      data: { updatedAt: new Date() },
    });

    // Clear cart cache
    await clearCartCache(cartId);

    // Get updated cart
    const updatedCart = await getCart(cartId);

    return {
      success: true,
      message: 'Item added to cart successfully',
      cart: updatedCart,
    };
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return {
      success: false,
      message: 'Failed to add item to cart',
    };
  }
}

// Update cart item quantity
export async function updateCartItem(
  cartItemId: string,
  quantity: number
): Promise<{ success: boolean; message: string; cart?: CartData }> {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        product: true,
        variant: true,
      },
    });

    if (!cartItem) {
      return { success: false, message: 'Cart item not found' };
    }

    // Check stock availability
    let availableStock = cartItem.product.stockQuantity;
    if (cartItem.variant) {
      availableStock = cartItem.variant.stockQuantity;
    }

    if (cartItem.product.trackInventory && quantity > availableStock) {
      return {
        success: false,
        message: `Only ${availableStock} items available in stock`,
      };
    }

    // If quantity is 0 or negative, remove the item
    if (quantity <= 0) {
      await db.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      // Update quantity
      console.log(`💾 Updating cart item ${cartItemId.slice(-8)} to quantity ${quantity}`);
      await db.cartItem.update({
        where: { id: cartItemId },
        data: {
          quantity,
          updatedAt: new Date(),
        },
      });
      console.log(`✅ Database updated successfully`);
    }

    // Update cart timestamp
    await db.cart.update({
      where: { id: cartItem.cartId },
      data: { updatedAt: new Date() },
    });

    // Clear cart cache
    await clearCartCache(cartItem.cartId);

    // IMPORTANT: Wait a bit to ensure database write is complete
    await new Promise(resolve => setTimeout(resolve, 50));

    // Get updated cart (fresh from DB)
    const updatedCart = await getCart(cartItem.cartId);

    return {
      success: true,
      message: 'Cart updated successfully',
      cart: updatedCart,
    };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return {
      success: false,
      message: 'Failed to update cart item',
    };
  }
}

// Remove item from cart
export async function removeFromCart(
  cartItemId: string
): Promise<{ success: boolean; message: string; cart?: CartData }> {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return { success: false, message: 'Cart item not found' };
    }

    const cartId = cartItem.cartId;

    await db.cartItem.delete({
      where: { id: cartItemId },
    });

    // Update cart timestamp
    await db.cart.update({
      where: { id: cartId },
      data: { updatedAt: new Date() },
    });

    // Clear cart cache
    await clearCartCache(cartId);

    // Get updated cart
    const updatedCart = await getCart(cartId);

    return {
      success: true,
      message: 'Item removed from cart',
      cart: updatedCart,
    };
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return {
      success: false,
      message: 'Failed to remove item from cart',
    };
  }
}

// Clear entire cart
export async function clearCart(
  cartId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db.cartItem.deleteMany({
      where: { cartId },
    });

    // Update cart timestamp
    await db.cart.update({
      where: { id: cartId },
      data: { updatedAt: new Date() },
    });

    // Clear cart cache
    await clearCartCache(cartId);

    return {
      success: true,
      message: 'Cart cleared successfully',
    };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return {
      success: false,
      message: 'Failed to clear cart',
    };
  }
}

// Calculate cart summary (subtotal, item count, etc.)
export function calculateCartSummary(cart: CartData): CartSummary {
  if (!cart || !cart.items || cart.items.length === 0) {
    return {
      subtotal: 0,
      itemCount: 0,
      totalQuantity: 0,
    };
  }

  let subtotal = 0;
  let totalQuantity = 0;

  cart.items.forEach((item: CartData) => {
    subtotal += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  return {
    subtotal,
    itemCount: cart.items.length,
    totalQuantity,
  };
}

// Merge guest cart with user cart after login
export async function mergeGuestCartWithUserCart(
  sessionId: string,
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Get guest cart
    const guestCart = await db.cart.findFirst({
      where: { sessionId },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) {
      return { success: true, message: 'No guest cart to merge' };
    }

    // Get or create user cart
    const userCart = await getOrCreateCart(userId);

    // Merge items
    for (const item of guestCart.items) {
      await addToCart(userCart.id, {
        productId: item.productId,
        variantId: item.variantId || undefined,
        quantity: item.quantity,
        selectedWeight: item.selectedWeight || undefined,
      });
    }

    // Delete guest cart
    await db.cart.delete({
      where: { id: guestCart.id },
    });

    return { success: true, message: 'Cart merged successfully' };
  } catch (error) {
    console.error('Error merging carts:', error);
    return { success: false, message: 'Failed to merge carts' };
  }
}

// Clear cart cache
async function clearCartCache(cartId: string) {
  if (!redis) return;

  try {
    // Get the cart to find userId or sessionId
    const cart = await db.cart.findUnique({
      where: { id: cartId },
      select: { userId: true, sessionId: true },
    });

    if (cart) {
      // Clear cache based on the correct key format
      if (cart.userId) {
        await redis.del(`cart:user:${cart.userId}`);
        console.log(`🗑️ Cleared cache: cart:user:${cart.userId}`);
      } else if (cart.sessionId) {
        await redis.del(`cart:session:${cart.sessionId}`);
        console.log(`🗑️ Cleared cache: cart:session:${cart.sessionId}`);
      }
    }

    // Also clear old format cache key (for backward compatibility)
    await redis.del(`cart:${cartId}`);
  } catch (error) {
    console.error('Error clearing cart cache:', error);
  }
}

// Clean up expired guest carts (run as cron job)
export async function cleanupExpiredCarts() {
  try {
    const result = await db.cart.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    console.log(`Cleaned up ${result.count} expired carts`);
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired carts:', error);
    return 0;
  }
}
