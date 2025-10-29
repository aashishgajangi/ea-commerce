import { SEOData, SEOScore } from './types';

export function calculateSEOScore(data: SEOData): SEOScore {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Meta Title (15 points)
  if (data.metaTitle) {
    if (data.metaTitle.length >= 50 && data.metaTitle.length <= 60) {
      score += 15;
    } else if (data.metaTitle.length > 0) {
      score += 8;
      if (data.metaTitle.length < 50) {
        issues.push('Meta title is too short (< 50 chars)');
        suggestions.push('Expand your meta title to 50-60 characters');
      }
      if (data.metaTitle.length > 60) {
        issues.push('Meta title is too long (> 60 chars)');
        suggestions.push('Shorten your meta title to 50-60 characters');
      }
    }
  } else {
    issues.push('Meta title is missing');
    suggestions.push('Add a compelling meta title (50-60 characters)');
  }

  // Meta Description (15 points)
  if (data.metaDescription) {
    if (data.metaDescription.length >= 150 && data.metaDescription.length <= 160) {
      score += 15;
    } else if (data.metaDescription.length > 0) {
      score += 8;
      if (data.metaDescription.length < 150) {
        issues.push('Meta description is too short (< 150 chars)');
        suggestions.push('Expand your meta description to 150-160 characters');
      }
      if (data.metaDescription.length > 160) {
        issues.push('Meta description is too long (> 160 chars)');
        suggestions.push('Shorten your meta description to 150-160 characters');
      }
    }
  } else {
    issues.push('Meta description is missing');
    suggestions.push('Add a descriptive meta description (150-160 characters)');
  }

  // Focus Keyphrase (20 points total)
  const keyphrases = data.focusKeyphrases || (data.focusKeyphrase ? [data.focusKeyphrase] : []);
  
  if (keyphrases.length > 0) {
    score += 10;
    
    // Check primary keyphrase (first one) in title and description
    const primaryKeyphrase = keyphrases[0];
    
    // Check if keyphrase is in title
    if (data.metaTitle?.toLowerCase().includes(primaryKeyphrase.toLowerCase())) {
      score += 5;
    } else {
      issues.push('Primary keyphrase not found in meta title');
      suggestions.push('Include your primary keyphrase in the meta title');
    }
    
    // Check if keyphrase is in description
    if (data.metaDescription?.toLowerCase().includes(primaryKeyphrase.toLowerCase())) {
      score += 5;
    } else {
      issues.push('Primary keyphrase not found in meta description');
      suggestions.push('Include your primary keyphrase in the meta description');
    }
    
    // Bonus: Check secondary keyphrases
    if (keyphrases.length > 1) {
      const secondaryInContent = keyphrases.slice(1).some(kp => 
        data.metaDescription?.toLowerCase().includes(kp.toLowerCase())
      );
      if (!secondaryInContent) {
        suggestions.push('Consider including secondary keyphrases in the description');
      }
    }
  } else {
    issues.push('Focus keyphrase is missing');
    suggestions.push('Set at least one focus keyphrase for this page');
  }

  // Open Graph (15 points)
  if (data.ogTitle && data.ogDescription) {
    score += 10;
    if (data.ogImageUrl || data.ogImageId) {
      score += 5;
    } else {
      issues.push('Open Graph image is missing');
      suggestions.push('Add an Open Graph image (1200x630px recommended)');
    }
  } else {
    issues.push('Open Graph data is incomplete');
    suggestions.push('Complete Open Graph title and description for social sharing');
  }

  // Twitter Card (10 points)
  if (data.twitterTitle && data.twitterDescription) {
    score += 10;
  } else {
    issues.push('Twitter Card data is incomplete');
    suggestions.push('Add Twitter Card title and description');
  }

  // Canonical URL (10 points)
  if (data.canonicalUrl) {
    score += 10;
  } else {
    issues.push('Canonical URL is missing');
    suggestions.push('Set a canonical URL to prevent duplicate content issues');
  }

  // Structured Data (10 points)
  if (data.schemaType && data.schemaData) {
    score += 10;
  } else {
    issues.push('Structured data (JSON-LD) is missing');
    suggestions.push('Add JSON-LD structured data for rich search results');
  }

  // Keywords (5 points)
  if (data.metaKeywords && data.metaKeywords.split(',').length >= 3) {
    score += 5;
  } else {
    suggestions.push('Add 3-5 relevant keywords');
  }

  // Robots (5 points)
  if (data.robots) {
    score += 5;
  } else {
    suggestions.push('Set robots meta tag (defaults to index,follow)');
  }

  return { score, issues, suggestions };
}

export function generateSchemaData(
  schemaType: string,
  data: SEOData,
  pageTitle?: string,
  pageUrl?: string
): Record<string, unknown> | null {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
  };

  switch (schemaType) {
    case 'Article':
      return {
        ...baseSchema,
        headline: data.metaTitle || pageTitle,
        description: data.metaDescription,
        image: data.ogImageUrl,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Author Name',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Your Site Name',
        },
      };

    case 'WebPage':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        url: data.canonicalUrl || pageUrl,
      };

    case 'Product':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        image: data.ogImageUrl,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: [],
      };

    case 'Organization':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        url: data.canonicalUrl || pageUrl,
        logo: data.ogImageUrl,
      };

    case 'Person':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        url: data.canonicalUrl || pageUrl,
        image: data.ogImageUrl,
      };

    case 'Event':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        location: {
          '@type': 'Place',
          name: 'Event Location',
        },
      };

    case 'Recipe':
      return {
        ...baseSchema,
        name: data.metaTitle || pageTitle,
        description: data.metaDescription,
        image: data.ogImageUrl,
        recipeIngredient: [],
        recipeInstructions: [],
      };

    case 'Review':
      return {
        ...baseSchema,
        itemReviewed: {
          '@type': 'Thing',
          name: data.metaTitle || pageTitle,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Reviewer Name',
        },
      };

    default:
      return null;
  }
}
