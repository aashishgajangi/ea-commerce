import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');

    const { products } = await getProducts({
      status: 'published',
      isActive: true,
      categoryId: categoryId || undefined,
      limit: 100,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
