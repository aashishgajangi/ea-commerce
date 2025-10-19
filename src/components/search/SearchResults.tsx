'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

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
  category?: { id: string; name: string; slug: string } | null;
  images: ProductImage[];
  shortDescription?: string | null;
}

interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortFilter = searchParams.get('sort') || 'relevance';
  const pageParam = parseInt(searchParams.get('page') || '1');

  const [results, setResults] = useState<SearchResult>({
    products: [],
    total: 0,
    page: 1,
    totalPages: 0,
    query: '',
  });
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [localQuery, setLocalQuery] = useState(query);
  const [localSort, setLocalSort] = useState(sortFilter);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          ...(categoryFilter && { category: categoryFilter }),
          ...(sortFilter && sortFilter !== 'relevance' && { sort: sortFilter }),
          page: pageParam.toString(),
        });

        const response = await fetch(`/api/search?${params}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Search error:', error);
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

    if (query) {
      performSearch();
    } else {
      setLoading(false);
    }
    fetchCurrency();
  }, [query, categoryFilter, sortFilter, pageParam]);


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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (localQuery) params.set('q', localQuery);
    if (localSort && localSort !== 'relevance') params.set('sort', localSort);
    
    window.location.href = `/search?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    window.location.href = `/search?${params.toString()}`;
  };

  if (!query) {
    return (
      <div className="min-h-screen"
        style={{
          backgroundColor: 'var(--theme-background, #ffffff)',
          color: 'var(--theme-text, #1a1a1a)',
        }}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <Search className="h-20 w-20 mx-auto mb-4" 
            style={{ color: 'var(--theme-primary, #0070f3)', opacity: 0.5 }} 
          />
          <h1 className="text-3xl font-bold mb-4">Search Products</h1>
          <p className="text-lg mb-8" style={{ opacity: 0.7 }}>
            Enter a search term to find products
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                style={{ color: 'var(--theme-primary, #0070f3)' }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:outline-none focus:border-current transition-colors text-lg"
                style={{
                  borderColor: 'var(--theme-primary, #0070f3)',
                  borderRadius: 'var(--theme-radius, 0.375rem)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--theme-background, #ffffff)' }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: 'var(--theme-primary, #0070f3)' }}
          ></div>
          <p className="mt-4" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
            Searching for &quot;{query}&quot;...
          </p>
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
      {/* Header */}
      <section
        className="py-12 text-white"
        style={{
          background: `linear-gradient(135deg, var(--theme-primary, #0070f3) 0%, var(--theme-secondary, #6c757d) 100%)`
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Search Results
          </h1>
          <p className="text-lg opacity-90">
            {results.total} {results.total === 1 ? 'result' : 'results'} for &quot;{query}&quot;
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                style={{ color: 'var(--theme-primary, #0070f3)' }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-current transition-colors"
                style={{
                  borderColor: 'var(--theme-primary, #0070f3)',
                  borderRadius: 'var(--theme-radius, 0.375rem)',
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" style={{ color: 'var(--theme-text, #1a1a1a)' }} />
            <select
              value={localSort}
              onChange={(e) => {
                setLocalSort(e.target.value);
                const params = new URLSearchParams(searchParams.toString());
                params.set('sort', e.target.value);
                window.location.href = `/search?${params.toString()}`;
              }}
              className="px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-current transition-colors"
              style={{
                borderColor: '#e5e7eb',
                borderRadius: 'var(--theme-radius, 0.375rem)',
                color: 'var(--theme-text, #1a1a1a)',
              }}
            >
              <option value="relevance">Most Relevant</option>
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low to High)</option>
              <option value="date">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {results.products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-20 w-20 mx-auto mb-4" 
              style={{ color: 'var(--theme-primary, #0070f3)', opacity: 0.5 }} 
            />
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p style={{ opacity: 0.7 }}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {results.products.map((product: Product) => {
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
                        {product.stockQuantity === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 transition-colors"
                          style={{ color: 'var(--theme-text, #1a1a1a)' }}
                        >
                          {product.name}
                        </h3>
                        {product.shortDescription && (
                          <p className="text-sm mb-3 line-clamp-2" style={{ opacity: 0.7 }}>
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

            {/* Pagination */}
            {results.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(results.page - 1)}
                  disabled={results.page === 1}
                  className="px-4 py-2 border-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-current transition-colors"
                  style={{
                    borderColor: results.page === 1 ? '#e5e7eb' : 'var(--theme-primary, #0070f3)',
                    color: 'var(--theme-text, #1a1a1a)',
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, results.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className="px-4 py-2 border-2 rounded-lg transition-colors font-medium"
                        style={{
                          borderColor: pageNum === results.page ? 'var(--theme-primary, #0070f3)' : '#e5e7eb',
                          backgroundColor: pageNum === results.page ? 'var(--theme-primary, #0070f3)' : 'transparent',
                          color: pageNum === results.page ? '#ffffff' : 'var(--theme-text, #1a1a1a)',
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(results.page + 1)}
                  disabled={results.page === results.totalPages}
                  className="px-4 py-2 border-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-current transition-colors"
                  style={{
                    borderColor: results.page === results.totalPages ? '#e5e7eb' : 'var(--theme-primary, #0070f3)',
                    color: 'var(--theme-text, #1a1a1a)',
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
