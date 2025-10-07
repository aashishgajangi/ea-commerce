import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const robots = `# Robots.txt for ${siteUrl}
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /setup
Disallow: /api

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}