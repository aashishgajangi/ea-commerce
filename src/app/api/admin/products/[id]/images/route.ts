import { NextRequest, NextResponse } from 'next/server';
import { addProductImage } from '@/lib/products';
import { uploadFile } from '@/lib/media';

/**
 * POST /api/admin/products/[id]/images - Upload or add an image to a product
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const contentType = request.headers.get('content-type') || '';

    let url: string;
    let alt: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get('file') as File;
      alt = formData.get('alt') as string || undefined;

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Upload the file using the media library
      const uploadResult = await uploadFile(file);
      url = uploadResult.url;
    } else {
      // Handle URL-based image addition (from media library)
      const body = await request.json();
      url = body.url;
      alt = body.alt;

      if (!url) {
        return NextResponse.json(
          { error: 'URL is required' },
          { status: 400 }
        );
      }
    }

    // Add the image to the product
    const image = await addProductImage({
      productId,
      url,
      alt,
      order: 0,
      isPrimary: false,
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