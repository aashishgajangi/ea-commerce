import { NextResponse } from 'next/server';
import { getSetting } from '@/lib/settings';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get site URL from settings
    const generalSettings = await getSetting<Record<string, string>>('general', {});
    const siteUrl = generalSettings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const robots = `# Robots.txt for ${siteUrl}
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /admin
Disallow: /setup/
Disallow: /setup
Disallow: /api/
Disallow: /api

# Disallow auth pages
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /verify-email

# Disallow cart and checkout (not for SEO)
Disallow: /cart

# Allow all other pages
Allow: /products/
Allow: /about
Allow: /contact

# Crawl delay (optional, be nice to the server)
Crawl-delay: 1

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-pages.xml
Sitemap: ${siteUrl}/sitemap-products.xml
Sitemap: ${siteUrl}/sitemap-categories.xml
`;

    return new NextResponse(robots, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Failed to generate robots.txt:', error);
    
    // Return basic robots.txt on error
    const fallbackUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fallback = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: ${fallbackUrl}/sitemap.xml
`;

    return new NextResponse(fallback, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}