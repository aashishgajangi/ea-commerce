import { NextRequest, NextResponse } from 'next/server';
import { importProductsFromCSV } from '@/lib/products';

/**
 * POST /api/admin/products/import - Import products from CSV
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      return NextResponse.json(
        { error: 'File must be a CSV file' },
        { status: 400 }
      );
    }

    // Read file content
    const csvContent = await file.text();

    if (!csvContent.trim()) {
      return NextResponse.json(
        { error: 'File is empty' },
        { status: 400 }
      );
    }

    // Import products
    const results = await importProductsFromCSV(csvContent);

    return NextResponse.json({
      success: true,
      message: `Import completed. Created: ${results.created}, Updated: ${results.updated}, Errors: ${results.errors.length}`,
      results,
    });

  } catch (error) {
    console.error('Error importing products:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    );
  }
}