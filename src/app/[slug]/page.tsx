import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPageBySlug, getPublishedPages } from '@/lib/pages';
import { generateSEOData, generateStructuredData, generateBreadcrumbData } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import PublicLayout from '@/components/layout/PublicLayout';
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
  
  // Generate structured data
  const structuredData = generateStructuredData(page, siteUrl);
  const breadcrumbData = generateBreadcrumbData(page, siteUrl, siteName);

  return (
    <PublicLayout>
      {/* JSON-LD Structured Data */}
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Featured Image */}
        {page.featuredImage && (
          <div className="mb-8 relative w-full h-96">
            <Image
              src={page.featuredImage.path}
              alt={page.featuredImage.alt || page.title}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        )}

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          
          {page.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {page.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
            {page.publishedAt && (
              <time dateTime={page.publishedAt.toISOString()}>
                Published on {new Date(page.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            
            {page.author && (
              <span>by {page.author.name || page.author.email}</span>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-gray-700
            prose-img:rounded-lg prose-img:shadow-md
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Last Updated */}
        {page.updatedAt && page.updatedAt.toISOString() !== page.createdAt.toISOString() && (
          <footer className="mt-12 pt-6 border-t text-sm text-gray-500">
            Last updated on {new Date(page.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </footer>
        )}
      </article>
    </PublicLayout>
  );
}