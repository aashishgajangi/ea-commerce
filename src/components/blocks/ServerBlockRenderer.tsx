import { BlockInstance } from '@/lib/blocks/block-types';
import { db } from '@/lib/db';
import BlockRenderer from './BlockRenderer';
import ProductsGridBlock from './ProductsGridBlock';
import CategoriesGridBlock from './CategoriesGridBlock';
import { getGeneralSettings } from '@/lib/settings';

interface ServerBlockRendererProps {
  blocks: BlockInstance[];
}

// Server Component that handles Products Grid with real data
export default async function ServerBlockRenderer({ blocks }: ServerBlockRendererProps) {
  console.log('ServerBlockRenderer: Processing blocks:', blocks.map(b => ({ type: b.type, enabled: b.enabled })));
  
  // Fetch currency once for all blocks
  const settings = await getGeneralSettings();
  const currency = settings.currency || 'USD';
  
  // Process blocks and fetch data for Products Grid and Categories Grid blocks
  const processedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (block.type === 'products_grid' && block.enabled) {
        console.log('ServerBlockRenderer: Found products_grid block, fetching products...');
        // Fetch real products for this block
        const products = await db.product.findMany({
          where: {
            status: 'published',
            isFeatured: true,
          },
          take: 8,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            images: {
              take: 1,
              orderBy: {
                isPrimary: 'desc',
              },
            },
          },
        });

        console.log('ServerBlockRenderer: Fetched products:', products.length);

        // Return enhanced block with products data
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
        console.log('ServerBlockRenderer: Found categories_grid block, fetching categories...');
        // Fetch real categories for this block
        const categories = await db.category.findMany({
          where: {
            isActive: true,
          },
          take: 6,
          orderBy: {
            order: 'asc',
          },
          include: {
            _count: {
              select: {
                products: true,
              },
            },
          },
        });

        console.log('ServerBlockRenderer: Fetched categories:', categories.length);

        // Return enhanced block with categories data
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
    })
  );

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
            />
          );
        }

        // For all other blocks, use the client BlockRenderer
        return <BlockRenderer key={block.id} blocks={[block]} />;
      })}
    </>
  );
}
