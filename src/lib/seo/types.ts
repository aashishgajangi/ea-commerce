// SEO Data Types

export interface SEOData {
  // Basic Meta Tags
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: string;
  ogImageUrl?: string;
  ogType?: 'website' | 'article' | 'product' | 'blog';
  
  // Twitter Card
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageId?: string;
  twitterImageUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  // Advanced SEO
  robots?: string;
  focusKeyphrase?: string;
  focusKeyphrases?: string[]; // Multiple keyphrases (up to 5)
  
  // JSON-LD Structured Data
  schemaType?: 'Article' | 'WebPage' | 'Product' | 'FAQPage' | 'Organization' | 'Person' | 'Event' | 'Recipe' | 'Review';
  schemaData?: Record<string, unknown>;
}

export interface SEOScore {
  score: number;
  issues: string[];
  suggestions: string[];
}
