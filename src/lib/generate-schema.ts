/**
 * Generate proper JSON-LD schema with actual data
 * This replaces placeholder data with real product/category/page information
 */

interface ProductData {
  name: string;
  description: string | null;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: Array<{ url: string; alt: string | null; isPrimary: boolean }>;
  category?: { name: string; slug: string } | null;
  stockQuantity?: number;
  sku?: string | null;
  weight?: number | null;
}

interface CategoryData {
  name: string;
  description: string | null;
  slug: string;
  image?: string | null;
}

interface PageData {
  title: string;
  content?: string | null;
  excerpt?: string | null;
  slug: string;
  publishedAt?: Date | null;
  author?: { name: string } | null;
}

/**
 * Generate Product schema with real data
 */
export function generateProductSchema(
  product: ProductData,
  currency: string = 'INR',
  baseUrl: string = ''
): Record<string, unknown> {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const imageUrl = primaryImage ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${baseUrl}${primaryImage.url}`) : undefined;
  
  // Determine availability
  let availability = 'https://schema.org/InStock';
  if (product.stockQuantity !== undefined) {
    if (product.stockQuantity === 0) {
      availability = 'https://schema.org/OutOfStock';
    } else if (product.stockQuantity < 10) {
      availability = 'https://schema.org/LimitedAvailability';
    }
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.name,
    sku: product.sku || undefined,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: currency,
      availability,
      url: `${baseUrl}/products/${product.slug}`,
    },
  };

  // Add image if available
  if (imageUrl) {
    schema.image = imageUrl;
  }

  // Add brand/category if available
  if (product.category) {
    schema.brand = {
      '@type': 'Brand',
      name: product.category.name,
    };
  }

  // Add weight if available
  if (product.weight) {
    schema.weight = {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitCode: 'KGM', // kilograms
    };
  }

  return schema;
}

/**
 * Generate Category/LocalBusiness schema
 */
export function generateCategorySchema(
  category: CategoryData,
  baseUrl: string = ''
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description || category.name,
    url: `${baseUrl}/categories/${category.slug}`,
  };

  if (category.image) {
    const imageUrl = category.image.startsWith('http') ? category.image : `${baseUrl}${category.image}`;
    schema.image = imageUrl;
  }

  return schema;
}

/**
 * Generate Article/WebPage schema
 */
export function generatePageSchema(
  page: PageData,
  baseUrl: string = ''
): Record<string, unknown> {
  const isArticle = page.publishedAt !== undefined;
  
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'WebPage',
    headline: page.title,
    description: page.excerpt || page.content?.substring(0, 160) || page.title,
    url: `${baseUrl}/${page.slug}`,
  };

  if (isArticle && page.publishedAt) {
    schema.datePublished = page.publishedAt.toISOString();
    schema.dateModified = page.publishedAt.toISOString();
    
    if (page.author) {
      schema.author = {
        '@type': 'Person',
        name: page.author.name,
      };
    }
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string = ''
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}
