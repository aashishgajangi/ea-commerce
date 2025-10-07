import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Search } from 'lucide-react';
import { getProducts } from '@/lib/products';
import PublicLayout from '@/components/layout/PublicLayout';

async function ProductsContent({ searchParams }: { searchParams: Promise<{
  category?: string;
  search?: string;
  sort?: string;
}> }) {
  const { category, search, sort } = await searchParams;

  const { products } = await getProducts({
    status: 'published',
    isActive: true,
    categoryId: category,
    search,
    limit: 100,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAt: number | null) => {
    if (!compareAt || compareAt <= price) return null;
    return Math.round(((compareAt - price) / compareAt) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-gray-600">Browse our collection of products</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              defaultValue={search}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <select
          defaultValue={sort}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">Default Sorting</option>
          <option value="name">Name (A-Z)</option>
          <option value="-name">Name (Z-A)</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          <option value="-createdAt">Newest First</option>
        </select>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">
            {search ? 'Try adjusting your search' : 'Check back later for new products'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const primaryImage = product.images.find((img: any) => img.isPrimary) || product.images[0];
              const discount = calculateDiscount(product.price, product.compareAtPrice);

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100">
                      {primaryImage ? (
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                      {discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discount}%
                        </div>
                      )}
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                      {product.stockQuantity === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      {product.shortDescription && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      {product.category && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.category.name}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center text-gray-600">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
        </>
      )}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}) {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          </div>
        }
      >
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </PublicLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds