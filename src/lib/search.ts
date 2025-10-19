import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { cache } from '@/lib/redis';

/**
 * Search products with ranking algorithm
 */
export async function searchProducts(options: {
  query: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'relevance' | 'name' | 'price' | 'date';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}) {
  const {
    query,
    categoryId,
    minPrice,
    maxPrice,
    inStock,
    sortBy = 'relevance',
    order = 'desc',
    limit = 20,
    offset = 0,
  } = options;

  // Sanitize and validate query
  const searchQuery = query.trim().toLowerCase();
  
  if (!searchQuery || searchQuery.length < 2) {
    return {
      products: [],
      total: 0,
      page: Math.floor(offset / limit) + 1,
      totalPages: 0,
      query: searchQuery,
    };
  }

  // Try to get from cache first (cache for 5 minutes)
  const cacheKey = `search:${searchQuery}:${categoryId || 'all'}:${minPrice || 0}:${maxPrice || 0}:${inStock || 'all'}:${sortBy}:${order}:${limit}:${offset}`;
  
  try {
    const cached = await cache.get<typeof result>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Redis cache error:', error);
  }

  // Build where clause
  const where: Prisma.ProductWhereInput = {
    status: 'published',
    isActive: true,
    OR: [
      { name: { contains: searchQuery, mode: 'insensitive' } },
      { description: { contains: searchQuery, mode: 'insensitive' } },
      { shortDescription: { contains: searchQuery, mode: 'insensitive' } },
      { sku: { contains: searchQuery, mode: 'insensitive' } },
    ],
    ...(categoryId ? { categoryId } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined ? {
      price: {
        ...(minPrice !== undefined ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
      },
    } : {}),
    ...(inStock ? { stockQuantity: { gt: 0 } } : {}),
  };

  // Get total count
  const total = await db.product.count({ where });

  // Determine order by
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
  
  if (sortBy === 'name') {
    orderBy = { name: order };
  } else if (sortBy === 'price') {
    orderBy = { price: order };
  } else if (sortBy === 'date') {
    orderBy = { createdAt: order };
  }
  // For 'relevance', we'll sort manually after fetching

  // Fetch products
  const products = await db.product.findMany({
    where,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: [
          { isPrimary: 'desc' },
          { order: 'asc' },
        ],
        take: 1,
      },
    },
    orderBy: sortBy === 'relevance' ? { createdAt: 'desc' } : orderBy,
    skip: offset,
    take: limit,
  });

  // Calculate relevance score if sorting by relevance
  let rankedProducts = products;
  
  if (sortBy === 'relevance') {
    type ProductWithScore = typeof products[0] & { relevanceScore: number };
    
    rankedProducts = products.map(product => {
      let score = 0;
      const lowerName = product.name.toLowerCase();
      const lowerDesc = (product.description || '').toLowerCase();
      const lowerShortDesc = (product.shortDescription || '').toLowerCase();
      const lowerSku = (product.sku || '').toLowerCase();

      // Exact match in name: +100
      if (lowerName === searchQuery) score += 100;
      
      // Exact match in SKU: +80
      if (lowerSku === searchQuery) score += 80;
      
      // Starts with query in name: +50
      if (lowerName.startsWith(searchQuery)) score += 50;
      
      // Contains query in name: +30
      if (lowerName.includes(searchQuery)) score += 30;
      
      // Contains in short description: +15
      if (lowerShortDesc.includes(searchQuery)) score += 15;
      
      // Contains in description: +10
      if (lowerDesc.includes(searchQuery)) score += 10;
      
      // Is featured: +20
      if (product.isFeatured) score += 20;
      
      // In stock: +10
      if (product.stockQuantity > 0) score += 10;
      
      // Recently added (within 30 days): +5
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (product.createdAt > thirtyDaysAgo) score += 5;

      return { ...product, relevanceScore: score } as ProductWithScore;
    }).sort((a, b) => (b as ProductWithScore).relevanceScore - (a as ProductWithScore).relevanceScore);
  }

  const result = {
    products: rankedProducts,
    total,
    page: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(total / limit),
    query: searchQuery,
  };

  // Cache the result for 5 minutes
  try {
    await cache.set(cacheKey, result, 300);
  } catch (error) {
    console.error('Redis cache set error:', error);
  }

  return result;
}

/**
 * Get search suggestions (autocomplete)
 */
export async function getSearchSuggestions(query: string, limit = 5) {
  const searchQuery = query.trim().toLowerCase();
  
  if (!searchQuery || searchQuery.length < 2) {
    return [];
  }

  // Try cache first (1 hour)
  const cacheKey = `suggestions:${searchQuery}:${limit}`;
  
  try {
    const cached = await cache.get<typeof suggestions>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Redis cache error:', error);
  }

  // Get product suggestions
  const products = await db.product.findMany({
    where: {
      status: 'published',
      isActive: true,
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      images: {
        where: { isPrimary: true },
        select: { url: true, alt: true },
        take: 1,
      },
    },
    take: limit,
    orderBy: [
      { isFeatured: 'desc' },
      { name: 'asc' },
    ],
  });

  const suggestions = products.map(p => ({
    type: 'product' as const,
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    image: p.images[0]?.url || null,
  }));

  // Cache for 1 hour
  try {
    await cache.set(cacheKey, suggestions, 3600);
  } catch (error) {
    console.error('Redis cache set error:', error);
  }

  return suggestions;
}

/**
 * Get popular search queries
 */
export async function getPopularSearches(limit = 10): Promise<string[]> {
  // This would require a SearchHistory model
  // For now, return some default popular searches
  return [
    'laptop',
    'phone',
    'headphones',
    'camera',
    'watch',
  ].slice(0, limit);
}

/**
 * Calculate search relevance score
 */
export function calculateRelevanceScore(product: {
  name: string;
  description?: string | null;
  shortDescription?: string | null;
  sku?: string | null;
  isFeatured: boolean;
  stockQuantity: number;
  createdAt: Date;
}, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();
  const lowerName = product.name.toLowerCase();
  const lowerDesc = (product.description || '').toLowerCase();
  const lowerShortDesc = (product.shortDescription || '').toLowerCase();
  const lowerSku = (product.sku || '').toLowerCase();

  // Exact match in name: +100
  if (lowerName === lowerQuery) score += 100;
  
  // Exact match in SKU: +80
  if (lowerSku === lowerQuery) score += 80;
  
  // Starts with query in name: +50
  if (lowerName.startsWith(lowerQuery)) score += 50;
  
  // Contains query in name: +30
  if (lowerName.includes(lowerQuery)) score += 30;
  
  // Contains in short description: +15
  if (lowerShortDesc.includes(lowerQuery)) score += 15;
  
  // Contains in description: +10
  if (lowerDesc.includes(lowerQuery)) score += 10;
  
  // Is featured: +20
  if (product.isFeatured) score += 20;
  
  // In stock: +10
  if (product.stockQuantity > 0) score += 10;
  
  // Recently added (within 30 days): +5
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  if (product.createdAt > thirtyDaysAgo) score += 5;

  return score;
}

/**
 * Clear search cache
 */
export async function clearSearchCache(pattern = 'search:*') {
  try {
    await cache.delPattern(pattern);
  } catch (error) {
    console.error('Error clearing search cache:', error);
  }
}
