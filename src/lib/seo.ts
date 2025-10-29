import type { Page } from '@prisma/client';
import { db } from './db';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * Generate SEO metadata from a page
 * Handles all SEO fields including robots, custom images, and OG/Twitter types
 */
export async function generateSEOData(
  page: Page & {
    featuredImage?: { path: string; alt: string | null } | null;
    ogImage?: { path: string; alt: string | null } | null;
    twitterImage?: { path: string; alt: string | null } | null;
  },
  siteUrl: string
): Promise<SEOData> {
  const pageUrl = `${siteUrl}/${page.slug}`;
  
  // Fetch custom OG and Twitter images if IDs are provided
  let ogImageUrl: string | undefined = undefined;
  let twitterImageUrl: string | undefined = undefined;
  
  try {
    if (page.ogImageId && page.ogImageId.trim().length > 0) {
      const ogImage = await db.media.findUnique({
        where: { id: page.ogImageId },
        select: { path: true },
      }).catch(() => null);
      if (ogImage) ogImageUrl = `${siteUrl}${ogImage.path}`;
    }
    
    if (page.twitterImageId && page.twitterImageId.trim().length > 0) {
      const twitterImage = await db.media.findUnique({
        where: { id: page.twitterImageId },
        select: { path: true },
      }).catch(() => null);
      if (twitterImage) twitterImageUrl = `${siteUrl}${twitterImage.path}`;
    }
  } catch (error) {
    console.error('Error fetching SEO images:', error);
    // Continue without custom images
  }
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.excerpt || '',
    keywords: page.metaKeywords || undefined,
    canonicalUrl: page.canonicalUrl || pageUrl,
    robots: page.robots || undefined,
    ogTitle: page.ogTitle || page.metaTitle || page.title,
    ogDescription: page.ogDescription || page.metaDescription || page.excerpt || '',
    ogImage: ogImageUrl || (page.ogImage?.path ? `${siteUrl}${page.ogImage.path}` : undefined) || (page.featuredImage?.path ? `${siteUrl}${page.featuredImage.path}` : undefined),
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: page.twitterTitle || page.metaTitle || page.title,
    twitterDescription: page.twitterDescription || page.metaDescription || page.excerpt || '',
    twitterImage: twitterImageUrl || (page.twitterImage?.path ? `${siteUrl}${page.twitterImage.path}` : undefined) || (page.featuredImage?.path ? `${siteUrl}${page.featuredImage.path}` : undefined),
  };
}

/**
 * Generate JSON-LD structured data for a page
 * Uses custom schema data if provided, otherwise generates default WebPage schema
 */
export function generateStructuredData(
  page: Page & {
    author?: { name: string | null; email: string } | null;
    featuredImage?: { path: string; alt: string | null } | null;
  },
  siteUrl: string
): Record<string, unknown> | null {
  const pageUrl = `${siteUrl}/${page.slug}`;
  
  // If page has custom schema data, use it
  if (page.schemaData) {
    try {
      const customSchema = typeof page.schemaData === 'string' 
        ? JSON.parse(page.schemaData) 
        : page.schemaData;
      
      // Ensure it has @context and @type
      if (!customSchema['@context']) {
        customSchema['@context'] = 'https://schema.org';
      }
      if (!customSchema['@type'] && page.schemaType) {
        customSchema['@type'] = page.schemaType;
      }
      
      return customSchema as Record<string, unknown>;
    } catch (error) {
      console.error('Error parsing custom schema data:', error);
      // Fall through to default schema generation
    }
  }
  
  // Generate default WebPage schema
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': page.schemaType || 'WebPage',
    '@id': pageUrl,
    name: page.title,
    headline: page.title,
    description: page.excerpt || page.metaDescription || '',
    url: pageUrl,
    datePublished: page.publishedAt?.toISOString(),
    dateModified: page.updatedAt.toISOString(),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: [pageUrl],
    },
  };

  // Add author if available
  if (page.author) {
    structuredData.author = {
      '@type': 'Person',
      '@id': `${siteUrl}/#/schema/person/${page.author.email}`,
      name: page.author.name || page.author.email,
      email: page.author.email,
    };
  }

  // Add image if available with enhanced metadata
  if (page.featuredImage) {
    structuredData.image = {
      '@type': 'ImageObject',
      '@id': `${pageUrl}#primaryimage`,
      url: `${siteUrl}${page.featuredImage.path}`,
      contentUrl: `${siteUrl}${page.featuredImage.path}`,
      caption: page.featuredImage.alt || page.title,
      description: page.featuredImage.alt || page.title,
    };
    structuredData.primaryImageOfPage = {
      '@id': `${pageUrl}#primaryimage`,
    };
  }

  // Add keywords if available
  if (page.metaKeywords) {
    structuredData.keywords = page.metaKeywords;
  }

  return structuredData;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbData(
  page: Page,
  siteUrl: string,
  siteName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteName,
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: `${siteUrl}/${page.slug}`,
      },
    ],
  };
}

/**
 * Generate Organization schema for the site
 */
export function generateOrganizationSchema(
  siteName: string,
  siteUrl: string,
  logoUrl?: string,
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  }
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
  };

  if (logoUrl) {
    schema.logo = {
      '@type': 'ImageObject',
      url: logoUrl,
    };
  }

  if (socialLinks) {
    const sameAs: string[] = [];
    if (socialLinks.facebook) sameAs.push(socialLinks.facebook);
    if (socialLinks.twitter) sameAs.push(socialLinks.twitter);
    if (socialLinks.instagram) sameAs.push(socialLinks.instagram);
    if (socialLinks.linkedin) sameAs.push(socialLinks.linkedin);
    
    if (sameAs.length > 0) {
      schema.sameAs = sameAs;
    }
  }

  return schema;
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebsiteSchema(
  siteName: string,
  siteUrl: string,
  description?: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    description: description || '',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

/**
 * Extract plain text from HTML content
 */
export function extractTextFromHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

/**
 * Generate FAQ schema from content
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}