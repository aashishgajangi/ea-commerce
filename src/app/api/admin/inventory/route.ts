import { NextRequest, NextResponse } from 'next/server';
import { 
  addStock, 
  removeStock, 
  setStock,
  getInventorySummary,
  getLowStockProducts,
  getOutOfStockProducts 
} from '@/lib/inventory';
import { z } from 'zod';

// Validation schema for inventory operations
const inventoryOperationSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(0, 'Quantity must be positive'),
  variantId: z.string().optional(),
  reason: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  userId: z.string().optional(),
  operation: z.enum(['add', 'remove', 'set']),
});

/**
 * GET /api/admin/inventory - Get inventory summary or lists
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const view = searchParams.get('view');

    if (view === 'summary') {
      const summary = await getInventorySummary();
      return NextResponse.json(summary);
    } else if (view === 'low-stock') {
      const limit = parseInt(searchParams.get('limit') || '20', 10);
      const products = await getLowStockProducts(limit);
      return NextResponse.json({ products });
    } else if (view === 'out-of-stock') {
      const limit = parseInt(searchParams.get('limit') || '20', 10);
      const products = await getOutOfStockProducts(limit);
      return NextResponse.json({ products });
    }

    return NextResponse.json(
      { error: 'Invalid view parameter. Use: summary, low-stock, or out-of-stock' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/inventory - Perform inventory operation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = inventoryOperationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { productId, quantity, variantId, reason, reference, notes, userId, operation } = validationResult.data;

    let result;
    switch (operation) {
      case 'add':
        result = await addStock(productId, quantity, { variantId, reason, reference, notes, userId });
        break;
      case 'remove':
        result = await removeStock(productId, quantity, { variantId, reason, reference, notes, userId });
        break;
      case 'set':
        result = await setStock(productId, quantity, { variantId, reason, reference, notes, userId });
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Stock ${operation}ed successfully`,
      ...result,
    });
  } catch (error) {
    console.error('Error performing inventory operation:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to perform inventory operation' },
      { status: 500 }
    );
  }
}