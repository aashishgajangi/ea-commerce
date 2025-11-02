import { NextRequest, NextResponse } from 'next/server';
import { getPage, updatePage, deletePage } from '@/lib/pages';
import { z } from 'zod';

// Validation schema for updating a page
const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
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
  ogImageId: z.string().optional().nullable(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImageId: z.string().optional().nullable(),
  featuredImageId: z.string().optional().nullable(),
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

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/pages/[id] - Get a single page
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const page = await getPage(id);

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/pages/[id] - Update a page
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = updatePageSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', JSON.stringify(validationResult.error.issues, null, 2));
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.issues,
          message: validationResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Convert null values to undefined for compatibility
    const updateData = {
      ...data,
      ogImageId: data.ogImageId === null ? undefined : data.ogImageId,
      twitterImageId: data.twitterImageId === null ? undefined : data.twitterImageId,
      featuredImageId: data.featuredImageId === null ? undefined : data.featuredImageId,
    };

    // Get old page data before update (for slug comparison)
    const oldPage = await getPage(id);
    const oldSlug = oldPage?.slug;
    
    // Update the page
    const page = await updatePage(id, updateData);

    // Revalidate the page path for immediate updates
    try {
      const { revalidatePath } = await import('next/cache');
      
      // Revalidate the specific page
      if (page.slug) {
        revalidatePath(`/${page.slug}`);
        // Revalidate admin edit route with new slug
        revalidatePath(`/admin/pages/${page.slug}/edit`);
      }
      
      // If slug changed, revalidate old admin route too
      if (oldSlug && oldSlug !== page.slug) {
        revalidatePath(`/admin/pages/${oldSlug}/edit`);
      }
      
      // If it's the homepage, revalidate root path
      if (page.isHomepage || page.slug === '' || page.pageType === 'homepage') {
        revalidatePath('/');
        revalidatePath('/admin/pages/home/edit');
      }
    } catch (revalidateError) {
      console.error('Error revalidating path:', revalidateError);
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/pages/[id] - Delete a page
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Check if page exists
    const page = await getPage(id);
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Delete the page
    await deletePage(id);

    // Revalidate the page path
    try {
      const { revalidatePath } = await import('next/cache');
      
      if (page.slug) {
        revalidatePath(`/${page.slug}`);
      }
      
      if (page.isHomepage || page.slug === '' || page.pageType === 'homepage') {
        revalidatePath('/');
      }
    } catch (revalidateError) {
      console.error('Error revalidating path:', revalidateError);
    }

    return NextResponse.json(
      { message: 'Page deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}