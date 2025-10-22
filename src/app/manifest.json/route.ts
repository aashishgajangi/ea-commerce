import { NextResponse } from 'next/server';
import { getPWASettings } from '@/lib/settings';
import { db } from '@/lib/db';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getPWASettings();
    
    // Get site URL
    const siteUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Get icon URLs from media library or use fallback SVG icons
    let icon512Url = `${siteUrl}/icon-512.svg`; // Default to SVG fallback
    let icon192Url = `${siteUrl}/icon-192.svg`; // Default to SVG fallback

    // Override with custom icons if set
    if (settings.iconId) {
      const icon512 = await db.media.findUnique({
        where: { id: settings.iconId },
        select: { path: true },
      });
      if (icon512) {
        icon512Url = `${siteUrl}${icon512.path}`;
      }
    }

    if (settings.icon192Id) {
      const icon192 = await db.media.findUnique({
        where: { id: settings.icon192Id },
        select: { path: true },
      });
      if (icon192) {
        icon192Url = `${siteUrl}${icon192.path}`;
      }
    }

    const manifest = {
      name: settings.appName,
      short_name: settings.shortName,
      description: settings.description,
      start_url: '/',
      display: settings.displayMode,
      orientation: settings.orientation,
      theme_color: settings.themeColor,
      background_color: settings.backgroundColor,
      icons: [
        {
          src: icon192Url,
          sizes: '192x192',
          type: icon192Url.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
          purpose: 'any maskable',
        },
        {
          src: icon512Url,
          sizes: '512x512',
          type: icon512Url.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
          purpose: 'any maskable',
        },
      ],
      screenshots: [],
      categories: ['shopping', 'business'],
      prefer_related_applications: false,
    };

    return new NextResponse(JSON.stringify(manifest, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Failed to generate manifest:', error);
    
    // Return basic fallback manifest
    const fallbackUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fallback = {
      name: 'My Store',
      short_name: 'Store',
      start_url: '/',
      display: 'standalone',
      theme_color: '#10b981',
      background_color: '#ffffff',
      icons: [
        {
          src: `${fallbackUrl}/icon-192.svg`,
          sizes: '192x192',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
        {
          src: `${fallbackUrl}/icon-512.svg`,
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    };

    return new NextResponse(JSON.stringify(fallback, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });
  }
}
