import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, generateUniqueProductSlug, bulkUpdateProductStatus, bulkDeleteProducts } from '@/lib/products';
import { z } from 'zod';

// Validation schema for creating a product
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  sku: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  compareAtPrice: z.number().min(0).optional(),
  costPerItem: z.number().min(0).optional(),
  trackInventory: z.boolean().default(true),
  stockQuantity: z.number().int().default(0),
  lowStockThreshold: z.number().int().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  weight: z.number().min(0).optional(),
  length: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

// Validation schema for bulk operations
const bulkOperationSchema = z.object({
  ids: z.array(z.string()),
  action: z.enum(['delete', 'publish', 'draft', 'archive']),
});

/**
 * GET /api/admin/products - List all products
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId') || undefined;
    const status = (searchParams.get('status') || 'all') as 'draft' | 'published' | 'archived' | 'all';
    const isFeatured = searchParams.get('isFeatured') === 'true' ? true : undefined;
    const isActive = searchParams.get('isActive') === 'true' ? true : searchParams.get('isActive') === 'false' ? false : undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const inStock = searchParams.get('inStock') === 'true' ? true : undefined;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const orderBy = (searchParams.get('orderBy') || 'createdAt') as 'name' | 'price' | 'createdAt' | 'updatedAt' | 'publishedAt';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';

    const result = await getProducts({
      search,
      categoryId,
      status,
      isFeatured,
      isActive,
      minPrice,
      maxPrice,
      inStock,
      limit,
      offset,
      orderBy,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products - Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = createProductSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate slug if not provided
    const slug = data.slug || await generateUniqueProductSlug(data.name);

    // Create the product
    const product = await createProduct({
      ...data,
      slug,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/products - Bulk operations
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = bulkOperationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { ids, action } = validationResult.data;

    if (action === 'delete') {
      await bulkDeleteProducts(ids);
      return NextResponse.json({ success: true, message: `${ids.length} products deleted` });
    } else {
      // Map action to status
      const statusMap: Record<string, string> = {
        publish: 'published',
        draft: 'draft',
        archive: 'archived',
      };
      
      await bulkUpdateProductStatus(ids, statusMap[action]);
      return NextResponse.json({ success: true, message: `${ids.length} products updated` });
    }
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}