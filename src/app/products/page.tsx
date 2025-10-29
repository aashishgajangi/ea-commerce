import { Suspense } from 'react';
import { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import ProductsClient from '@/components/products/ProductsClient';
import { getProducts } from '@/lib/products';
import { config, ConfigKeys } from '@/lib/config';
import { db } from '@/lib/db';
import { generateSEOData } from '@/lib/seo';
import ServerBlockRenderer from '@/components/blocks/ServerBlockRenderer';
import type { BlockInstance } from '@/lib/blocks/block-types';

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'; // Force dynamic rendering to avoid build-time errors

// Generate SEO metadata from the Products system page
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch the Products page from database for SEO control
    const productsPage = await db.page.findUnique({
      where: { slug: 'products' },
      include: {
        featuredImage: true,
      },
    });

    if (!productsPage || productsPage.status !== 'published') {
      // Fallback to default metadata
      return {
        title: 'Shop All Products',
        description: 'Browse our complete collection of products',
      };
    }

    // Use localhost for development, or get from environment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Generate SEO data using the advanced SEO system
    const seoData = await generateSEOData(productsPage, siteUrl);

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      robots: seoData.robots,
      alternates: {
        canonical: seoData.canonicalUrl,
      },
      openGraph: {
        title: seoData.ogTitle,
        description: seoData.ogDescription,
        url: `${siteUrl}/products`,
        images: seoData.ogImage ? [seoData.ogImage] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.twitterTitle,
        description: seoData.twitterDescription,
        images: seoData.twitterImage ? [seoData.twitterImage] : [],
      },
    };
  } catch (error) {
    console.error('Error generating products page metadata:', error);
    // Fallback to default metadata
    return {
      title: 'Shop All Products',
      description: 'Browse our complete collection of products',
    };
  }
}

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
  
  // Fetch products, currency, and page blocks in parallel on SERVER
  const [{ products }, currencyValue, productsPage] = await Promise.all([
    getProducts({
      status: 'published',
      isActive: true,
      categoryId: params.category || undefined,
      limit: 50,
    }),
    config.get(ConfigKeys.CURRENCY).catch(() => 'USD'),
    db.page.findUnique({
      where: { slug: 'products' },
      select: { blocks: true },
    }),
  ]);

  // Parse blocks if they exist
  let blocks: BlockInstance[] = [];
  if (productsPage?.blocks) {
    try {
      blocks = JSON.parse(productsPage.blocks);
    } catch (e) {
      console.error('Failed to parse products page blocks:', e);
    }
  }

  return (
    <>
      {/* Render blocks BEFORE products grid */}
      {blocks.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--theme-background, #ffffff)',
            color: 'var(--theme-text, #1a1a1a)',
          }}
        >
          <ServerBlockRenderer blocks={blocks} />
        </div>
      )}
      
      {/* Products grid */}
      <ProductsClient initialProducts={products} currency={currencyValue || 'USD'} />
    </>
  );
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