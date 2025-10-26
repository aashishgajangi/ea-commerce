-- =====================================================
-- PERFORMANCE OPTIMIZATION INDEXES
-- =====================================================
-- This migration adds indexes for frequently queried fields
-- to dramatically improve query performance

-- SiteSettings - Index on key for faster settings lookups
CREATE INDEX IF NOT EXISTS "idx_site_settings_key" ON "site_settings"("key");

-- Configuration - Index on key for faster config lookups (if not already indexed by unique)
CREATE INDEX IF NOT EXISTS "idx_configuration_key" ON "configurations"("key");

-- Product - Composite indexes for common queries
CREATE INDEX IF NOT EXISTS "idx_product_status_active" ON "products"("status", "isActive");
CREATE INDEX IF NOT EXISTS "idx_product_category_status" ON "products"("categoryId", "status", "isActive");
CREATE INDEX IF NOT EXISTS "idx_product_featured_status" ON "products"("isFeatured", "status", "isActive");

-- ProductImage - Index for finding primary images faster
CREATE INDEX IF NOT EXISTS "idx_product_image_primary" ON "product_images"("productId", "isPrimary");

-- Menu - Index on location for faster menu lookups
CREATE INDEX IF NOT EXISTS "idx_menu_location" ON "menus"("location");

-- MenuItem - Composite index for menu queries
CREATE INDEX IF NOT EXISTS "idx_menu_item_menu_parent" ON "menu_items"("menuId", "parentId", "order");

-- Media - Index on userId and createdAt for admin panel
CREATE INDEX IF NOT EXISTS "idx_media_user_created" ON "media"("userId", "createdAt" DESC);

-- Cart - Index on sessionId and expiresAt for guest cart lookups
CREATE INDEX IF NOT EXISTS "idx_cart_session_expires" ON "carts"("sessionId", "expiresAt");

-- CartItem - Composite index for cart queries
CREATE INDEX IF NOT EXISTS "idx_cart_item_cart_product" ON "cart_items"("cartId", "productId", "variantId");

-- Page - Composite index for published pages
CREATE INDEX IF NOT EXISTS "idx_page_status_published" ON "pages"("status", "publishedAt" DESC);

-- Review - Composite index for product reviews
CREATE INDEX IF NOT EXISTS "idx_review_product_status" ON "reviews"("productId", "status", "createdAt" DESC);

-- Category - Index for active categories with order
CREATE INDEX IF NOT EXISTS "idx_category_active_order" ON "categories"("isActive", "parentId", "order");
