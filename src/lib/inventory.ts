import { db } from '@/lib/db';

/**
 * Add stock to a product or variant
 */
export async function addStock(
  productId: string,
  quantity: number,
  options: {
    variantId?: string;
    reason?: string;
    reference?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  const { variantId, reason = 'Stock added', reference, notes, userId } = options;

  // Get current stock
  let currentStock = 0;
  if (variantId) {
    const variant = await db.productVariant.findUnique({
      where: { id: variantId },
      select: { stockQuantity: true },
    });
    currentStock = variant?.stockQuantity || 0;
  } else {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { stockQuantity: true },
    });
    currentStock = product?.stockQuantity || 0;
  }

  const newStock = currentStock + quantity;

  // Update stock and create log in a transaction
  await db.$transaction([
    // Update stock
    variantId
      ? db.productVariant.update({
          where: { id: variantId },
          data: { stockQuantity: newStock },
        })
      : db.product.update({
          where: { id: productId },
          data: { stockQuantity: newStock },
        }),
    // Create log
    db.inventoryLog.create({
      data: {
        productId: variantId ? null : productId,
        variantId,
        type: 'add',
        quantity,
        previousStock: currentStock,
        newStock,
        reason,
        reference,
        notes,
        userId,
      },
    }),
  ]);

  return { previousStock: currentStock, newStock };
}

/**
 * Remove stock from a product or variant
 */
export async function removeStock(
  productId: string,
  quantity: number,
  options: {
    variantId?: string;
    reason?: string;
    reference?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  const { variantId, reason = 'Stock removed', reference, notes, userId } = options;

  // Get current stock
  let currentStock = 0;
  if (variantId) {
    const variant = await db.productVariant.findUnique({
      where: { id: variantId },
      select: { stockQuantity: true },
    });
    currentStock = variant?.stockQuantity || 0;
  } else {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { stockQuantity: true },
    });
    currentStock = product?.stockQuantity || 0;
  }

  const newStock = Math.max(0, currentStock - quantity);

  // Update stock and create log in a transaction
  await db.$transaction([
    // Update stock
    variantId
      ? db.productVariant.update({
          where: { id: variantId },
          data: { stockQuantity: newStock },
        })
      : db.product.update({
          where: { id: productId },
          data: { stockQuantity: newStock },
        }),
    // Create log
    db.inventoryLog.create({
      data: {
        productId: variantId ? null : productId,
        variantId,
        type: 'remove',
        quantity: -quantity,
        previousStock: currentStock,
        newStock,
        reason,
        reference,
        notes,
        userId,
      },
    }),
  ]);

  return { previousStock: currentStock, newStock };
}

/**
 * Set stock to a specific value
 */
export async function setStock(
  productId: string,
  quantity: number,
  options: {
    variantId?: string;
    reason?: string;
    reference?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  const { variantId, reason = 'Stock set', reference, notes, userId } = options;

  // Get current stock
  let currentStock = 0;
  if (variantId) {
    const variant = await db.productVariant.findUnique({
      where: { id: variantId },
      select: { stockQuantity: true },
    });
    currentStock = variant?.stockQuantity || 0;
  } else {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { stockQuantity: true },
    });
    currentStock = product?.stockQuantity || 0;
  }

  const difference = quantity - currentStock;

  // Update stock and create log in a transaction
  await db.$transaction([
    // Update stock
    variantId
      ? db.productVariant.update({
          where: { id: variantId },
          data: { stockQuantity: quantity },
        })
      : db.product.update({
          where: { id: productId },
          data: { stockQuantity: quantity },
        }),
    // Create log
    db.inventoryLog.create({
      data: {
        productId: variantId ? null : productId,
        variantId,
        type: 'set',
        quantity: difference,
        previousStock: currentStock,
        newStock: quantity,
        reason,
        reference,
        notes,
        userId,
      },
    }),
  ]);

  return { previousStock: currentStock, newStock: quantity };
}

/**
 * Record a sale (reduces stock)
 */
export async function recordSale(
  productId: string,
  quantity: number,
  options: {
    variantId?: string;
    reference?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  return removeStock(productId, quantity, {
    ...options,
    reason: 'Sale',
  });
}

/**
 * Record a return (increases stock)
 */
export async function recordReturn(
  productId: string,
  quantity: number,
  options: {
    variantId?: string;
    reference?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  return addStock(productId, quantity, {
    ...options,
    reason: 'Return',
  });
}

/**
 * Record an adjustment (manual correction)
 */
export async function recordAdjustment(
  productId: string,
  newQuantity: number,
  options: {
    variantId?: string;
    notes?: string;
    userId?: string;
  } = {}
) {
  return setStock(productId, newQuantity, {
    ...options,
    reason: 'Adjustment',
  });
}

/**
 * Get inventory logs for a product
 */
export async function getInventoryLogs(
  productId: string,
  options: {
    variantId?: string;
    type?: string;
    limit?: number;
    offset?: number;
  } = {}
) {
  const { variantId, type, limit = 50, offset = 0 } = options;

  const where = {
    ...(variantId ? { variantId } : { productId }),
    ...(type ? { type } : {}),
  };

  const [logs, total] = await Promise.all([
    db.inventoryLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    }),
    db.inventoryLog.count({ where }),
  ]);

  return {
    logs,
    total,
    limit,
    offset,
  };
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(limit: number = 20) {
  return db.product.findMany({
    where: {
      trackInventory: true,
      isActive: true,
      status: 'published',
      OR: [
        {
          AND: [
            { lowStockThreshold: { not: null } },
            { stockQuantity: { lte: db.product.fields.lowStockThreshold } },
          ],
        },
        {
          AND: [
            { lowStockThreshold: null },
            { stockQuantity: { lte: 10 } },
          ],
        },
      ],
    },
    include: {
      category: true,
      _count: {
        select: {
          variants: true,
        },
      },
    },
    orderBy: { stockQuantity: 'asc' },
    take: limit,
  });
}

/**
 * Get out of stock products
 */
export async function getOutOfStockProducts(limit: number = 20) {
  return db.product.findMany({
    where: {
      trackInventory: true,
      isActive: true,
      status: 'published',
      stockQuantity: { lte: 0 },
    },
    include: {
      category: true,
      _count: {
        select: {
          variants: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: limit,
  });
}

/**
 * Get inventory summary
 */
export async function getInventorySummary() {
  const [totalProducts, activeProducts, lowStock, outOfStock, totalValue] = await Promise.all([
    db.product.count({
      where: { trackInventory: true },
    }),
    db.product.count({
      where: { trackInventory: true, isActive: true, status: 'published' },
    }),
    db.product.count({
      where: {
        trackInventory: true,
        isActive: true,
        status: 'published',
        OR: [
          {
            AND: [
              { lowStockThreshold: { not: null } },
              { stockQuantity: { lte: db.product.fields.lowStockThreshold } },
            ],
          },
          {
            AND: [
              { lowStockThreshold: null },
              { stockQuantity: { lte: 10 } },
            ],
          },
        ],
      },
    }),
    db.product.count({
      where: {
        trackInventory: true,
        isActive: true,
        status: 'published',
        stockQuantity: { lte: 0 },
      },
    }),
    db.product.aggregate({
      where: { trackInventory: true, isActive: true },
      _sum: {
        stockQuantity: true,
      },
    }),
  ]);

  return {
    totalProducts,
    activeProducts,
    lowStock,
    outOfStock,
    totalQuantity: totalValue._sum.stockQuantity || 0,
  };
}