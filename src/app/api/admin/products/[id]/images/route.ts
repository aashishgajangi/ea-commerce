import { NextRequest, NextResponse } from 'next/server';
import { addProductImage } from '@/lib/products';
import { z } from 'zod';

// Validation schema for adding an image
const addImageSchema = z.object({
  url: z.string().url('Valid URL is required'),
  alt: z.string().optional(),
  order: z.number().int().default(0),
  isPrimary: z.boolean().default(false),
});

/**
 * POST /api/admin/products/[id]/images - Add an image to a product
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = addImageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Add the image
    const image = await addProductImage({
      productId,
      ...data,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error adding product image:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add product image' },
      { status: 500 }
    );
  }
}