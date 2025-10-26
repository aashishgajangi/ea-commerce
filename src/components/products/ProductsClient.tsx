'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Search, Filter } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  isPrimary: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  stockQuantity: number;
  isFeatured: boolean;
  category?: { id: string; name: string } | null;
  images: ProductImage[];
  shortDescription?: string | null;
}

interface ProductsClientProps {
  initialProducts: Product[];
  currency: string;
}

export default function ProductsClient({ initialProducts, currency }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

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

  // Client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    let products = initialProducts.filter(product =>
      searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );

    // Sort products
    if (sortBy === 'price-asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [initialProducts, searchTerm, sortBy]);

  return (
    <div className="min-h-screen"
      style={{
        backgroundColor: 'var(--theme-background, #ffffff)',
        color: 'var(--theme-text, #1a1a1a)',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: 'var(--theme-text, #1a1a1a)' }}
          >
            All Products
          </h1>
          <p className="text-lg opacity-80">
            Discover our complete collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--theme-background, #ffffff)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                color: 'var(--theme-text, #1a1a1a)',
              }}
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 opacity-60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--theme-background, #ffffff)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                color: 'var(--theme-text, #1a1a1a)',
              }}
            >
              <option value="">Sort by</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent className="pt-6">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Check back soon for new products'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-4 text-sm opacity-60">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
                const discount = calculateDiscount(product.price, product.compareAtPrice);

                return (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                      <CardContent className="p-4">
                        {/* Image */}
                        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                        >
                          {primaryImage ? (
                            <Image
                              src={primaryImage.url}
                              alt={primaryImage.alt || product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              loading="lazy"
                              quality={85}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-16 h-16 opacity-20" />
                            </div>
                          )}
                          
                          {/* Discount Badge */}
                          {discount && (
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: 'var(--theme-primary, #0070f3)',
                                color: '#ffffff',
                              }}
                            >
                              {discount}% OFF
                            </div>
                          )}

                          {/* Stock Badge */}
                          {product.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          {/* Category */}
                          {product.category && (
                            <div className="text-xs opacity-60">
                              {product.category.name}
                            </div>
                          )}

                          {/* Name */}
                          <h3 className="font-semibold line-clamp-2 group-hover:underline"
                            style={{ color: 'var(--theme-text, #1a1a1a)' }}
                          >
                            {product.name}
                          </h3>

                          {/* Description */}
                          {product.shortDescription && (
                            <p className="text-sm opacity-60 line-clamp-2">
                              {product.shortDescription}
                            </p>
                          )}

                          {/* Price */}
                          <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-xl font-bold"
                              style={{ color: 'var(--theme-primary, #0070f3)' }}
                            >
                              {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                              <span className="text-sm line-through opacity-50">
                                {formatPrice(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
