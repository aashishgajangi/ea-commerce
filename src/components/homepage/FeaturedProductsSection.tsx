import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HomepageSettings } from '@/lib/settings';
import { getProducts } from '@/lib/products';
import { ThemedButton } from '@/components/ui/themed-button';

interface FeaturedProductsSectionProps {
  settings: HomepageSettings;
}

export default async function FeaturedProductsSection({ settings }: FeaturedProductsSectionProps) {
  if (!settings.showFeaturedProducts) return null;

  const { products } = await getProducts({
    status: 'published',
    isActive: true,
    isFeatured: true,
    limit: settings.featuredProductsCount,
  });

  if (products.length === 0) return null;

  // Fetch currency from config
  const { config } = await import('@/lib/config');
  const currency = await config.get('currency') || 'USD';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAt: number | null) => {
    if (!compareAt || compareAt <= price) return null;
    return Math.round(((compareAt - price) / compareAt) * 100);
  };

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: 'var(--theme-background, #ffffff)',
        color: 'var(--theme-text, #1a1a1a)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--theme-text, #1a1a1a)' }}
          >
            {settings.featuredProductsTitle}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto opacity-75"
            style={{ color: 'var(--theme-text, #1a1a1a)' }}
          >
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
            const discount = calculateDiscount(product.price, product.compareAtPrice);

            return (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-background, #ffffff)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    {primaryImage ? (
                      <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}

                    {/* Featured badge */}
                    <div 
                      className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1"
                      style={{
                        backgroundColor: 'var(--theme-primary, #0070f3)',
                        borderRadius: 'var(--theme-radius, 0.375rem)',
                      }}
                    >
                      Featured
                    </div>

                    {/* Discount badge */}
                    {discount && (
                      <div 
                        className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1"
                        style={{
                          backgroundColor: 'var(--theme-accent, #ff6b35)',
                          borderRadius: 'var(--theme-radius, 0.375rem)',
                        }}
                      >
                        -{discount}%
                      </div>
                    )}

                    {/* Out of stock overlay */}
                    {product.stockQuantity === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 
                      className="font-semibold text-lg mb-2 line-clamp-2 transition-colors"
                      style={{ color: 'var(--theme-text, #1a1a1a)' }}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="text-xl font-bold"
                        style={{ color: 'var(--theme-text, #1a1a1a)' }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span 
                          className="text-sm line-through opacity-60"
                          style={{ color: 'var(--theme-text, #1a1a1a)' }}
                        >
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {product.category && (
                      <span 
                        className="text-xs px-2 py-1"
                        style={{
                          color: 'var(--theme-text, #1a1a1a)',
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          borderRadius: 'var(--theme-radius, 0.375rem)',
                        }}
                      >
                        {product.category.name}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <ThemedButton href="/products" variant="primary">
            View All Products
          </ThemedButton>
        </div>
      </div>
    </section>
  );
}