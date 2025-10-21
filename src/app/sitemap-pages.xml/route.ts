import { NextResponse } from 'next/server';
import { getPublishedPages } from '@/lib/pages';
import { getSetting } from '@/lib/settings';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get site URL from settings
    const generalSettings = await getSetting<Record<string, string>>('general', {});
    const siteUrl = generalSettings?.siteUrl || process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Fetch all published pages
    const pages = await getPublishedPages();
    
    const now = new Date().toISOString();

    // Generate pages sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${now}</lastmod>
  </url>

  ${pages
    .map((page) => {
      // Skip homepage (already included)
      if (page.isHomepage) return '';
      
      const lastmod = page.updatedAt?.toISOString() || page.createdAt?.toISOString() || now;
      
      // Set priority based on page type
      let priority = '0.7';
      if (page.slug === 'about' || page.slug === 'contact') priority = '0.9';
      if (page.isEssential) priority = '0.8';
      
      // Set changefreq based on page type
      let changefreq = 'weekly';
      if (page.pageType === 'legal' || page.pageType === 'policy') changefreq = 'monthly';
      
      return `
  <url>
    <loc>${siteUrl}/${page.slug}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .filter(Boolean)
    .join('')}

</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to generate pages sitemap:', error);
    
    // Return minimal sitemap on error
    const fallbackUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${fallbackUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallback, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}
