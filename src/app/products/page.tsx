import { Suspense } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import ProductsClient from '@/components/products/ProductsClient';
import { getProducts } from '@/lib/products';
import { config, ConfigKeys } from '@/lib/config';

export const revalidate = 60; // Revalidate every 60 seconds

// Skeleton component for loading state
function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Server component - fetches data on server
async function ProductsContent({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  
  // Fetch products and currency in parallel on SERVER
  const [{ products }, currencyValue] = await Promise.all([
    getProducts({
      status: 'published',
      isActive: true,
      categoryId: params.category || undefined,
      limit: 50,
    }),
    config.get(ConfigKeys.CURRENCY).catch(() => 'USD'),
  ]);

  // Pass data to client component
  return <ProductsClient initialProducts={products} currency={currencyValue || 'USD'} />;
}

export default function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  return (
    <PublicLayout>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </PublicLayout>
  );
}