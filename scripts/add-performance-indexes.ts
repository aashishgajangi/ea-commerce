#!/usr/bin/env tsx

/**
 * Add Performance Indexes Script
 * Run this script to add database indexes for improved query performance
 * 
 * Usage: npm run db:optimize
 */

import { db } from '../src/lib/db';

const indexes = [
  {
    name: 'idx_site_settings_key',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_site_settings_key" ON "site_settings"("key")',
    description: 'Settings lookup by key',
  },
  {
    name: 'idx_configuration_key',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_configuration_key" ON "configurations"("key")',
    description: 'Configuration lookup by key',
  },
  {
    name: 'idx_product_status_active',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_product_status_active" ON "products"("status", "isActive")',
    description: 'Product filtering by status and active state',
  },
  {
    name: 'idx_product_category_status',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_product_category_status" ON "products"("categoryId", "status", "isActive")',
    description: 'Product filtering by category',
  },
  {
    name: 'idx_product_featured_status',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_product_featured_status" ON "products"("isFeatured", "status", "isActive")',
    description: 'Featured products lookup',
  },
  {
    name: 'idx_product_image_primary',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_product_image_primary" ON "product_images"("productId", "isPrimary")',
    description: 'Primary image lookup',
  },
  {
    name: 'idx_menu_location',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_menu_location" ON "menus"("location")',
    description: 'Menu lookup by location',
  },
  {
    name: 'idx_menu_item_menu_parent',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_menu_item_menu_parent" ON "menu_items"("menuId", "parentId", "order")',
    description: 'Menu items hierarchical queries',
  },
  {
    name: 'idx_media_user_created',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_media_user_created" ON "media"("userId", "createdAt" DESC)',
    description: 'Media library pagination',
  },
  {
    name: 'idx_cart_session_expires',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_cart_session_expires" ON "carts"("sessionId", "expiresAt")',
    description: 'Guest cart lookup and cleanup',
  },
  {
    name: 'idx_cart_item_cart_product',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_cart_item_cart_product" ON "cart_items"("cartId", "productId", "variantId")',
    description: 'Cart item queries',
  },
  {
    name: 'idx_page_status_published',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_page_status_published" ON "pages"("status", "publishedAt" DESC)',
    description: 'Published pages lookup',
  },
  {
    name: 'idx_review_product_status',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_review_product_status" ON "reviews"("productId", "status", "createdAt" DESC)',
    description: 'Product reviews with moderation',
  },
  {
    name: 'idx_category_active_order',
    sql: 'CREATE INDEX IF NOT EXISTS "idx_category_active_order" ON "categories"("isActive", "parentId", "order")',
    description: 'Category hierarchical queries',
  },
];

async function main() {
  console.log('🚀 Adding performance indexes to database...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const index of indexes) {
    try {
      console.log(`📌 Creating index: ${index.name}`);
      console.log(`   Purpose: ${index.description}`);
      
      await db.$executeRawUnsafe(index.sql);
      
      console.log(`   ✅ Success\n`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
      errorCount++;
    }
  }

  console.log('═══════════════════════════════════════');
  console.log(`✅ Successfully created: ${successCount} indexes`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} indexes`);
  }
  console.log('═══════════════════════════════════════\n');

  await db.$disconnect();
}

main()
  .then(() => {
    console.log('✨ Database optimization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
