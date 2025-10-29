import Image from 'next/image';
import Link from 'next/link';
import { BlockInstance } from '@/lib/blocks/block-types';
import { db } from '@/lib/db';
import BlockRenderer from './BlockRenderer';

interface ServerBlockRendererProps {
  blocks: BlockInstance[];
}

// Server Component that handles Products Grid with real data
export default async function ServerBlockRenderer({ blocks }: ServerBlockRendererProps) {
  console.log('ServerBlockRenderer: Processing blocks:', blocks.map(b => ({ type: b.type, enabled: b.enabled })));
  
  // Process blocks and fetch data for Products Grid blocks
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
              price: p.price,
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
            image: { url: string; alt: string } | null;
          }>) || [];

          return (
            <section
              key={block.id}
              className="py-16"
              style={{
                backgroundColor: (data.backgroundColor as string) || 'var(--theme-background, #f9fafb)',
              }}
            >
              <div className="container mx-auto px-4">
                {data.title ? (
                  <h2
                    className="text-3xl md:text-4xl font-bold mb-8 text-center"
                    style={{
                      color: (data.textColor as string) || 'var(--theme-text, #1a1a1a)',
                    }}
                  >
                    {data.title as string}
                  </h2>
                ) : null}

                {data.subtitle ? (
                  <p
                    className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80"
                    style={{
                      color: (data.textColor as string) || 'var(--theme-text, #1a1a1a)',
                    }}
                  >
                    {data.subtitle as string}
                  </p>
                ) : null}

                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          {product.image ? (
                            <Image
                              src={product.image.url}
                              alt={product.image.alt}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-lg font-bold" style={{ color: 'var(--theme-primary, #0070f3)' }}>
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mb-8">No featured products available</p>
                )}

                {/* View All Button */}
                <div className="text-center">
                  <Link
                    href="/products"
                    className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      backgroundColor: 'var(--theme-primary, #0070f3)',
                      color: '#ffffff',
                    }}
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </section>
          );
        }

        // For all other blocks, use the client BlockRenderer
        return <BlockRenderer key={block.id} blocks={[block]} />;
      })}
    </>
  );
}
