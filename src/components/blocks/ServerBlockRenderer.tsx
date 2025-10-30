import { BlockInstance } from '@/lib/blocks/block-types';
import { db } from '@/lib/db';
import BlockRenderer from './BlockRenderer';
import ProductsGridBlock from './ProductsGridBlock';
import CategoriesGridBlock from './CategoriesGridBlock';
import { getGeneralSettings } from '@/lib/settings';
import { unstable_cache } from 'next/cache';

// Cached functions for better performance
const getCachedCategories = unstable_cache(
  async () => {
    return db.category.findMany({
      where: {
        isActive: true,
      },
      take: 6,
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        _count: {
          select: {
            products: {
              where: {
                status: 'published',
              },
            },
          },
        },
      },
    });
  },
  ['categories-grid'],
  { revalidate: 300 } // Cache for 5 minutes
);

const getCachedProducts = unstable_cache(
  async () => {
    return db.product.findMany({
      where: {
        status: 'published',
        isFeatured: true,
      },
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        compareAtPrice: true,
        stockQuantity: true,
        images: {
          take: 1,
          orderBy: {
            isPrimary: 'desc',
          },
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
  },
  ['products-grid'],
  { revalidate: 300 } // Cache for 5 minutes
);

interface ServerBlockRendererProps {
  blocks: BlockInstance[];
}

// Server Component that handles Products Grid with real data
export default async function ServerBlockRenderer({ blocks }: ServerBlockRendererProps) {
  console.log('ServerBlockRenderer: Processing blocks:', blocks.map(b => ({ type: b.type, enabled: b.enabled })));

  // Fetch currency once for all blocks
  const settings = await getGeneralSettings();
  const currency = settings.currency || 'USD';

  // Check if we need to fetch data for any blocks
  const needsProductsData = blocks.some(block => block.type === 'products_grid' && block.enabled);
  const needsCategoriesData = blocks.some(block => block.type === 'categories_grid' && block.enabled);
  
  // Fetch data in parallel if needed using cached functions
  const [products, categories] = await Promise.all([
    needsProductsData ? getCachedProducts() : Promise.resolve([]),
    needsCategoriesData ? getCachedCategories() : Promise.resolve([]),
  ]);

  console.log('ServerBlockRenderer: Fetched products:', products.length, 'categories:', categories.length);

  // Process blocks and attach data
  const processedBlocks = blocks.map((block) => {
    if (block.type === 'products_grid' && block.enabled) {
      return {
        ...block,
        data: {
          ...block.data,
          products: products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: Number(p.price),
            compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
            stock: p.stockQuantity,
            image: p.images[0]
              ? {
                  url: p.images[0].url,
                  alt: p.images[0].alt || p.name,
                }
              : null,
          })),
        },
      };
    }

    if (block.type === 'categories_grid' && block.enabled) {
      return {
        ...block,
        data: {
          ...block.data,
          categories: categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            image: c.image,
            _count: c._count,
          })),
        },
      };
    }

    return block;
  });

  // Render blocks with enhanced data
  return (
    <>
      {processedBlocks.map((block) => {
        if (!block.enabled) return null;

        // Products Grid with real data
        if (block.type === 'products_grid') {
          console.log('ServerBlockRenderer: Rendering products_grid with data');
          const data = block.data as Record<string, unknown>;
          const products = (data.products as Array<{
            id: string;
            name: string;
            slug: string;
            price: number;
            compareAtPrice?: number | null;
            stock: number;
            image: { url: string; alt: string } | null;
          }>) || [];

          return (
            <ProductsGridBlock
              key={block.id}
              title={data.title as string | undefined}
              subtitle={data.subtitle as string | undefined}
              products={products}
              backgroundColor={(data.backgroundColor as string) || 'var(--theme-background, #f9fafb)'}
              textColor={(data.textColor as string) || 'var(--theme-text, #1a1a1a)'}
              currency={currency}
              showPrice={data.showPrice !== false}
              showAddToCart={data.showAddToCart !== false}
            />
          );
        }

        // Categories Grid with real data
        if (block.type === 'categories_grid') {
          console.log('ServerBlockRenderer: Rendering categories_grid with data');
          const data = block.data as Record<string, unknown>;
          const categories = (data.categories as Array<{
            id: string;
            name: string;
            slug: string;
            description?: string;
            image?: string;
            _count?: { products: number };
          }>) || [];

          return (
            <CategoriesGridBlock
              key={block.id}
              title={data.title as string | undefined}
              subtitle={data.subtitle as string | undefined}
              categories={categories}
              backgroundColor={(data.backgroundColor as string) || 'var(--theme-background, #f9fafb)'}
              textColor={(data.textColor as string) || 'var(--theme-text, #1a1a1a)'}
              showCount={data.showCount !== false}
              style={(data.style as 'card' | 'minimal' | 'overlay') || 'card'}
              columns={(data.columns as number) || 3}
              shape={(data.shape as 'square' | 'circle') || 'square'}
            />
          );
        }

        // For all other blocks, use the client BlockRenderer
        return <BlockRenderer key={block.id} blocks={[block]} />;
      })}
    </>
  );
}
