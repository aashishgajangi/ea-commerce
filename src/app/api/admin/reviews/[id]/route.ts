import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getReviewById, updateReview, deleteReview } from '@/lib/reviews';

// Validation schema for updating a review
const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().optional(),
  comment: z.string().min(1).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  isVerifiedPurchase: z.boolean().optional(),
});

/**
 * GET /api/admin/reviews/[id] - Get a single review
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await getReviewById(id);

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/reviews/[id] - Update a review
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updateReviewSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Update the review
    const review = await updateReview(id, data);

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error updating review:', error);

    if (error instanceof Error && error.message === 'Record to update not found.') {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/reviews/[id] - Delete a review
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteReview(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);

    if (error instanceof Error && error.message === 'Record to delete does not exist.') {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}