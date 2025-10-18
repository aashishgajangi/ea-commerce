'use client';

import { useState, useEffect } from 'react';
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

export default function ModernProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    fetchProducts();
    fetchCurrency();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch('/api/admin/settings/general');
      if (response.ok) {
        const data = await response.json();
        setCurrency(data.currency || 'USD');
      }
    } catch (error) {
      console.error('Failed to fetch currency:', error);
    }
  };

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

  const filteredProducts = products.filter(product =>
    searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--theme-background, #ffffff)' }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: 'var(--theme-primary, #0070f3)' }}
          ></div>
          <p className="mt-4" style={{ color: 'var(--theme-text, #1a1a1a)' }}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen"
      style={{
        backgroundColor: 'var(--theme-background, #ffffff)',
        color: 'var(--theme-text, #1a1a1a)',
      }}
    >
      {/* Hero Section */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Discover our curated collection of quality products
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                style={{ color: 'var(--theme-primary, #0070f3)' }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-current transition-colors"
                style={{
                  borderColor: searchTerm ? 'var(--theme-primary, #0070f3)' : '#e5e7eb',
                  borderRadius: 'var(--theme-radius, 0.375rem)',
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" style={{ color: 'var(--theme-text, #1a1a1a)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-current transition-colors"
              style={{
                borderColor: '#e5e7eb',
                borderRadius: 'var(--theme-radius, 0.375rem)',
                color: 'var(--theme-text, #1a1a1a)',
              }}
            >
              <option value="">Default Sorting</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-lg font-semibold"
            style={{ color: 'var(--theme-text, #1a1a1a)' }}
          >
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-20 w-20 mx-auto mb-4" style={{ color: 'var(--theme-primary, #0070f3)', opacity: 0.5 }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
              No products found
            </h3>
            <p style={{ color: 'var(--theme-text, #1a1a1a)', opacity: 0.7 }}>
              {searchTerm ? 'Try adjusting your search' : 'Check back later for new products'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => {
              const primaryImage = product.images.find((img: ProductImage) => img.isPrimary) || product.images[0];
              const discount = calculateDiscount(product.price, product.compareAtPrice);

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2"
                    style={{
                      borderColor: 'transparent',
                      borderRadius: 'var(--theme-radius, 0.375rem)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--theme-primary, #0070f3)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-100"
                      style={{ borderRadius: `var(--theme-radius, 0.375rem) var(--theme-radius, 0.375rem) 0 0` }}
                    >
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
                          <Package className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                      {discount && (
                        <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                          style={{
                            backgroundColor: 'var(--theme-accent, #ff6b35)',
                            borderRadius: 'var(--theme-radius, 0.375rem)',
                          }}
                        >
                          -{discount}%
                        </div>
                      )}
                      {product.isFeatured && (
                        <div className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                          style={{
                            backgroundColor: 'var(--theme-primary, #0070f3)',
                            borderRadius: 'var(--theme-radius, 0.375rem)',
                          }}
                        >
                          Featured
                        </div>
                      )}
                      {product.stockQuantity === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 transition-colors"
                        style={{ color: 'var(--theme-text, #1a1a1a)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--theme-primary, #0070f3)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--theme-text, #1a1a1a)'}
                      >
                        {product.name}
                      </h3>
                      {product.shortDescription && (
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--theme-text, #1a1a1a)', opacity: 0.7 }}>
                          {product.shortDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold" style={{ color: 'var(--theme-primary, #0070f3)' }}>
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      {product.category && (
                        <span className="text-xs font-medium px-3 py-1.5 inline-block"
                          style={{
                            color: 'var(--theme-primary, #0070f3)',
                            backgroundColor: 'var(--theme-background, #f3f4f6)',
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
        )}
      </div>
    </div>
  );
}
