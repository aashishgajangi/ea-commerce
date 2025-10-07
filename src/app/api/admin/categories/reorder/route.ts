import { NextRequest, NextResponse } from 'next/server';
import { reorderCategories } from '@/lib/categories';
import { z } from 'zod';

// Validation schema for reordering categories
const reorderSchema = z.object({
  orders: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
    })
  ),
});

/**
 * POST /api/admin/categories/reorder - Reorder categories
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = reorderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { orders } = validationResult.data;

    // Reorder categories
    await reorderCategories(orders);

    return NextResponse.json({ success: true, message: 'Categories reordered successfully' });
  } catch (error) {
    console.error('Error reordering categories:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to reorder categories' },
      { status: 500 }
    );
  }
}