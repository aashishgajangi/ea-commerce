import { Suspense } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import SearchResults from '@/components/search/SearchResults';

export const metadata = {
  title: 'Search Products',
  description: 'Search for products in our store',
};

export default function SearchPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<SearchLoadingFallback />}>
        <SearchResults />
      </Suspense>
    </PublicLayout>
  );
}

function SearchLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--theme-background, #ffffff)' }}
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: 'var(--theme-primary, #0070f3)' }}
        ></div>
        <p className="mt-4" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
          Searching...
        </p>
      </div>
    </div>
  );
}
