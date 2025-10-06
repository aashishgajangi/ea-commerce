import type { Page } from '@prisma/client';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
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
 */
export function generateSEOData(
  page: Page & {
    featuredImage?: { path: string; alt: string | null } | null;
  },
  siteUrl: string
): SEOData {
  const pageUrl = `${siteUrl}/${page.slug}`;
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.excerpt || '',
    keywords: page.metaKeywords || undefined,
    canonicalUrl: page.canonicalUrl || pageUrl,
    ogTitle: page.ogTitle || page.metaTitle || page.title,
    ogDescription: page.ogDescription || page.metaDescription || page.excerpt || '',
    ogImage: page.featuredImage?.path ? `${siteUrl}${page.featuredImage.path}` : undefined,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: page.twitterTitle || page.metaTitle || page.title,
    twitterDescription: page.twitterDescription || page.metaDescription || page.excerpt || '',
    twitterImage: page.featuredImage?.path ? `${siteUrl}${page.featuredImage.path}` : undefined,
  };
}

/**
 * Generate JSON-LD structured data for a page
 */
export function generateStructuredData(
  page: Page & {
    author?: { name: string | null; email: string } | null;
    featuredImage?: { path: string; alt: string | null } | null;
  },
  siteUrl: string
): Record<string, unknown> {
  const pageUrl = `${siteUrl}/${page.slug}`;
  
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.excerpt || page.metaDescription || '',
    url: pageUrl,
    datePublished: page.publishedAt?.toISOString(),
    dateModified: page.updatedAt.toISOString(),
  };

  // Add author if available
  if (page.author) {
    structuredData.author = {
      '@type': 'Person',
      name: page.author.name || page.author.email,
      email: page.author.email,
    };
  }

  // Add image if available
  if (page.featuredImage) {
    structuredData.image = {
      '@type': 'ImageObject',
      url: `${siteUrl}${page.featuredImage.path}`,
      description: page.featuredImage.alt || page.title,
    };
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