import { SEOData, SEOScore } from './types';

export function calculateSEOScore(data: SEOData): SEOScore {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Meta Title (15 points)
  if (data.metaTitle && data.metaTitle.trim().length > 0) {
    if (data.metaTitle.length >= 50 && data.metaTitle.length <= 60) {
      score += 15;
    } else if (data.metaTitle.length >= 30) {
      score += 10;
      if (data.metaTitle.length < 50) {
        suggestions.push('Meta title could be longer (50-60 chars is ideal)');
      }
      if (data.metaTitle.length > 60) {
        suggestions.push('Meta title is a bit long. Consider shortening to 50-60 characters');
      }
    } else {
      score += 5;
      issues.push('Meta title is too short (< 30 chars)');
      suggestions.push('Expand your meta title to 50-60 characters');
    }
  } else {
    issues.push('Meta title is missing');
    suggestions.push('Add a compelling meta title (50-60 characters)');
  }

  // Meta Description (15 points)
  if (data.metaDescription && data.metaDescription.trim().length > 0) {
    if (data.metaDescription.length >= 150 && data.metaDescription.length <= 160) {
      score += 15;
    } else if (data.metaDescription.length >= 120) {
      score += 12;
      if (data.metaDescription.length < 150) {
        suggestions.push('Meta description could be longer (150-160 chars is ideal)');
      }
      if (data.metaDescription.length > 160) {
        suggestions.push('Meta description is a bit long. Consider shortening to 150-160 characters');
      }
    } else if (data.metaDescription.length >= 70) {
      score += 8;
      suggestions.push('Meta description is quite short. Aim for 150-160 characters');
    } else {
      score += 4;
      issues.push('Meta description is too short (< 70 chars)');
      suggestions.push('Expand your meta description to 150-160 characters');
    }
  } else {
    issues.push('Meta description is missing');
    suggestions.push('Add a descriptive meta description (150-160 characters)');
  }

  // Focus Keyphrase (20 points total)
  const keyphrases = data.focusKeyphrases || (data.focusKeyphrase ? [data.focusKeyphrase] : []);
  const validKeyphrases = keyphrases.filter(kp => kp && kp.trim().length > 0);
  
  if (validKeyphrases.length > 0) {
    score += 10;
    
    // Check primary keyphrase (first one) in title and description
    const primaryKeyphrase = validKeyphrases[0];
    
    // Check if keyphrase is in title
    if (data.metaTitle?.toLowerCase().includes(primaryKeyphrase.toLowerCase())) {
      score += 5;
    } else {
      suggestions.push('Consider including your primary keyphrase in the meta title');
    }
    
    // Check if keyphrase is in description
    if (data.metaDescription?.toLowerCase().includes(primaryKeyphrase.toLowerCase())) {
      score += 5;
    } else {
      suggestions.push('Consider including your primary keyphrase in the meta description');
    }
    
    // Bonus: Check secondary keyphrases
    if (validKeyphrases.length > 1) {
      const secondaryInContent = validKeyphrases.slice(1).some(kp => 
        data.metaDescription?.toLowerCase().includes(kp.toLowerCase())
      );
      if (!secondaryInContent) {
        suggestions.push('Consider including secondary keyphrases in the description');
      }
    }
  } else {
    suggestions.push('Add at least one focus keyphrase for better targeting');
  }

  // Open Graph (15 points)
  if (data.ogTitle && data.ogTitle.trim().length > 0 && data.ogDescription && data.ogDescription.trim().length > 0) {
    score += 10;
    if (data.ogImageUrl || data.ogImageId) {
      score += 5;
    } else {
      suggestions.push('Add an Open Graph image (1200x630px recommended) for better social sharing');
    }
  } else if (data.ogTitle || data.ogDescription) {
    score += 5;
    suggestions.push('Complete Open Graph title and description for social sharing');
  } else {
    suggestions.push('Add Open Graph tags for better social media sharing');
  }

  // Twitter Card (10 points)
  if (data.twitterTitle && data.twitterTitle.trim().length > 0 && data.twitterDescription && data.twitterDescription.trim().length > 0) {
    score += 10;
  } else if (data.twitterTitle || data.twitterDescription) {
    score += 5;
    suggestions.push('Complete Twitter Card title and description');
  } else {
    suggestions.push('Add Twitter Card tags for better Twitter sharing');
  }

  // Canonical URL (10 points)
  if (data.canonicalUrl && data.canonicalUrl.trim().length > 0) {
    score += 10;
  } else {
    suggestions.push('Set a canonical URL to prevent duplicate content issues');
  }

  // Structured Data (10 points)
  if (data.schemaType && data.schemaData) {
    score += 10;
  } else if (data.schemaType) {
    score += 5;
    suggestions.push('Generate JSON-LD schema data for your selected schema type');
  } else {
    suggestions.push('Add JSON-LD structured data for rich search results');
  }

  // Keywords (5 points)
  const keywords = data.metaKeywords?.split(',').filter(k => k.trim().length > 0) || [];
  if (keywords.length >= 3) {
    score += 5;
  } else if (keywords.length > 0) {
    score += 2;
    suggestions.push('Add 3-5 relevant keywords for better targeting');
  } else {
    suggestions.push('Add 3-5 relevant keywords');
  }

  // Robots (5 points) - Give credit if set, it's optional
  if (data.robots && data.robots.trim().length > 0) {
    score += 5;
  } else {
    // Robots is optional, default is index,follow which is good
    score += 3;
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
