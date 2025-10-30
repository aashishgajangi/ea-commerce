'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: {
    products: number;
  };
}

interface CategoriesGridBlockProps {
  title?: string;
  subtitle?: string;
  categories: Category[];
  backgroundColor?: string;
  textColor?: string;
  showCount?: boolean;
  style?: 'card' | 'minimal' | 'overlay';
  columns?: number;
}

export default function CategoriesGridBlock({
  title,
  subtitle,
  categories,
  backgroundColor = 'var(--theme-background, #f9fafb)',
  textColor = 'var(--theme-text, #1a1a1a)',
  showCount = true,
  style = 'card',
  columns = 3,
}: CategoriesGridBlockProps) {

  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  };

  return (
    <section
      className="py-16"
      style={{
        backgroundColor,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        {title && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: textColor }}
          >
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80"
            style={{ color: textColor }}
          >
            {subtitle}
          </p>
        )}

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className={`grid ${getGridCols()} gap-6 mb-8`}>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  style === 'card'
                    ? 'bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    : style === 'minimal'
                    ? 'hover:scale-105'
                    : 'relative'
                }`}
              >
                {/* Category Image */}
                <Link href={`/products?category=${category.slug}`} className="block">
                  <div className={`relative ${style === 'overlay' ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100`}>
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}

                    {/* Overlay for overlay style */}
                    {style === 'overlay' && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">Shop Now</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Category Info */}
                <div className={`p-4 ${style === 'overlay' ? 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white' : ''}`}>
                  <Link href={`/products?category=${category.slug}`}>
                    <h3 className={`font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors ${
                      style === 'overlay' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                  </Link>

                  {/* Product Count */}
                  {showCount && category._count && (
                    <p className={`text-sm ${style === 'overlay' ? 'text-white/80' : 'text-gray-600'}`}>
                      {category._count.products} {category._count.products === 1 ? 'product' : 'products'}
                    </p>
                  )}

                  {/* Description for minimal style */}
                  {style === 'minimal' && category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-8">No categories available</p>
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
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}