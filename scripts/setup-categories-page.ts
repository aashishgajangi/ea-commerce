#!/usr/bin/env tsx
/**
 * Setup Categories System Page
 * Creates the "categories" system page for SEO and block management
 * Run with: npx tsx scripts/setup-categories-page.ts
 */

import { db } from '../src/lib/db';

async function setupCategoriesPage() {
  console.log('🚀 Setting up Categories system page...\n');

  try {
    // Check if categories page already exists
    const existingPage = await db.page.findUnique({
      where: { slug: 'categories' },
    });

    if (existingPage) {
      console.log('✅ Categories page already exists!');
      console.log(`   Page ID: ${existingPage.id}`);
      console.log(`   Title: ${existingPage.title}`);
      console.log(`   Status: ${existingPage.status}`);
      console.log('\n💡 You can edit it at: http://localhost:3000/admin/pages/categories/edit');
      return;
    }

    // Create the categories system page
    const categoriesPage = await db.page.create({
      data: {
        title: 'Categories',
        slug: 'categories',
        content: '', // No content needed, blocks will be used
        excerpt: 'Browse all product categories',
        status: 'published',
        pageType: 'system',
        isSystemPage: true,
        isEssential: true,
        
        // SEO fields
        metaTitle: 'Shop by Category',
        metaDescription: 'Browse all product categories and find exactly what you\'re looking for. Discover our wide range of products organized by category.',
        metaKeywords: 'categories, product categories, shop by category, browse categories',
        
        // Open Graph
        ogTitle: 'Shop by Category',
        ogDescription: 'Browse all product categories and find exactly what you\'re looking for.',
        
        // Twitter
        twitterTitle: 'Shop by Category',
        twitterDescription: 'Browse all product categories and find exactly what you\'re looking for.',
        
        // Blocks - empty array, user can add via admin
        blocks: '[]',
        
        publishedAt: new Date(),
      },
    });

    console.log('✅ Categories system page created successfully!\n');
    console.log('📄 Page Details:');
    console.log(`   Title: ${categoriesPage.title}`);
    console.log(`   Slug: ${categoriesPage.slug}`);
    console.log(`   Status: ${categoriesPage.status}`);
    console.log(`   Page Type: ${categoriesPage.pageType}`);
    console.log(`   System Page: ${categoriesPage.isSystemPage}`);
    console.log(`   Essential: ${categoriesPage.isEssential}`);
    console.log('\n✨ Next Steps:');
    console.log('   1. Visit http://localhost:3000/admin/pages');
    console.log('   2. Find the "Categories" page');
    console.log('   3. Click "Edit" to customize SEO and add blocks');
    console.log('   4. Add blocks like Hero, Content, Featured Categories, etc.');
    console.log('   5. Public page: http://localhost:3000/categories');

  } catch (error) {
    console.error('❌ Error setting up categories page:', error);
    throw error;
  }
}

// Run the setup
setupCategoriesPage()
  .then(() => {
    console.log('\n✅ Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  });
