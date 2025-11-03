import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { getGeneralSettings } from '@/lib/settings';
import PublicLayout from '@/components/layout/PublicLayout';
import { Metadata } from 'next';
import ProductClient from './ProductClient';
import { db } from '@/lib/db';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription || product.description?.substring(0, 160),
    keywords: product.metaKeywords,
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || '',
      images: primaryImage ? [primaryImage.url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || '',
      images: primaryImage ? [primaryImage.url] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if product has a category - redirect to new URL structure
  const productWithCategory = await db.product.findUnique({
    where: {
      slug,
      isActive: true,
      status: 'published',
    },
    select: {
      category: {
        select: {
          slug: true,
        },
      },
    },
  });

  // If product has a category, redirect to new category-based URL
  if (productWithCategory?.category?.slug) {
    redirect(`/categories/${productWithCategory.category.slug}/${slug}`);
  }

  // Otherwise, continue with old URL (for products without categories)
  const [product, generalSettings] = await Promise.all([
    getProductBySlug(slug),
    getGeneralSettings(),
  ]);

  if (!product || product.status !== 'published' || !product.isActive) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* JSON-LD Structured Data */}
      {product.schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(product.schemaData),
          }}
        />
      )}
      
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading product...</p>
            </div>
          </div>
        }
      >
        <ProductClient 
          product={product} 
          initialCurrency={generalSettings.currency || 'INR'} 
        />
      </Suspense>
    </PublicLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds