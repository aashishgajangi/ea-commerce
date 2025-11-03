import { Metadata } from 'next';
import { getCategories } from '@/lib/categories';
import PublicLayout from '@/components/layout/PublicLayout';
import CategoriesClient from './CategoriesClient';
import { db } from '@/lib/db';
import { generateSEOData } from '@/lib/seo';
import ServerBlockRenderer from '@/components/blocks/ServerBlockRenderer';
import type { BlockInstance } from '@/lib/blocks/block-types';

export const dynamic = 'force-dynamic';

// Generate SEO metadata from the Categories system page
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch the Categories page from database for SEO control
    const categoriesPage = await db.page.findUnique({
      where: { slug: 'categories' },
      include: {
        featuredImage: true,
      },
    });

    if (!categoriesPage || categoriesPage.status !== 'published') {
      // Fallback to default metadata
      return {
        title: 'Shop by Category',
        description: 'Browse all product categories and find what you\'re looking for.',
      };
    }

    // Use localhost for development, or get from environment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Generate SEO data using the advanced SEO system
    const seoData = await generateSEOData(categoriesPage, siteUrl);

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
        url: `${siteUrl}/categories`,
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
    console.error('Error generating categories page metadata:', error);
    // Fallback to default metadata
    return {
      title: 'Shop by Category',
      description: 'Browse all product categories and find what you\'re looking for.',
    };
  }
}

export default async function CategoriesPage() {
  const { categories } = await getCategories({
    isActive: true,
    includeChildren: true,
    limit: 100,
    orderBy: 'order',
    order: 'asc'
  });

  // Fetch the Categories system page for blocks
  const categoriesPage = await db.page.findUnique({
    where: { slug: 'categories' },
  });

  // Parse blocks
  let blocks: BlockInstance[] = [];
  if (categoriesPage?.blocks) {
    try {
      blocks = JSON.parse(categoriesPage.blocks);
    } catch (error) {
      console.error('Error parsing categories page blocks:', error);
    }
  }

  return (
    <PublicLayout>
      {/* Render blocks before categories */}
      {blocks.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <ServerBlockRenderer blocks={blocks} />
        </div>
      )}
      
      <CategoriesClient categories={categories} />
    </PublicLayout>
  );
}
