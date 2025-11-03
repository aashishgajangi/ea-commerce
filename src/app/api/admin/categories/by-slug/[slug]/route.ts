import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/categories';
import { auth } from '@/auth';

/**
 * GET /api/admin/categories/by-slug/[slug] - Get category by slug (admin)
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
    const decodedSlug = decodeURIComponent(slug);

    // Find category by slug
    const category = await getCategoryBySlug(decodedSlug);

    if (!category) {
      return NextResponse.json({ 
        error: 'Category not found',
        slug: decodedSlug,
        message: `No category exists with slug "${decodedSlug}". It may have been deleted or the slug was changed.`
      }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
