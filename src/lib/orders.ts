/**
 * Order Management Library
 * Handles order operations, status updates, and payment verification
 */

import { db } from './db';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
  search?: string; // Search by order number, email, phone
  dateFrom?: Date;
  dateTo?: Date;
}

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
  pendingPayments: number;
  failedPayments: number;
}

/**
 * Get all orders with filters and pagination
 */
export async function getOrders(
  filters: OrderFilters = {},
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.paymentStatus) {
    where.paymentStatus = filters.paymentStatus;
  }

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.search) {
    where.OR = [
      { orderNumber: { contains: filters.search, mode: 'insensitive' } },
      { guestEmail: { contains: filters.search, mode: 'insensitive' } },
      { guestPhone: { contains: filters.search, mode: 'insensitive' } },
      { contactPhone: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      where.createdAt.gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      where.createdAt.lte = filters.dateTo;
    }
  }

  // Fetch orders
  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      include: {
        items: {
          include: {
            order: false,
          },
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    db.order.count({ where }),
  ]);

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get single order by ID
 */
export async function getOrderById(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return order;
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  const order = await db.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      statusHistory: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return order;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  comment?: string,
  updatedBy?: string
) {
  const order = await db.order.update({
    where: { id: orderId },
    data: {
      status,
      confirmedAt: status === 'confirmed' && !await db.order.findUnique({ where: { id: orderId } }).then(o => o?.confirmedAt) ? new Date() : undefined,
      deliveredAt: status === 'delivered' ? new Date() : undefined,
      cancelledAt: status === 'cancelled' ? new Date() : undefined,
      statusHistory: {
        create: {
          status,
          comment,
          updatedBy,
          createdAt: new Date(),
        },
      },
    },
    include: {
      items: true,
      statusHistory: true,
    },
  });

  return order;
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  paymentData?: object
) {
  const order = await db.order.update({
    where: { id: orderId },
    data: {
      paymentStatus,
      paymentData: paymentData || undefined,
    },
  });

  return order;
}

/**
 * Get order statistics
 */
export async function getOrderStats(): Promise<OrderStats> {
  const [
    total,
    pending,
    confirmed,
    delivered,
    cancelled,
    revenueData,
    pendingPayments,
    failedPayments,
  ] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: 'pending' } }),
    db.order.count({ where: { status: 'confirmed' } }),
    db.order.count({ where: { status: 'delivered' } }),
    db.order.count({ where: { status: 'cancelled' } }),
    db.order.aggregate({
      where: { paymentStatus: 'paid' },
      _sum: { total: true },
    }),
    db.order.count({ where: { paymentStatus: 'pending' } }),
    db.order.count({ where: { paymentStatus: 'failed' } }),
  ]);

  return {
    total,
    pending,
    confirmed,
    delivered,
    cancelled,
    totalRevenue: revenueData._sum.total || 0,
    pendingPayments,
    failedPayments,
  };
}

/**
 * Sync Razorpay payment status
 * Fetches payment details from Razorpay and updates order
 */
export async function syncRazorpayPaymentStatus(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.paymentMethod !== 'razorpay' || !order.paymentId) {
    throw new Error('Order is not a Razorpay payment');
  }

  try {
    // Fetch payment details from Razorpay
    // Note: paymentId in our DB is actually the Razorpay order_id
    // We need to fetch the order and get the payment_id from it
    const razorpay = await import('./razorpay').then(m => m.getRazorpayInstance());
    const razorpayOrder = await razorpay.orders.fetch(order.paymentId);

    // Determine payment status based on Razorpay order status
    let newPaymentStatus: PaymentStatus = 'pending';
    
    if (razorpayOrder.status === 'paid') {
      newPaymentStatus = 'paid';
    } else if (razorpayOrder.status === 'attempted') {
      newPaymentStatus = 'failed';
    }

    // Update order with Razorpay data
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: newPaymentStatus,
        paymentData: razorpayOrder as object,
      },
    });

    return {
      success: true,
      order: updatedOrder,
      razorpayData: razorpayOrder,
    };
  } catch (error) {
    console.error('Failed to sync Razorpay payment status:', error);
    throw new Error('Failed to sync payment status');
  }
}

/**
 * Get customer orders (for customer order history)
 */
export async function getCustomerOrders(userId: string, page: number = 1, limit: number = 10) {
  return getOrders({ userId }, page, limit);
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string, reason?: string, cancelledBy?: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status === 'delivered') {
    throw new Error('Cannot cancel delivered order');
  }

  if (order.status === 'cancelled') {
    throw new Error('Order is already cancelled');
  }

  return updateOrderStatus(orderId, 'cancelled', reason, cancelledBy);
}

/**
 * Get recent orders (for dashboard)
 */
export async function getRecentOrders(limit: number = 10) {
  const orders = await db.order.findMany({
    include: {
      items: {
        take: 3,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return orders;
}
