import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import PublicLayout from '@/components/layout/PublicLayout';
import { Metadata } from 'next';
import ProductClient from './ProductClient';

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
  const product = await getProductBySlug(slug);

  if (!product || product.status !== 'published' || !product.isActive) {
    notFound();
  }

  return (
    <PublicLayout>
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
        <ProductClient product={product} />
      </Suspense>
    </PublicLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds