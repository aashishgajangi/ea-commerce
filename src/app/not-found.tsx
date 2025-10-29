import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/components/layout/PublicLayout';
import ModernPageContent from '@/components/pages/ModernPageContent';
import StructuredData from '@/components/seo/StructuredData';
import { getPageBySlug } from '@/lib/pages';
import { generateSEOData, generateStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

// Generate metadata for 404 page
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('404');
  
  if (page) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || '';
    const seoData = await generateSEOData(page, siteUrl);

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.ogTitle,
        description: seoData.ogDescription,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.twitterTitle,
        description: seoData.twitterDescription,
      },
    };
  }

  return {
    title: '404 - Page Not Found',
    description: 'Sorry, the page you are looking for could not be found.',
  };
}

export default async function NotFound() {
  const page = await getPageBySlug('404');
  
  // If custom 404 page exists in database, render it
  if (page && page.status === 'published') {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || '';
    
    const structuredData = generateStructuredData(page, siteUrl);

    return (
      <PublicLayout>
        {structuredData && <StructuredData data={structuredData} />}
        <ModernPageContent page={page} />
      </PublicLayout>
    );
  }

  // Fallback 404 page if no custom page exists
  return (
    <PublicLayout>
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8 text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                Go to Homepage
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">
                Homepage
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/products" className="text-blue-600 hover:text-blue-700 hover:underline">
                All Products
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/about-us" className="text-blue-600 hover:text-blue-700 hover:underline">
                About Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact-us" className="text-blue-600 hover:text-blue-700 hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
