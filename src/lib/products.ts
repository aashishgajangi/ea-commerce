import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

/**
 * Generate a unique slug for a product
 */
export async function generateUniqueProductSlug(name: string, excludeId?: string): Promise<string> {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Check if slug exists
  const existing = await db.product.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });

  if (!existing) {
    return slug;
  }

  // If slug exists, append a number
  let counter = 1;
  let newSlug = `${slug}-${counter}`;
  
  while (await db.product.findFirst({
    where: {
      slug: newSlug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  })) {
    counter++;
    newSlug = `${slug}-${counter}`;
  }

  return newSlug;
}

/**
 * Get all products with optional filtering
 */
export async function getProducts(options: {
  search?: string;
  categoryId?: string;
  status?: 'draft' | 'published' | 'archived' | 'all';
  isFeatured?: boolean;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'price' | 'createdAt' | 'updatedAt' | 'publishedAt';
  order?: 'asc' | 'desc';
}) {
  const {
    search = '',
    categoryId,
    status = 'all',
    isFeatured,
    isActive,
    minPrice,
    maxPrice,
    inStock,
    limit = 20,
    offset = 0,
    orderBy = 'createdAt',
    order = 'desc',
  } = options;

  const where: Prisma.ProductWhereInput = {
    ...(search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ],
    } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(status !== 'all' ? { status } : {}),
    ...(isFeatured !== undefined ? { isFeatured } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined ? {
      price: {
        ...(minPrice !== undefined ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
      },
    } : {}),
    ...(inStock ? { stockQuantity: { gt: 0 } } : {}),
  };

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
        },
        variants: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
        _count: {
          select: {
            variants: true,
            images: true,
          },
        },
      },
      orderBy: { [orderBy]: order },
      skip: offset,
      take: limit,
    }),
    db.product.count({ where }),
  ]);

  return {
    products,
    total,
    limit,
    offset,
  };
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string) {
  return db.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
      variants: {
        orderBy: { name: 'asc' },
      },
      _count: {
        select: {
          variants: true,
          images: true,
        },
      },
    },
  });
}

/**
 * Get a product by slug
 */
export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      category: {
        include: {
          parent: true,
        },
      },
      images: {
        orderBy: { order: 'asc' },
      },
      variants: {
        where: { isActive: true },
        orderBy: { name: 'asc' },
      },
    },
  });
}

/**
 * Create a new product
 */
export async function createProduct(data: {
  name: string;
  slug?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  categoryId?: string;
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  trackInventory?: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  status?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}) {
  const slug = data.slug || await generateUniqueProductSlug(data.name);

  return db.product.create({
    data: {
      ...data,
      slug,
    },
    include: {
      category: true,
      images: true,
      variants: true,
    },
  });
}

/**
 * Update a product
 */
export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    sku?: string;
    description?: string;
    shortDescription?: string;
    categoryId?: string | null;
    price?: number;
    compareAtPrice?: number;
    costPerItem?: number;
    trackInventory?: boolean;
    stockQuantity?: number;
    lowStockThreshold?: number;
    isFeatured?: boolean;
    isActive?: boolean;
    status?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    publishedAt?: Date | null;
  }
) {
  // If name is being changed and slug is not provided, generate new slug
  if (data.name && !data.slug) {
    data.slug = await generateUniqueProductSlug(data.name, id);
  } else if (data.slug) {
    // Validate slug uniqueness
    data.slug = await generateUniqueProductSlug(data.slug, id);
  }

  return db.product.update({
    where: { id },
    data,
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
      variants: {
        orderBy: { name: 'asc' },
      },
    },
  });
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  return db.product.delete({
    where: { id },
  });
}

/**
 * Add image to product
 */
export async function addProductImage(data: {
  productId: string;
  url: string;
  alt?: string;
  order?: number;
  isPrimary?: boolean;
}) {
  // If this is set as primary, unset other primary images
  if (data.isPrimary) {
    await db.productImage.updateMany({
      where: { productId: data.productId, isPrimary: true },
      data: { isPrimary: false },
    });
  }

  return db.productImage.create({
    data,
  });
}

/**
 * Update product image
 */
export async function updateProductImage(
  id: string,
  data: {
    url?: string;
    alt?: string;
    order?: number;
    isPrimary?: boolean;
  }
) {
  // If this is set as primary, unset other primary images
  if (data.isPrimary) {
    const image = await db.productImage.findUnique({ where: { id } });
    if (image) {
      await db.productImage.updateMany({
        where: { productId: image.productId, isPrimary: true, id: { not: id } },
        data: { isPrimary: false },
      });
    }
  }

  return db.productImage.update({
    where: { id },
    data,
  });
}

/**
 * Delete product image
 */
export async function deleteProductImage(id: string) {
  return db.productImage.delete({
    where: { id },
  });
}

/**
 * Create product variant
 */
export async function createProductVariant(data: {
  productId: string;
  name: string;
  sku?: string;
  options: string; // JSON string
  price?: number;
  compareAtPrice?: number;
  costPerItem?: number;
  stockQuantity?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  isActive?: boolean;
  imageId?: string;
}) {
  return db.productVariant.create({
    data,
  });
}

/**
 * Update product variant
 */
export async function updateProductVariant(
  id: string,
  data: {
    name?: string;
    sku?: string;
    options?: string;
    price?: number;
    compareAtPrice?: number;
    costPerItem?: number;
    stockQuantity?: number;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    isActive?: boolean;
    imageId?: string;
  }
) {
  return db.productVariant.update({
    where: { id },
    data,
  });
}

/**
 * Delete product variant
 */
export async function deleteProductVariant(id: string) {
  return db.productVariant.delete({
    where: { id },
  });
}

/**
 * Get product variants
 */
export async function getProductVariants(productId: string) {
  return db.productVariant.findMany({
    where: { productId },
    orderBy: { name: 'asc' },
  });
}

/**
 * Bulk update product status
 */
export async function bulkUpdateProductStatus(ids: string[], status: string) {
  return db.product.updateMany({
    where: { id: { in: ids } },
    data: { status },
  });
}

/**
 * Bulk delete products
 */
export async function bulkDeleteProducts(ids: string[]) {
  return db.product.deleteMany({
    where: { id: { in: ids } },
  });
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 10) {
  return db.product.findMany({
    where: {
      isFeatured: true,
      isActive: true,
      status: 'published',
    },
    include: {
      category: true,
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categoryId: string,
  options: {
    limit?: number;
    offset?: number;
    orderBy?: 'name' | 'price' | 'createdAt';
    order?: 'asc' | 'desc';
  } = {}
) {
  const { limit = 20, offset = 0, orderBy = 'createdAt', order = 'desc' } = options;

  return db.product.findMany({
    where: {
      categoryId,
      isActive: true,
      status: 'published',
    },
    include: {
      category: true,
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: { [orderBy]: order },
    skip: offset,
    take: limit,
  });
}