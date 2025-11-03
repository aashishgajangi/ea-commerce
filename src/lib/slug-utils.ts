/**
 * SEO-Friendly Slug Generation Utilities
 * Generates readable, SEO-optimized slugs for categories and products
 */

// Common stop words to remove for better SEO
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall'
]);

// Brand names and important terms to preserve
const PRESERVE_TERMS = new Set([
  'iphone', 'ipad', 'macbook', 'samsung', 'nike', 'adidas', 'apple', 'google', 'microsoft',
  'sony', 'lg', 'hp', 'dell', 'lenovo', 'asus', 'acer', 'canon', 'nikon', 'pro', 'max', 'plus',
  'ultra', 'premium', 'deluxe', 'professional', 'business', 'gaming', 'wireless', 'bluetooth'
]);

/**
 * Generate SEO-friendly slug from text
 */
export function generateSEOSlug(text: string): string {
  if (!text || text.trim() === '') {
    return '';
  }

  return text
    .trim()
    // Convert to lowercase
    .toLowerCase()
    // Handle common contractions and possessives
    .replace(/['']s\b/g, 's')  // "Men's" → "mens", "Women's" → "womens"
    .replace(/['']re\b/g, 're') // "You're" → "youre"
    .replace(/['']ll\b/g, 'll') // "You'll" → "youll"
    .replace(/['']ve\b/g, 've') // "You've" → "youve"
    .replace(/['']t\b/g, 't')   // "Don't" → "dont"
    // Remove other apostrophes and quotes
    .replace(/['''"""]/g, '')
    // Handle ampersands
    .replace(/\s*&\s*/g, '-and-')
    // Handle plus signs
    .replace(/\s*\+\s*/g, '-plus-')
    // Handle @ symbols
    .replace(/@/g, '-at-')
    // Handle percentages
    .replace(/(\d+)%/g, '$1-percent')
    // Handle sizes (e.g., "XL", "XXL")
    .replace(/\b(xs|s|m|l|xl|xxl|xxxl)\b/g, 'size-$1')
    // Handle numbers with units
    .replace(/(\d+)(gb|tb|mb|kg|g|cm|mm|inch|ft)/g, '$1-$2')
    // Replace special characters with spaces
    .replace(/[^\w\s-]/g, ' ')
    // Split into words
    .split(/\s+/)
    // Filter out empty strings and stop words, but preserve important terms
    .filter(word => {
      if (!word) return false;
      if (PRESERVE_TERMS.has(word)) return true;
      if (STOP_WORDS.has(word)) return false;
      // Keep numbers and meaningful words
      return word.length > 1 || /\d/.test(word);
    })
    // Join with hyphens
    .join('-')
    // Clean up multiple hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length for SEO (Google recommends under 60 characters)
    .substring(0, 60)
    // Remove trailing hyphen if we cut off mid-word
    .replace(/-+$/, '');
}

/**
 * Generate category-specific SEO slug
 */
export function generateCategorySEOSlug(name: string): string {
  let slug = generateSEOSlug(name);
  
  // Category-specific optimizations
  slug = slug
    // Handle common category patterns
    .replace(/\bcategory\b/g, '')
    .replace(/\bcollection\b/g, '')
    .replace(/\bdepartment\b/g, '')
    // Clean up again
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'category';
}

/**
 * Generate product-specific SEO slug
 */
export function generateProductSEOSlug(name: string): string {
  let slug = generateSEOSlug(name);
  
  // Product-specific optimizations
  slug = slug
    // Handle product-specific terms
    .replace(/\bproduct\b/g, '')
    .replace(/\bitem\b/g, '')
    // Handle model numbers and SKUs better
    .replace(/\bmodel\b/g, '')
    .replace(/\bsku\b/g, '')
    // Clean up again
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'product';
}

/**
 * Examples of improved slugs:
 * 
 * Categories:
 * "Men's Clothing & Accessories" → "mens-clothing-and-accessories"
 * "Women's Shoes - High Heels" → "womens-shoes-high-heels"
 * "Electronics & Gadgets" → "electronics-and-gadgets"
 * "Home & Garden Furniture" → "home-garden-furniture"
 * 
 * Products:
 * "iPhone 14 Pro Max 256GB" → "iphone-14-pro-max-256-gb"
 * "Men's Nike Air Max 90" → "mens-nike-air-max-90"
 * "Samsung 55\" 4K Smart TV" → "samsung-55-4k-smart-tv"
 * "Women's Levi's 501 Jeans" → "womens-levis-501-jeans"
 * "MacBook Pro 16\" M2 Chip" → "macbook-pro-16-m2-chip"
 */
