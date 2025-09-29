import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";
import { cartHelpers } from "@repo/database";

// Input validation schemas
const CreateOrderSchema = z.object({
  shippingAddress: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  billingAddress: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().min(1, "Phone is required"),
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      country: z.string().min(1, "Country is required"),
    })
    .optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

const UpdateOrderStatusSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
  ]),
  notes: z.string().optional(),
});

const OrderListSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(10),
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "REFUNDED",
    ])
    .optional(),
  sortBy: z
    .enum(["createdAt", "totalAmount", "orderNumber"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const ordersRouter: any = createTRPCRouter({
  // Create order from cart
  create: protectedProcedure
    .input(CreateOrderSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;

        // Get user's cart
        const cart = await cartHelpers.getCart(userId);
        if (cart.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cart is empty",
          });
        }

        // Calculate totals
        const cartTotals = await cartHelpers.getCartTotals(userId);
        const subtotal = cartTotals.subtotal;

        // For now, set basic values (can be configured later)
        const taxRate = 0.1; // 10% tax
        const shippingCost = subtotal > 50 ? 0 : 10; // Free shipping over $50
        const taxAmount = subtotal * taxRate;
        const totalAmount = subtotal + taxAmount + shippingCost;

        // Generate unique order number
        const orderNumber = await generateOrderNumber();

        // Get user info for the order
        const user = await ctx.prisma.user.findUnique({
          where: { id: userId },
          select: { email: true },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        // Use billing address same as shipping if not provided
        const billingAddress = input.billingAddress || input.shippingAddress;

        // Create order with transaction
        const order = await ctx.prisma.$transaction(async (tx) => {
          // Create the order
          const newOrder = await tx.order.create({
            data: {
              userId,
              orderNumber,
              subtotal,
              taxAmount,
              shippingCost,
              discountAmount: 0,
              totalAmount,
              status: "PENDING",
              paymentStatus: "PENDING",
              customerEmail: user.email,
              shippingAddress: input.shippingAddress,
              billingAddress: billingAddress,
              paymentMethod: input.paymentMethod,
              // paymentIntentId will be set when payment is processed
            },
          });

          // Create order items from cart
          const orderItems = cart.map((cartItem) => ({
            orderId: newOrder.id,
            productId: cartItem.productId,
            productName: cartItem.productName,
            productSku: null, // TODO: Add SKU to cart items
            quantity: cartItem.quantity,
            unitPrice: cartItem.unitPrice,
            totalPrice: cartItem.quantity * cartItem.unitPrice,
          }));

          await tx.orderItem.createMany({
            data: orderItems,
          });

          // Update product stock quantities
          for (const cartItem of cart) {
            await tx.product.update({
              where: { id: cartItem.productId },
              data: {
                stockQuantity: { decrement: cartItem.quantity },
              },
            });
          }

          return newOrder;
        });

        // Clear the user's cart after successful order creation
        await cartHelpers.clearCart(userId);

        // Also clear database cart
        await ctx.prisma.cartItem.deleteMany({
          where: { userId },
        });

        return {
          success: true,
          message: "Order created successfully",
          data: {
            orderId: order.id,
            orderNumber: order.orderNumber,
            totalAmount: order.totalAmount,
            status: order.status,
          },
        };
      } catch (error) {
        console.error("Error creating order:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create order",
        });
      }
    }),

  // Get user's orders
  getUserOrders: protectedProcedure
    .input(OrderListSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { page, limit, status, sortBy, sortOrder } = input;
        const offset = (page - 1) * limit;

        const where: any = {
          userId: ctx.session.user.id,
        };

        if (status) {
          where.status = status;
        }

        const orderBy: any = {};
        orderBy[sortBy] = sortOrder;

        const [orders, total] = await Promise.all([
          ctx.prisma.order.findMany({
            where,
            include: {
              orderItems: {
                include: {
                  product: {
                    select: {
                      slug: true,
                      images: {
                        where: { imageType: "THUMBNAIL", isActive: true },
                        select: { url: true },
                        take: 1,
                      },
                    },
                  },
                },
              },
            },
            skip: offset,
            take: limit,
            orderBy,
          }),
          ctx.prisma.order.count({ where }),
        ]);

        return {
          success: true,
          data: {
            orders,
            pagination: {
              page,
              limit,
              total,
              pages: Math.ceil(total / limit),
            },
          },
        };
      } catch (error) {
        console.error("Error fetching user orders:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch orders",
        });
      }
    }),

  // Get order by ID (user can only see their own orders)
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const order = await ctx.prisma.order.findFirst({
          where: {
            id: input.id,
            userId: ctx.session.user.id, // Ensure user can only see their orders
          },
          include: {
            orderItems: {
              include: {
                product: {
                  select: {
                    slug: true,
                    images: {
                      where: { imageType: "THUMBNAIL", isActive: true },
                      select: { url: true },
                      take: 1,
                    },
                  },
                },
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });

        if (!order) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }

        return {
          success: true,
          data: order,
        };
      } catch (error) {
        console.error("Error fetching order:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch order",
        });
      }
    }),

  // Cancel order (user can cancel pending orders)
  cancel: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const order = await ctx.prisma.order.findFirst({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
            status: "PENDING", // Can only cancel pending orders
          },
          include: {
            orderItems: true,
          },
        });

        if (!order) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found or cannot be cancelled",
          });
        }

        // Update order status and restore stock
        await ctx.prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: input.id },
            data: { status: "CANCELLED" },
          });

          // Restore product stock quantities
          for (const item of order.orderItems) {
            await tx.product.update({
              where: { id: item.productId },
              data: {
                stockQuantity: { increment: item.quantity },
              },
            });
          }
        });

        return {
          success: true,
          message: "Order cancelled successfully",
        };
      } catch (error) {
        console.error("Error cancelling order:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to cancel order",
        });
      }
    }),

  // Admin: Get all orders
  getAllOrders: adminProcedure
    .input(
      OrderListSchema.extend({
        userId: z.string().optional(),
        search: z.string().optional(), // Search by order number or customer email
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { page, limit, status, sortBy, sortOrder, userId, search } =
          input;
        const offset = (page - 1) * limit;

        const where: any = {};

        if (status) {
          where.status = status;
        }

        if (userId) {
          where.userId = userId;
        }

        if (search) {
          where.OR = [
            { orderNumber: { contains: search, mode: "insensitive" } },
            { customerEmail: { contains: search, mode: "insensitive" } },
          ];
        }

        const orderBy: any = {};
        orderBy[sortBy] = sortOrder;

        const [orders, total] = await Promise.all([
          ctx.prisma.order.findMany({
            where,
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
              orderItems: {
                select: {
                  id: true,
                  quantity: true,
                  unitPrice: true,
                  totalPrice: true,
                  productName: true,
                },
              },
            },
            skip: offset,
            take: limit,
            orderBy,
          }),
          ctx.prisma.order.count({ where }),
        ]);

        return {
          success: true,
          data: {
            orders,
            pagination: {
              page,
              limit,
              total,
              pages: Math.ceil(total / limit),
            },
          },
        };
      } catch (error) {
        console.error("Error fetching all orders:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch orders",
        });
      }
    }),

  // Admin: Update order status
  updateStatus: adminProcedure
    .input(UpdateOrderStatusSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { orderId, status, notes } = input;

        const order = await ctx.prisma.order.findUnique({
          where: { id: orderId },
          include: { orderItems: true },
        });

        if (!order) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }

        // Handle stock restoration for cancelled orders
        if (status === "CANCELLED" && order.status !== "CANCELLED") {
          await ctx.prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: orderId },
              data: { status },
            });

            // Restore stock for cancelled orders
            for (const item of order.orderItems) {
              await tx.product.update({
                where: { id: item.productId },
                data: {
                  stockQuantity: { increment: item.quantity },
                },
              });
            }
          });
        } else {
          await ctx.prisma.order.update({
            where: { id: orderId },
            data: { status },
          });
        }

        return {
          success: true,
          message: `Order status updated to ${status}`,
          data: { status },
        };
      } catch (error) {
        console.error("Error updating order status:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update order status",
        });
      }
    }),
});

// Helper function to generate unique order number
async function generateOrderNumber(): Promise<string> {
  const timestamp = Date.now().toString().slice(-8); // Last 8 digits of timestamp
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}-${random}`;
}
