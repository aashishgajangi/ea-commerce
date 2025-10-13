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