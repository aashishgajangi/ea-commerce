import { db } from './db';
import type { Page, Prisma } from '@prisma/client';

export interface PageQueryOptions {
  status?: 'draft' | 'published' | 'all';
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'publishedAt';
  order?: 'asc' | 'desc';
}

export interface HomepageData {
  showHero: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroImageId: string | null;
  heroButtonText: string;
  heroButtonUrl: string;
  showFeaturedProducts: boolean;
  featuredProductsTitle: string;
  featuredProductsCount: number;
  featuredProductsColumnsMobile: number;
  featuredProductsColumnsDesktop: number;
  showCategories: boolean;
  categoriesTitle: string;
  categoriesCount: number;
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface CreatePageInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status?: 'draft' | 'published';
  // Template system
  pageType?: string;
  template?: string;
  isEssential?: boolean;
  // Homepage sections
  homepageData?: HomepageData;
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageId?: string;
  featuredImageId?: string;
  authorId?: string;
}

export interface UpdatePageInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  status?: 'draft' | 'published';
  // Template system
  pageType?: string;
  template?: string;
  isEssential?: boolean;
  // Homepage sections
  homepageData?: HomepageData;
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageId?: string;
  featuredImageId?: string;
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  if (!title || title.trim() === '' || title === '/') {
    return ''; // Empty slug for homepage
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Check if a slug already exists
 */
export async function isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await db.page.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!existing) return true;
  if (excludeId && existing.id === excludeId) return true;

  return false;
}

/**
 * Generate a unique slug by appending numbers if necessary
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  let slug = generateSlug(title);
  let counter = 1;
  let isAvailable = await isSlugAvailable(slug, excludeId);

  while (!isAvailable) {
    slug = `${generateSlug(title)}-${counter}`;
    isAvailable = await isSlugAvailable(slug, excludeId);
    counter++;
  }

  return slug;
}

/**
 * Get all pages with optional filtering
 */
export async function getPages(options: PageQueryOptions = {}) {
  const {
    status = 'all',
    search = '',
    limit = 20,
    offset = 0,
    orderBy = 'createdAt',
    order = 'desc',
  } = options;

  const where: Prisma.PageWhereInput = {};

  // Filter by status
  if (status !== 'all') {
    where.status = status;
  }

  // Search by title or slug
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [pages, total] = await Promise.all([
    db.page.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        featuredImage: {
          select: {
            id: true,
            path: true,
            alt: true,
          },
        },
      },
      orderBy: { [orderBy]: order },
      take: limit,
      skip: offset,
    }),
    db.page.count({ where }),
  ]);

  return {
    pages,
    total,
    limit,
    offset,
    hasMore: offset + pages.length < total,
  };
}

/**
 * Get a single page by ID
 */
export async function getPage(id: string) {
  return db.page.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      featuredImage: true,
    },
  });
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string) {
  return db.page.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      featuredImage: true,
    },
  });
}

/**
 * Get all published pages
 */
export async function getPublishedPages() {
  return db.page.findMany({
    where: { status: 'published' },
    include: {
      featuredImage: {
        select: {
          path: true,
          alt: true,
        },
      },
    },
    orderBy: { publishedAt: 'desc' },
  });
}

/**
 * Create a new page
 */
export async function createPage(data: CreatePageInput): Promise<Page> {
  // Handle empty slug for homepage
  let slug = data.slug;
  if (slug === undefined || slug === null) {
    slug = await generateUniqueSlug(data.title);
  } else if (slug === '' || slug === '/') {
    // Empty slug for homepage - check if one already exists
    const existingHomepage = await db.page.findUnique({
      where: { slug: '' },
    });
    if (existingHomepage) {
      throw new Error('A homepage already exists. Please edit the existing homepage or use a different slug.');
    }
    slug = '';
  } else {
    // Ensure slug is unique
    slug = await generateUniqueSlug(slug);
  }

  const pageData: Prisma.PageCreateInput = {
    title: data.title,
    slug,
    content: data.content,
    excerpt: data.excerpt,
    status: data.status || 'draft',
    // Template system
    pageType: data.pageType,
    template: data.template,
    isEssential: data.isEssential || false,
    // Homepage data
    homepageData: data.homepageData ? JSON.stringify(data.homepageData) : null,
    // SEO
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    metaKeywords: data.metaKeywords,
    canonicalUrl: data.canonicalUrl,
    ogTitle: data.ogTitle,
    ogDescription: data.ogDescription,
    twitterTitle: data.twitterTitle,
    twitterDescription: data.twitterDescription,
  };

  // Add optional relations
  if (data.authorId) {
    pageData.author = { connect: { id: data.authorId } };
  }

  if (data.featuredImageId) {
    pageData.featuredImage = { connect: { id: data.featuredImageId } };
  }

  if (data.ogImageId) {
    pageData.ogImageId = data.ogImageId;
  }

  if (data.twitterImageId) {
    pageData.twitterImageId = data.twitterImageId;
  }

  // Set publishedAt if status is published
  if (data.status === 'published') {
    pageData.publishedAt = new Date();
  }

  return db.page.create({
    data: pageData,
  });
}

/**
 * Update an existing page
 */
export async function updatePage(id: string, data: UpdatePageInput): Promise<Page> {
  const updateData: Prisma.PageUpdateInput = {};

  // Update basic fields
  if (data.title !== undefined) updateData.title = data.title;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
  
  // Template system
  if (data.pageType !== undefined) updateData.pageType = data.pageType;
  if (data.template !== undefined) updateData.template = data.template;
  if (data.isEssential !== undefined) updateData.isEssential = data.isEssential;
  
  // Homepage data
  if (data.homepageData !== undefined) {
    updateData.homepageData = data.homepageData ? JSON.stringify(data.homepageData) : null;
  }
  
  // SEO fields
  if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
  if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
  if (data.metaKeywords !== undefined) updateData.metaKeywords = data.metaKeywords;
  if (data.canonicalUrl !== undefined) updateData.canonicalUrl = data.canonicalUrl;
  if (data.ogTitle !== undefined) updateData.ogTitle = data.ogTitle;
  if (data.ogDescription !== undefined) updateData.ogDescription = data.ogDescription;
  if (data.twitterTitle !== undefined) updateData.twitterTitle = data.twitterTitle;
  if (data.twitterDescription !== undefined) updateData.twitterDescription = data.twitterDescription;

  // Handle slug update
  if (data.slug !== undefined) {
    if (data.slug === '' || data.slug === '/') {
      // Check if another homepage exists
      const existingHomepage = await db.page.findFirst({
        where: {
          slug: '',
          id: { not: id }
        },
      });
      if (existingHomepage) {
        throw new Error('A homepage already exists. Please edit the existing homepage or use a different slug.');
      }
      updateData.slug = '';
    } else {
      const slugAvailable = await isSlugAvailable(data.slug, id);
      if (!slugAvailable) {
        throw new Error('Slug is already in use');
      }
      updateData.slug = data.slug;
    }
  }

  // Handle status change
  if (data.status !== undefined) {
    const currentPage = await db.page.findUnique({
      where: { id },
      select: { status: true, publishedAt: true },
    });

    if (currentPage) {
      updateData.status = data.status;
      
      // Set publishedAt when publishing for the first time
      if (data.status === 'published' && currentPage.status === 'draft' && !currentPage.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
  }

  // Handle featured image
  if (data.featuredImageId !== undefined) {
    if (data.featuredImageId) {
      updateData.featuredImage = { connect: { id: data.featuredImageId } };
    } else {
      updateData.featuredImage = { disconnect: true };
    }
  }

  // Handle OG image
  if (data.ogImageId !== undefined) {
    updateData.ogImageId = data.ogImageId;
  }

  // Handle Twitter image
  if (data.twitterImageId !== undefined) {
    updateData.twitterImageId = data.twitterImageId;
  }

  return db.page.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a page
 */
export async function deletePage(id: string): Promise<void> {
  await db.page.delete({
    where: { id },
  });
}

/**
 * Extract excerpt from HTML content
 */
export function extractExcerpt(html: string, maxLength: number = 160): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  
  // Trim and limit length
  if (text.length <= maxLength) {
    return text.trim();
  }
  
  // Cut at word boundary
  const trimmed = text.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  
  return (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + '...';
}

/**
 * Get pages by type (homepage, about, contact, etc.)
 */
export async function getPagesByType(pageType: string) {
  return db.page.findMany({
    where: { pageType },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get essential pages (Terms, Privacy, etc.)
 */
export async function getEssentialPages() {
  return db.page.findMany({
    where: { isEssential: true },
    orderBy: { createdAt: 'asc' },
  });
}

/**
 * Check if a page type already exists (for unique pages like homepage)
 */
export async function pageTypeExists(pageType: string, excludeId?: string): Promise<boolean> {
  const where: Prisma.PageWhereInput = { pageType };
  if (excludeId) {
    where.id = { not: excludeId };
  }
  
  const count = await db.page.count({ where });
  return count > 0;
}

/**
 * Get or create homepage
 */
export async function getOrCreateHomepage() {
  // Try to find existing homepage by slug first (most reliable)
  let homepage = await db.page.findFirst({
    where: {
      slug: '',
    },
  });

  // If not found by slug, try other methods
  if (!homepage) {
    homepage = await db.page.findFirst({
      where: {
        OR: [
          { pageType: 'homepage' },
          { isHomepage: true }
        ]
      },
    });
  }

  // If still no homepage exists, create one with defaults
  if (!homepage) {
    const defaultHomepageData: HomepageData = {
      showHero: true,
      heroTitle: 'Welcome to Our Store',
      heroSubtitle: 'Discover amazing products at great prices',
      heroImageId: null,
      heroButtonText: 'Shop Now',
      heroButtonUrl: '/products',
      showFeaturedProducts: true,
      featuredProductsTitle: 'Featured Products',
      featuredProductsCount: 8,
      featuredProductsColumnsMobile: 2,
      featuredProductsColumnsDesktop: 4,
      showCategories: true,
      categoriesTitle: 'Shop by Category',
      categoriesCount: 6,
      showNewsletter: true,
      newsletterTitle: 'Stay Updated',
      newsletterSubtitle: 'Subscribe to get special offers and updates',
    };

    try {
      homepage = await createPage({
        title: 'Homepage',
        slug: '',
        content: '<p>This is your homepage. Configure sections below.</p>',
        status: 'published',
        pageType: 'homepage',
        template: 'homepage',
        isEssential: true,
        homepageData: defaultHomepageData,
        metaTitle: 'Welcome to Our Store',
        metaDescription: 'Discover amazing products at great prices. Shop our wide selection of quality products with fast shipping.',
      });
    } catch (error) {
      // If creation fails (e.g., slug conflict), try to find it again
      homepage = await db.page.findFirst({
        where: {
          slug: '',
        },
      });
      
      if (!homepage) {
        throw error; // Re-throw if still not found
      }
    }
  }

  return homepage;
}