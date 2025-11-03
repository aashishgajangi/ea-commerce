-- Add advanced SEO fields to Product model
-- Similar to Page model SEO fields

-- Add canonical URL
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "canonicalUrl" TEXT;

-- Add Open Graph fields
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ogTitle" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ogDescription" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ogImageId" TEXT;

-- Add Twitter Card fields
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "twitterTitle" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "twitterDescription" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "twitterImageId" TEXT;

-- Add focus keyphrase (for SEO optimization)
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "focusKeyphrase" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "focusKeyphrases" JSONB;

-- Add robots meta tag control
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "robots" TEXT DEFAULT 'index,follow';

-- Add schema.org structured data
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "schemaType" TEXT DEFAULT 'Product';
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "schemaData" JSONB;

-- Add foreign key constraints for OG and Twitter images
ALTER TABLE "products" 
  ADD CONSTRAINT "products_ogImageId_fkey" 
  FOREIGN KEY ("ogImageId") REFERENCES "media"("id") 
  ON DELETE SET NULL 
  ON UPDATE CASCADE;

ALTER TABLE "products" 
  ADD CONSTRAINT "products_twitterImageId_fkey" 
  FOREIGN KEY ("twitterImageId") REFERENCES "media"("id") 
  ON DELETE SET NULL 
  ON UPDATE CASCADE;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "products_canonicalUrl_idx" ON "products"("canonicalUrl");
CREATE INDEX IF NOT EXISTS "products_focusKeyphrase_idx" ON "products"("focusKeyphrase");
