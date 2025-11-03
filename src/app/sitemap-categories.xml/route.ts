import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSetting } from '@/lib/settings';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get site URL from settings
    const generalSettings = await getSetting<Record<string, string>>('general', {});
    const siteUrl = generalSettings?.siteUrl || process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Fetch all active categories
    const categories = await db.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
        image: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
    
    const now = new Date().toISOString();

    // Generate categories sitemap with images
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

  ${categories
    .map((category) => {
      const lastmod = category.updatedAt?.toISOString() || category.createdAt?.toISOString() || now;
      
      // Higher priority for categories with more products
      let priority = '0.7';
      if (category._count.products > 20) priority = '0.9';
      else if (category._count.products > 10) priority = '0.8';
      
      // Image tag if available (convert relative URLs to absolute)
      let imageTag = '';
      if (category.image) {
        const imageUrl = category.image.startsWith('http') 
          ? category.image 
          : `${siteUrl}${category.image.startsWith('/') ? '' : '/'}${category.image}`;
        
        imageTag = `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>`;
      }
      
      return `
  <url>
    <loc>${siteUrl}/categories/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>${imageTag}
  </url>`;
    })
    .join('')}

</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to generate categories sitemap:', error);
    
    // Return empty sitemap on error
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(fallback, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}
