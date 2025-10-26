import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
import { cache as redis } from '@/lib/redis';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');

    // Create cache key
    const cacheKey = `products:list:${categoryId || 'all'}`;

    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached && typeof cached === 'string') {
      console.log('✅ Products served from cache');
      return NextResponse.json(JSON.parse(cached));
    }

    // If not in cache, fetch from database
    const { products } = await getProducts({
      status: 'published',
      isActive: true,
      categoryId: categoryId || undefined,
      limit: 50, // Reduced from 100 to 50 for faster loading
    });

    // Optimize response: only send necessary data
    const optimizedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      stockQuantity: p.stockQuantity,
      shortDescription: p.shortDescription,
      category: p.category ? { id: p.category.id, name: p.category.name } : null,
      images: p.images.slice(0, 1), // Only send first image for listing
    }));

    const response = { products: optimizedProducts };

    // Cache for 5 minutes (300 seconds)
    await redis.set(cacheKey, JSON.stringify(response), 300);
    console.log('💾 Products cached for 5 minutes');

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
