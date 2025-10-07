import { NextRequest, NextResponse } from 'next/server';
import { getProductVariants, createProductVariant } from '@/lib/products';
import { z } from 'zod';

// Validation schema for creating a variant
const createVariantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().optional(),
  options: z.string().min(1, 'Options are required'), // JSON string
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).optional(),
  costPerItem: z.number().min(0).optional(),
  stockQuantity: z.number().int().default(0),
  weight: z.number().min(0).optional(),
  length: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  imageId: z.string().optional(),
});

/**
 * GET /api/admin/products/[id]/variants - Get all variants for a product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    const variants = await getProductVariants(productId);

    return NextResponse.json({ variants });
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product variants' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products/[id]/variants - Create a new variant
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = createVariantSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create the variant
    const variant = await createProductVariant({
      productId,
      ...data,
    });

    return NextResponse.json(variant, { status: 201 });
  } catch (error) {
    console.error('Error creating product variant:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product variant' },
      { status: 500 }
    );
  }
}