import { NextRequest, NextResponse } from 'next/server';

// Mark this route as dynamic since it uses query parameters
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const size = parseInt(request.nextUrl.searchParams.get('size') || '192');
    
    // Create a simple SVG icon as a placeholder
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#10b981" rx="${size/8}"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-family="Arial, sans-serif" font-size="${size/4}" fill="white" font-weight="bold">
          ${size === 192 ? 'S' : 'Store'}
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Failed to generate icon:', error);
    
    // Return a simple error response
    return new NextResponse('Icon generation failed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
