-- Add isSystemPage field to pages table
-- System pages are auto-generated pages like /products, /search that need SEO control
-- They can be edited for SEO but not deleted

ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "isSystemPage" BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS "pages_isSystemPage_idx" ON "pages"("isSystemPage");

-- Insert default Products page for SEO control (only if it doesn't exist)
INSERT INTO "pages" (
  "id",
  "title",
  "slug",
  "content",
  "excerpt",
  "status",
  "pageType",
  "isSystemPage",
  "isEssential",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
  "robots",
  "ogTitle",
  "ogDescription",
  "twitterTitle",
  "twitterDescription",
  "schemaType",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid(),
  'Products',
  'products',
  '<p>Browse our complete collection of products.</p>',
  'Explore our wide range of high-quality products',
  'published',
  'products',
  true,
  true,
  'Shop All Products | Browse Our Collection',
  'Discover our complete range of products. Find exactly what you need with our easy-to-use filters and search. Quality products at great prices.',
  'products, shop, buy online, e-commerce, catalog',
  'index,follow',
  'Shop All Products',
  'Browse our complete collection of quality products at great prices',
  'Shop All Products',
  'Discover our complete product collection',
  'CollectionPage',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "pages" WHERE "slug" = 'products'
);
