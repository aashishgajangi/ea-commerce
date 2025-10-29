import { NextRequest, NextResponse } from 'next/server';
import { getPages, createPage, generateUniqueSlug } from '@/lib/pages';
import { z } from 'zod';

// Validation schema for creating a page
const createPageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  content: z.string().optional(), // Optional - using blocks instead
  excerpt: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  // Template system
  pageType: z.string().optional(),
  template: z.string().optional(),
  isEssential: z.boolean().optional(),
  // Homepage data - fields are optional when sections are disabled
  homepageData: z.object({
    showHero: z.boolean(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroImageId: z.string().nullable().optional(),
    heroButtonText: z.string().optional(),
    heroButtonUrl: z.string().optional(),
    showFeaturedProducts: z.boolean(),
    featuredProductsTitle: z.string().optional(),
    featuredProductsCount: z.number().optional(),
    featuredProductsColumnsMobile: z.number().optional(),
    featuredProductsColumnsDesktop: z.number().optional(),
    showCategories: z.boolean(),
    categoriesTitle: z.string().optional(),
    categoriesCount: z.number().optional(),
    showNewsletter: z.boolean(),
    newsletterTitle: z.string().optional(),
    newsletterSubtitle: z.string().optional(),
  }).optional(),
  // SEO fields
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  canonicalUrl: z.string().optional().transform(val => val === '' ? undefined : val),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImageId: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImageId: z.string().optional(),
  featuredImageId: z.string().optional(),
  authorId: z.string().optional(),
  // Phase 3: New SEO fields
  focusKeyphrase: z.string().optional(),
  focusKeyphrases: z.union([
    z.array(z.string()),
    z.string().transform(val => {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    })
  ]).optional(),
  robots: z.string().optional(),
  schemaType: z.string().optional(),
  schemaData: z.union([
    z.record(z.any()),
    z.string().transform(val => {
      try {
        return JSON.parse(val);
      } catch {
        return undefined;
      }
    })
  ]).optional(),
  // Phase 4: Block data
  blocks: z.array(z.any()).optional(),
});

/**
 * GET /api/admin/pages - List all pages
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const status = (searchParams.get('status') || 'all') as 'draft' | 'published' | 'all';
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const orderBy = (searchParams.get('orderBy') || 'createdAt') as 'createdAt' | 'updatedAt' | 'title' | 'publishedAt';
    const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc';

    const result = await getPages({
      status,
      search,
      limit,
      offset,
      orderBy,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/pages - Create a new page
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = createPageSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate slug if not provided
    // Note: Allow empty string for homepage (slug === '')
    const slug = data.slug !== undefined ? data.slug : await generateUniqueSlug(data.title);

    // Create the page
    const page = await createPage({
      ...data,
      slug,
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}