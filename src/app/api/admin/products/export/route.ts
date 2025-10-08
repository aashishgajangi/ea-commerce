import { NextRequest, NextResponse } from 'next/server';
import { exportProductsToCSV } from '@/lib/products';

/**
 * GET /api/admin/products/export - Export products to CSV
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId') || undefined;
    const status = (searchParams.get('status') || 'all') as 'draft' | 'published' | 'archived' | 'all';
    const isFeatured = searchParams.get('isFeatured') === 'true' ? true : undefined;
    const isActive = searchParams.get('isActive') === 'true' ? true : searchParams.get('isActive') === 'false' ? false : undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const inStock = searchParams.get('inStock') === 'true' ? true : undefined;

    const csvContent = await exportProductsToCSV({
      search,
      categoryId,
      status,
      isFeatured,
      isActive,
      minPrice,
      maxPrice,
      inStock,
    });

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="products-export.csv"',
      },
    });
  } catch (error) {
    console.error('Error exporting products:', error);
    return NextResponse.json(
      { error: 'Failed to export products' },
      { status: 500 }
    );
  }
}