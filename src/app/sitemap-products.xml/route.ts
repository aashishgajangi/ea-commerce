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
    
    // Fetch all active published products with category info
    const products = await db.product.findMany({
      where: {
        status: 'published',
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
        isFeatured: true,
        category: {
          select: {
            slug: true,
          },
        },
        images: {
          select: {
            url: true,
            alt: true,
          },
          orderBy: {
            order: 'asc',
          },
          take: 5, // Max 5 images per product for sitemap
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    const now = new Date().toISOString();

    // Generate products sitemap with images
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  
  <!-- Products Page -->
  <url>
    <loc>${siteUrl}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${now}</lastmod>
  </url>

  ${products
    .map((product) => {
      const lastmod = product.updatedAt?.toISOString() || product.createdAt?.toISOString() || now;
      const priority = product.isFeatured ? '0.8' : '0.7';
      
      // Generate product URL - use category-nested format if category exists
      const productUrl = product.category?.slug 
        ? `${siteUrl}/categories/${product.category.slug}/${product.slug}`
        : `${siteUrl}/products/${product.slug}`;
      
      // Generate image tags
      const imageTags = product.images
        .map((img) => {
          if (!img.url) return '';
          
          // Convert relative URLs to absolute URLs
          const imageUrl = img.url.startsWith('http') 
            ? img.url 
            : `${siteUrl}${img.url.startsWith('/') ? '' : '/'}${img.url}`;
          
          return `
    <image:image>
      <image:loc>${imageUrl}</image:loc>${img.alt ? `
      <image:title>${escapeXml(img.alt)}</image:title>` : ''}
    </image:image>`;
        })
        .filter(Boolean)
        .join('');
      
      return `
  <url>
    <loc>${productUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>${imageTags}
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
    console.error('Failed to generate products sitemap:', error);
    
    // Return minimal sitemap on error
    const fallbackUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${fallbackUrl}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
