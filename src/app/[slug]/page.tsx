import { notFound } from 'next/navigation';
import { getPageBySlug, getPublishedPages } from '@/lib/pages';
import { generateSEOData, generateStructuredData, generateBreadcrumbData } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import PublicLayout from '@/components/layout/PublicLayout';
import ModernPageContent from '@/components/pages/ModernPageContent';
import type { Metadata } from 'next';

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all published pages
export async function generateStaticParams() {
  try {
    const pages = await getPublishedPages();
    
    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    // Return empty array if database is not available (e.g., during CI builds)
    console.warn('Could not generate static params, database may not be available:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.status !== 'published') {
    return {
      title: 'Page Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const seoData = generateSEOData(page, siteUrl);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      type: 'website',
      url: seoData.canonicalUrl,
      images: seoData.ogImage ? [{ url: seoData.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: seoData.twitterImage ? [seoData.twitterImage] : [],
    },
    alternates: {
      canonical: seoData.canonicalUrl,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  // Return 404 if page not found or not published
  if (!page || page.status !== 'published') {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'My Store';
  
  // Generate structured data for SEO
  const structuredData = generateStructuredData(page, siteUrl);
  const breadcrumbData = generateBreadcrumbData(page, siteUrl, siteName);

  return (
    <PublicLayout>
      {/* JSON-LD Structured Data for SEO */}
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />

      {/* Modern Page Content with Theme Colors */}
      <ModernPageContent page={page} />
    </PublicLayout>
  );
}