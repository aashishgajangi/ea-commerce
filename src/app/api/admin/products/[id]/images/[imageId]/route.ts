import { NextRequest, NextResponse } from 'next/server';
import { updateProductImage, deleteProductImage } from '@/lib/products';
import { z } from 'zod';

// Validation schema for updating an image
const updateImageSchema = z.object({
  url: z.string().url('Valid URL is required').optional(),
  alt: z.string().optional(),
  order: z.number().int().optional(),
  isPrimary: z.boolean().optional(),
});

/**
 * PUT /api/admin/products/[id]/images/[imageId] - Update a product image
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { imageId } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updateImageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Update the image
    const image = await updateProductImage(imageId, data);

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error updating product image:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update product image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]/images/[imageId] - Delete a product image
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { imageId } = await params;

    await deleteProductImage(imageId);

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting product image:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete product image' },
      { status: 500 }
    );
  }
}