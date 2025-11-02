import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

/**
 * GET /api/admin/pages/by-slug/[slug] - Get a page by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    
    // Handle homepage case
    const isHomepage = slug === 'home';
    const decodedSlug = isHomepage ? '' : decodeURIComponent(slug);

    // Find page by slug
    const page = await db.page.findUnique({
      where: { slug: decodedSlug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!page) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Page not found with slug: "${decodedSlug}"`);
      }
      return NextResponse.json({ 
        error: 'Page not found',
        slug: decodedSlug,
        message: `No page exists with slug "${decodedSlug}". It may have been deleted or the slug was changed.`
      }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching page by slug:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}
