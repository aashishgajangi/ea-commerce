import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { db } from '@/lib/db';
import { getGeneralSettings } from '@/lib/settings';
import PublicLayout from '@/components/layout/PublicLayout';
import ProductClient from '@/app/products/[slug]/ProductClient';

interface ProductPageProps {
  params: Promise<{
    slug: string; // category slug
    productSlug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug: categorySlug, productSlug } = await params;

  const product = await db.product.findFirst({
    where: {
      slug: productSlug,
      isActive: true,
      status: 'published',
      category: {
        slug: categorySlug,
        isActive: true,
      },
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: { order: 'asc' },
        select: {
          url: true,
          alt: true,
          isPrimary: true,
        },
      },
    },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.metaTitle || `${product.name} | ${product.category?.name || 'Products'}`;
  const description = product.metaDescription || product.shortDescription || product.description?.substring(0, 160) || '';
  const productImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url;

  return {
    title,
    description,
    keywords: product.metaKeywords || undefined,
    openGraph: {
      title: product.ogTitle || title,
      description: product.ogDescription || description,
      images: productImage ? [{ url: productImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.twitterTitle || title,
      description: product.twitterDescription || description,
      images: productImage ? [productImage] : [],
    },
    robots: product.robots || 'index,follow',
    alternates: {
      canonical: product.canonicalUrl || `/categories/${categorySlug}/${productSlug}`,
    },
  };
}

export default async function CategoryProductPage({ params }: ProductPageProps) {
  const { slug: categorySlug, productSlug } = await params;

  // Fetch the product with category validation
  const product = await db.product.findFirst({
    where: {
      slug: productSlug,
      isActive: true,
      status: 'published',
      category: {
        slug: categorySlug,
        isActive: true,
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: { order: 'asc' },
      },
      variants: {
        where: { isActive: true },
        orderBy: { name: 'asc' },
      },
    },
  });

  if (!product) {
    // Check if product exists but in different category
    const productInDifferentCategory = await db.product.findUnique({
      where: {
        slug: productSlug,
        isActive: true,
        status: 'published',
      },
      include: {
        category: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (productInDifferentCategory && productInDifferentCategory.category) {
      // Redirect to correct category
      redirect(`/categories/${productInDifferentCategory.category.slug}/${productSlug}`);
    }

    // Product doesn't exist at all
    notFound();
  }

  // If product has no category but somehow accessed via category URL, redirect to /products/[slug]
  if (!product.category) {
    redirect(`/products/${productSlug}`);
  }

  // Fetch currency settings
  const generalSettings = await getGeneralSettings();

  // Render the product page using existing ProductClient component
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
        <ProductClient 
          product={product} 
          initialCurrency={generalSettings.currency || 'INR'} 
        />
      </Suspense>
    </PublicLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds
