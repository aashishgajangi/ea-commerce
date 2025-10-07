import { NextResponse } from 'next/server';
import { getPublishedPages } from '@/lib/pages';

// Force dynamic rendering - don't try to pre-render during build
export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Fetch all published pages
  let pages: Awaited<ReturnType<typeof getPublishedPages>> = [];
  try {
    pages = await getPublishedPages();
  } catch (error) {
    console.error('Failed to fetch pages for sitemap:', error);
  }

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>

  ${pages
    .map((page) => {
      const lastmod = page.updatedAt.toISOString();
      const priority = page.slug === 'about' || page.slug === 'contact' ? '0.8' : '0.7';
      
      return `
  <url>
    <loc>${siteUrl}/${page.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join('')}

</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}