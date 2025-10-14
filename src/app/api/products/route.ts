import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET() {
  try {
    const { products } = await getProducts({
      status: 'published',
      isActive: true,
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
