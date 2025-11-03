import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getCategoryBreadcrumb } from '@/lib/categories';
import { getProducts } from '@/lib/products';
import { getGeneralSettings } from '@/lib/settings';
import PublicLayout from '@/components/layout/PublicLayout';
import CategoryClient from './CategoryClient';
import type { BlockInstance } from '@/lib/blocks/block-types';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const settings = await getGeneralSettings();

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  const title = category.metaTitle || `${category.name} - ${settings.siteName}`;
  const description = category.metaDescription || 
    category.description || 
    `Shop ${category.name} products at ${settings.siteName}. Find the best deals and quality products.`;

  return {
    title,
    description,
    keywords: category.metaKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/categories/${category.slug}`,
      images: category.image ? [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.name,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.twitterTitle || title,
      description: category.twitterDescription || description,
      images: category.image ? [category.image] : undefined,
    },
    alternates: {
      canonical: category.canonicalUrl || `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Get category by slug
  const category = await getCategoryBySlug(slug);
  
  if (!category || !category.isActive) {
    notFound();
  }

  // Get breadcrumb path
  const breadcrumb = await getCategoryBreadcrumb(category.id);

  // Get products in this category
  const { products, total } = await getProducts({
    categoryId: category.id,
    status: 'published',
    isActive: true,
    limit: 24,
    orderBy: 'createdAt',
    order: 'desc'
  });

  // Parse blocks
  let blocks: BlockInstance[] = [];
  if (category.blocks) {
    try {
      blocks = JSON.parse(category.blocks);
    } catch (error) {
      console.error('Error parsing category blocks:', error);
    }
  }

  return (
    <PublicLayout>
      <CategoryClient
        category={category}
        products={products}
        total={total}
        breadcrumb={breadcrumb}
        blocks={blocks}
      />
    </PublicLayout>
  );
}
