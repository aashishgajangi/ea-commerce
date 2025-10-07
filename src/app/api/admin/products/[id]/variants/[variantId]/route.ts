import { NextRequest, NextResponse } from 'next/server';
import { updateProductVariant, deleteProductVariant } from '@/lib/products';
import { z } from 'zod';

// Validation schema for updating a variant
const updateVariantSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  sku: z.string().optional(),
  options: z.string().optional(),
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).optional(),
  costPerItem: z.number().min(0).optional(),
  stockQuantity: z.number().int().optional(),
  weight: z.number().min(0).optional(),
  length: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  imageId: z.string().optional(),
});

/**
 * PUT /api/admin/products/[id]/variants/[variantId] - Update a product variant
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; variantId: string }> }
) {
  try {
    const { variantId } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updateVariantSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Update the variant
    const variant = await updateProductVariant(variantId, data);

    return NextResponse.json(variant);
  } catch (error) {
    console.error('Error updating product variant:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update product variant' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]/variants/[variantId] - Delete a product variant
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; variantId: string }> }
) {
  try {
    const { variantId } = await params;

    await deleteProductVariant(variantId);

    return NextResponse.json({ success: true, message: 'Variant deleted successfully' });
  } catch (error) {
    console.error('Error deleting product variant:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete product variant' },
      { status: 500 }
    );
  }
}