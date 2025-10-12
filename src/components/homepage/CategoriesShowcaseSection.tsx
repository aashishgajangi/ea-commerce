import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HomepageSettings } from '@/lib/settings';
import { getCategories } from '@/lib/categories';

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {settings.categoriesTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <span className="text-2xl font-bold text-gray-600">
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
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}