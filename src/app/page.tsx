import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/pages';
import { generateSEOData, generateStructuredData, generateBreadcrumbData } from '@/lib/seo';
import { getHomepageSettings } from '@/lib/settings';
import StructuredData from '@/components/seo/StructuredData';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedProductsSection from '@/components/homepage/FeaturedProductsSection';
import CategoriesShowcaseSection from '@/components/homepage/CategoriesShowcaseSection';
import NewsletterSection from '@/components/homepage/NewsletterSection';
import type { Metadata } from 'next';

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('');

  if (!page || page.status !== 'published') {
    return {
      title: 'Welcome',
      description: 'E-Commerce Platform',
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

export default async function Home() {
  // Get homepage settings
  const homepageSettings = await getHomepageSettings();

  // Check if using sections layout
  if (homepageSettings.layout === 'sections') {
    return (
      <PublicLayout>
        <HeroSection settings={homepageSettings} />
        <FeaturedProductsSection settings={homepageSettings} />
        <CategoriesShowcaseSection settings={homepageSettings} />
        <NewsletterSection settings={homepageSettings} />
      </PublicLayout>
    );
  }

  // Fallback to simple page layout
  const page = await getPageBySlug('');

  // If homepage exists and is published, render it
  if (page && page.status === 'published') {
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
                unoptimized={true}
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

  // Default homepage if no page with empty slug exists
  return (
    <PublicLayout>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by creating a homepage
          </li>
          <li className="tracking-[-.01em]">
            Go to <Link href="/admin/pages/new" className="text-blue-600 hover:underline">Admin → Pages → New Page</Link>
          </li>
          <li className="tracking-[-.01em]">
            Set the URL slug to empty (leave it blank or just &quot;/&quot;)
          </li>
          <li className="tracking-[-.01em]">
            Publish the page to see it here
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/admin"
          >
            Go to Admin Panel
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/admin/pages/new"
          >
            Create Homepage
          </Link>
        </div>
      </main>
      </div>
    </PublicLayout>
  );
}
