import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

/**
 * Generate a unique slug for a product
 */
export async function generateUniqueProductSlug(name: string, excludeId?: string): Promise<string> {
  const slug = name
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
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'price' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'stockQuantity';
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
    stockStatus,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
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
    ...(stockStatus ? {
      ...(stockStatus === 'in_stock' ? { stockQuantity: { gt: 0 } } : {}),
      ...(stockStatus === 'out_of_stock' ? { stockQuantity: { lte: 0 } } : {}),
      ...(stockStatus === 'low_stock' ? {
        AND: [
          { stockQuantity: { gt: 0 } },
          { stockQuantity: { lte: db.product.fields.lowStockThreshold } }
        ]
      } : {}),
    } : {}),
    ...(createdAfter || createdBefore ? {
      createdAt: {
        ...(createdAfter ? { gte: createdAfter } : {}),
        ...(createdBefore ? { lte: createdBefore } : {}),
      },
    } : {}),
    ...(updatedAfter || updatedBefore ? {
      updatedAt: {
        ...(updatedAfter ? { gte: updatedAfter } : {}),
        ...(updatedBefore ? { lte: updatedBefore } : {}),
      },
    } : {}),
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
  weightBasedPricing?: boolean;
  weightSlotBase?: number;
  weightSlotMin?: number;
  weightSlotMax?: number;
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
    weightBasedPricing?: boolean;
    weightSlotBase?: number;
    weightSlotMin?: number;
    weightSlotMax?: number;
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

/**
 * Export products to CSV
 */
export async function exportProductsToCSV(options: {
  search?: string;
  categoryId?: string;
  status?: 'draft' | 'published' | 'archived' | 'all';
  isFeatured?: boolean;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}) {
  const products = await getProducts({
    ...options,
    limit: 10000, // Large limit for export
    offset: 0,
  });

  // CSV headers
  const headers = [
    'ID',
    'Name',
    'Slug',
    'SKU',
    'Description',
    'Short Description',
    'Category',
    'Price',
    'Compare At Price',
    'Cost Per Item',
    'Weight Based Pricing',
    'Track Inventory',
    'Stock Quantity',
    'Low Stock Threshold',
    'Is Featured',
    'Is Active',
    'Status',
    'Weight',
    'Length',
    'Width',
    'Height',
    'Meta Title',
    'Meta Description',
    'Meta Keywords',
    'Created At',
    'Updated At',
    'Published At',
  ];

  // Convert products to CSV rows
  const rows = products.products.map(product => [
    product.id,
    product.name,
    product.slug,
    product.sku || '',
    product.description || '',
    product.shortDescription || '',
    product.category?.name || '',
    product.price.toString(),
    product.compareAtPrice?.toString() || '',
    product.costPerItem?.toString() || '',
    product.weightBasedPricing ? 'true' : 'false',
    product.trackInventory ? 'true' : 'false',
    product.stockQuantity.toString(),
    product.lowStockThreshold?.toString() || '',
    product.isFeatured ? 'true' : 'false',
    product.isActive ? 'true' : 'false',
    product.status,
    product.weight?.toString() || '',
    product.length?.toString() || '',
    product.width?.toString() || '',
    product.height?.toString() || '',
    product.metaTitle || '',
    product.metaDescription || '',
    product.metaKeywords || '',
    product.createdAt.toISOString(),
    product.updatedAt.toISOString(),
    product.publishedAt?.toISOString() || '',
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csvContent;
}
/**
 * Import products from CSV
 */
export async function importProductsFromCSV(csvContent: string) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
  const expectedHeaders = [
    'ID', 'Name', 'Slug', 'SKU', 'Description', 'Short Description', 'Category',
    'Price', 'Compare At Price', 'Cost Per Item', 'Weight Based Pricing',
    'Track Inventory', 'Stock Quantity', 'Low Stock Threshold', 'Is Featured',
    'Is Active', 'Status', 'Weight', 'Length', 'Width', 'Height',
    'Meta Title', 'Meta Description', 'Meta Keywords', 'Created At', 'Updated At', 'Published At'
  ];

  // Validate headers (allow partial match for flexibility)
  const hasRequiredHeaders = expectedHeaders.slice(0, 8).every(expected =>
    headers.some(header => header.toLowerCase() === expected.toLowerCase())
  );

  if (!hasRequiredHeaders) {
    throw new Error('CSV must contain required columns: ID, Name, Slug, SKU, Description, Short Description, Category, Price');
  }

  const results = {
    created: 0,
    updated: 0,
    errors: [] as string[],
  };

  // Get all categories for lookup
  const categories = await db.category.findMany();
  const categoryMap = new Map(categories.map(cat => [cat.name.toLowerCase(), cat.id]));

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = parseCSVLine(lines[i]);
      if (values.length !== headers.length) {
        results.errors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }

      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => {
        rowData[header] = values[index] || '';
      });

      // Validate required fields
      if (!rowData['Name']?.trim()) {
        results.errors.push(`Row ${i + 1}: Name is required`);
        continue;
      }

      if (!rowData['Price']?.trim() || isNaN(parseFloat(rowData['Price']))) {
        results.errors.push(`Row ${i + 1}: Valid price is required`);
        continue;
      }

      // Find or create category
      let categoryId: string | undefined;
      if (rowData['Category']?.trim()) {
        const categoryName = rowData['Category'].trim();
        categoryId = categoryMap.get(categoryName.toLowerCase());
        if (!categoryId) {
          // Create new category
          const newCategory = await db.category.create({
            data: {
              name: categoryName,
              slug: await generateUniqueCategorySlug(categoryName),
            },
          });
          categoryId = newCategory.id;
          categoryMap.set(categoryName.toLowerCase(), categoryId);
        }
      }

      const productData = {
        name: rowData['Name'].trim(),
        slug: rowData['Slug']?.trim() || undefined,
        sku: rowData['SKU']?.trim() || undefined,
        description: rowData['Description']?.trim() || undefined,
        shortDescription: rowData['Short Description']?.trim() || undefined,
        categoryId,
        price: parseFloat(rowData['Price']),
        compareAtPrice: rowData['Compare At Price'] ? parseFloat(rowData['Compare At Price']) : undefined,
        costPerItem: rowData['Cost Per Item'] ? parseFloat(rowData['Cost Per Item']) : undefined,
        weightBasedPricing: rowData['Weight Based Pricing']?.toLowerCase() === 'true',
        trackInventory: rowData['Track Inventory']?.toLowerCase() !== 'false', // Default true
        stockQuantity: rowData['Stock Quantity'] ? parseInt(rowData['Stock Quantity']) : 0,
        lowStockThreshold: rowData['Low Stock Threshold'] ? parseInt(rowData['Low Stock Threshold']) : undefined,
        isFeatured: rowData['Is Featured']?.toLowerCase() === 'true',
        isActive: rowData['Is Active']?.toLowerCase() !== 'false', // Default true
        status: (rowData['Status']?.trim() || 'draft') as 'draft' | 'published' | 'archived',
        weight: rowData['Weight'] ? parseFloat(rowData['Weight']) : undefined,
        length: rowData['Length'] ? parseFloat(rowData['Length']) : undefined,
        width: rowData['Width'] ? parseFloat(rowData['Width']) : undefined,
        height: rowData['Height'] ? parseFloat(rowData['Height']) : undefined,
        metaTitle: rowData['Meta Title']?.trim() || undefined,
        metaDescription: rowData['Meta Description']?.trim() || undefined,
        metaKeywords: rowData['Meta Keywords']?.trim() || undefined,
      };

      // Check if product exists (by ID or name/SKU)
      let existingProduct = null;
      if (rowData['ID']?.trim()) {
        existingProduct = await db.product.findUnique({
          where: { id: rowData['ID'].trim() },
        });
      }

      if (!existingProduct && productData.sku) {
        existingProduct = await db.product.findFirst({
          where: { sku: productData.sku },
        });
      }

      if (existingProduct) {
        // Update existing product
        await updateProduct(existingProduct.id, productData);
        results.updated++;
      } else {
        // Create new product
        await createProduct(productData);
        results.created++;
      }

    } catch (error) {
      results.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return results;
}

/**
 * Parse a CSV line handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add the last field
  result.push(current);

  return result;
}

/**
 * Generate unique category slug (helper for import)
 */
async function generateUniqueCategorySlug(name: string, excludeId?: string): Promise<string> {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const existing = await db.category.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });

  if (!existing) {
    return slug;
  }

  let counter = 1;
  let newSlug = `${slug}-${counter}`;

  while (await db.category.findFirst({
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
 * Bulk update product price
 */
export async function bulkUpdateProductPrice(ids: string[], price: number, compareAtPrice?: number) {
  const updateData: { price: number; compareAtPrice?: number } = { price };
  if (compareAtPrice !== undefined) {
    updateData.compareAtPrice = compareAtPrice;
  }

  return db.product.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
}

/**
 * Bulk update product category
 */
export async function bulkUpdateProductCategory(ids: string[], categoryId: string | null) {
  return db.product.updateMany({
    where: { id: { in: ids } },
    data: { categoryId },
  });
}

/**
 * Bulk update product stock
 */
export async function bulkUpdateProductStock(ids: string[], stockQuantity: number) {
  return db.product.updateMany({
    where: { id: { in: ids } },
    data: { stockQuantity },
  });
}