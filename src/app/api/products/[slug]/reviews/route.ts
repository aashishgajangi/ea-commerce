import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReview, getProductReviews } from '@/lib/reviews';
import { getProductBySlug } from '@/lib/products';

// Validation schema for creating a review
const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().optional(),
  comment: z.string().min(1, 'Comment is required'),
  userId: z.string().optional(), // For future auth integration
});

/**
 * GET /api/products/[slug]/reviews - Get reviews for a product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const orderBy = (searchParams.get('orderBy') || 'createdAt') as 'createdAt' | 'rating';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';

    // Get product by slug to get ID
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const result = await getProductReviews(product.id, {
      limit,
      offset,
      orderBy,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products/[slug]/reviews - Create a new review
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // Get product by slug to verify it exists
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = createReviewSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create the review
    const review = await createReview({
      productId: product.id,
      ...data,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}