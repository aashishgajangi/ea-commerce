import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';
import { z } from 'zod';

type UpdateProductData = {
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
};

// Helper function to handle empty strings and null values for numeric fields
const optionalNumber = (schema: z.ZodNumber) =>
  z.preprocess((val) => {
    if (val === null || val === undefined) return undefined;
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return val;
  }, schema.optional());

// Validation schema for updating a product
const updateProductSchema = z.object({
  // Required fields
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  weightBasedPricing: z.boolean(),
  trackInventory: z.boolean(),
  stockQuantity: z.number().int().min(0, 'Stock quantity cannot be negative'),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  status: z.enum(['draft', 'published', 'archived'], { required_error: 'Status is required' }),

  // Optional fields
  sku: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  compareAtPrice: optionalNumber(z.number().min(0)),
  costPerItem: optionalNumber(z.number().min(0)),
  lowStockThreshold: optionalNumber(z.number().int().min(0)),
  weight: optionalNumber(z.number().min(0)),
  length: optionalNumber(z.number().min(0)),
  width: optionalNumber(z.number().min(0)),
  height: optionalNumber(z.number().min(0)),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

/**
 * GET /api/admin/products/[id] - Get a single product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/products/[id] - Update a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updateProductSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const updateData = data as UpdateProductData;

    // Update the product
    const product = await updateProduct(id, updateData);

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id] - Delete a product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteProduct(id);

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}