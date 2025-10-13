import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HomepageSettings } from '@/lib/settings';
import { getCategories } from '@/lib/categories';
import { ThemedButton } from '@/components/ui/themed-button';

interface CategoriesShowcaseSectionProps {
  settings: HomepageSettings;
}

export default async function CategoriesShowcaseSection({ settings }: CategoriesShowcaseSectionProps) {
  if (!settings.showCategories) return null;

  const { categories } = await getCategories({
    isActive: true,
    limit: settings.categoriesCount,
  });

  if (categories.length === 0) return null;

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
            {settings.categoriesTitle}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto opacity-75"
            style={{ color: 'var(--theme-text, #1a1a1a)' }}
          >
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card 
                className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden"
                style={{
                  backgroundColor: 'var(--theme-background, #ffffff)',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={true}
                    />
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`,
                        opacity: 0.2,
                      }}
                    >
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: 'var(--theme-text, #1a1a1a)', opacity: 1 }}
                      >
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 text-center">
                  <h3 
                    className="font-semibold text-sm transition-colors"
                    style={{ 
                      color: 'var(--theme-text, #1a1a1a)',
                    }}
                  >
                    {category.name}
                  </h3>
                  {category.description && (
                    <p 
                      className="text-xs mt-1 line-clamp-2 opacity-75"
                      style={{ color: 'var(--theme-text, #1a1a1a)' }}
                    >
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <ThemedButton href="/products" variant="outline">
            Browse All Categories
          </ThemedButton>
        </div>
      </div>
    </section>
  );
}