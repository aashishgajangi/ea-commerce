import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cartHelpers, type CartItem } from "@repo/database";

// Input validation schemas
const AddToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const UpdateCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
});

const RemoveFromCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

export const cartRouter: any = createTRPCRouter({
  // Get user's cart with totals
  getCart: protectedProcedure.query(async ({ ctx }) => {
    try {
      const cartTotals = await cartHelpers.getCartTotals(ctx.session.user.id);
      return {
        success: true,
        data: cartTotals,
      };
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error("Failed to fetch cart");
    }
  }),

  // Add product to cart
  addToCart: protectedProcedure
    .input(AddToCartSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { productId, quantity } = input;

        // Fetch product details from database
        const product = await ctx.prisma.product.findUnique({
          where: {
            id: productId,
            isActive: true,
            status: "ACTIVE",
          },
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
            salePrice: true,
            stockQuantity: true,
            trackInventory: true,
            allowBackorder: true,
            images: {
              where: { imageType: "THUMBNAIL", isActive: true },
              select: { url: true },
              take: 1,
            },
          },
        });

        if (!product) {
          throw new Error("Product not found or unavailable");
        }

        // Check stock if inventory tracking is enabled
        if (product.trackInventory && !product.allowBackorder) {
          if (product.stockQuantity < quantity) {
            throw new Error(
              `Insufficient stock. Available: ${product.stockQuantity}`,
            );
          }
        }

        // Prepare cart item
        const price = product.salePrice || product.basePrice;
        const cartItem: Omit<CartItem, "addedAt"> = {
          productId: product.id,
          quantity,
          unitPrice: Number(price),
          productName: product.name,
          productSlug: product.slug,
          productImage: product.images[0]?.url,
        };

        // Add to Redis cart
        const updatedCart = await cartHelpers.addToCart(
          ctx.session.user.id,
          cartItem,
        );

        // Also sync to database for backup
        await syncCartItemToDatabase(ctx.session.user.id, cartItem, ctx.prisma);

        const cartTotals = await cartHelpers.getCartTotals(ctx.session.user.id);

        return {
          success: true,
          message: "Product added to cart",
          data: cartTotals,
        };
      } catch (error) {
        console.error("Error adding to cart:", error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "Failed to add product to cart",
        );
      }
    }),

  // Update cart item quantity
  updateCartItem: protectedProcedure
    .input(UpdateCartItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { productId, quantity } = input;

        if (quantity > 0) {
          // Check stock if updating quantity
          const product = await ctx.prisma.product.findUnique({
            where: { id: productId, isActive: true },
            select: {
              stockQuantity: true,
              trackInventory: true,
              allowBackorder: true,
            },
          });

          if (!product) {
            throw new Error("Product not found");
          }

          if (product.trackInventory && !product.allowBackorder) {
            if (product.stockQuantity < quantity) {
              throw new Error(
                `Insufficient stock. Available: ${product.stockQuantity}`,
              );
            }
          }
        }

        // Update in Redis
        await cartHelpers.updateCartItem(
          ctx.session.user.id,
          productId,
          quantity,
        );

        // Sync to database
        if (quantity === 0) {
          await removeCartItemFromDatabase(
            ctx.session.user.id,
            productId,
            ctx.prisma,
          );
        } else {
          await updateCartItemInDatabase(
            ctx.session.user.id,
            productId,
            quantity,
            ctx.prisma,
          );
        }

        const cartTotals = await cartHelpers.getCartTotals(ctx.session.user.id);

        return {
          success: true,
          message: quantity === 0 ? "Item removed from cart" : "Cart updated",
          data: cartTotals,
        };
      } catch (error) {
        console.error("Error updating cart item:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to update cart item",
        );
      }
    }),

  // Remove item from cart
  removeFromCart: protectedProcedure
    .input(RemoveFromCartSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { productId } = input;

        // Remove from Redis
        await cartHelpers.removeFromCart(ctx.session.user.id, productId);

        // Remove from database
        await removeCartItemFromDatabase(
          ctx.session.user.id,
          productId,
          ctx.prisma,
        );

        const cartTotals = await cartHelpers.getCartTotals(ctx.session.user.id);

        return {
          success: true,
          message: "Item removed from cart",
          data: cartTotals,
        };
      } catch (error) {
        console.error("Error removing from cart:", error);
        throw new Error("Failed to remove item from cart");
      }
    }),

  // Clear entire cart
  clearCart: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      // Clear Redis cart
      await cartHelpers.clearCart(ctx.session.user.id);

      // Clear database cart items
      await ctx.prisma.cartItem.deleteMany({
        where: { userId: ctx.session.user.id },
      });

      return {
        success: true,
        message: "Cart cleared successfully",
        data: { itemCount: 0, subtotal: 0, items: [] },
      };
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error("Failed to clear cart");
    }
  }),

  // Sync cart from Redis to database (backup)
  syncCart: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const cart = await cartHelpers.getCart(ctx.session.user.id);

      // Clear existing database cart items
      await ctx.prisma.cartItem.deleteMany({
        where: { userId: ctx.session.user.id },
      });

      // Insert current cart items to database
      if (cart.length > 0) {
        await ctx.prisma.cartItem.createMany({
          data: cart.map((item) => ({
            userId: ctx.session.user.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        });
      }

      return {
        success: true,
        message: "Cart synced to database",
        data: { itemCount: cart.length },
      };
    } catch (error) {
      console.error("Error syncing cart:", error);
      throw new Error("Failed to sync cart");
    }
  }),
});

// Helper functions for database operations
async function syncCartItemToDatabase(
  userId: string,
  cartItem: Omit<CartItem, "addedAt">,
  prisma: any,
) {
  try {
    await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId: cartItem.productId,
        },
      },
      update: {
        quantity: { increment: cartItem.quantity },
        unitPrice: cartItem.unitPrice,
      },
      create: {
        userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        unitPrice: cartItem.unitPrice,
      },
    });
  } catch (error) {
    console.error("Error syncing cart item to database:", error);
    // Don't throw - Redis is primary, database is backup
  }
}

async function updateCartItemInDatabase(
  userId: string,
  productId: string,
  quantity: number,
  prisma: any,
) {
  try {
    await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: { quantity },
    });
  } catch (error) {
    console.error("Error updating cart item in database:", error);
    // Don't throw - Redis is primary
  }
}

async function removeCartItemFromDatabase(
  userId: string,
  productId: string,
  prisma: any,
) {
  try {
    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  } catch (error) {
    console.error("Error removing cart item from database:", error);
    // Don't throw - Redis is primary
  }
}
