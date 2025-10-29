#!/usr/bin/env tsx
/**
 * Seed Products Page for SEO Control
 * 
 * This script creates a system page entry for /products
 * allowing admins to control SEO metadata from /admin/pages
 * 
 * Usage: npx tsx scripts/seed-products-page.ts
 */

import { db } from '../src/lib/db';

async function seedProductsPage() {
  console.log('🌱 Seeding Products page for SEO control...\n');

  try {
    // Check if products page already exists
    const existing = await db.page.findUnique({
      where: { slug: 'products' },
    });

    if (existing) {
      console.log('✅ Products page already exists');
      console.log(`   ID: ${existing.id}`);
      console.log(`   Title: ${existing.title}`);
      console.log(`   Status: ${existing.status}`);
      console.log(`   System Page: ${existing.isSystemPage ? 'Yes' : 'No'}`);
      console.log('\n💡 You can edit SEO settings at: /admin/pages\n');
      return;
    }

    // Create the products page
    const productsPage = await db.page.create({
      data: {
        title: 'Products',
        slug: 'products',
        content: '<p>Browse our complete collection of products.</p>',
        excerpt: 'Explore our wide range of high-quality products',
        status: 'published',
        pageType: 'products',
        isSystemPage: true,
        isEssential: true,
        
        // SEO fields
        metaTitle: 'Shop All Products | Browse Our Collection',
        metaDescription: 'Discover our complete range of products. Find exactly what you need with our easy-to-use filters and search. Quality products at great prices.',
        metaKeywords: 'products, shop, buy online, e-commerce, catalog',
        robots: 'index,follow',
        
        // Open Graph
        ogTitle: 'Shop All Products',
        ogDescription: 'Browse our complete collection of quality products at great prices',
        
        // Twitter Card
        twitterTitle: 'Shop All Products',
        twitterDescription: 'Discover our complete product collection',
        
        // Structured Data
        schemaType: 'CollectionPage',
        schemaData: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Products',
          description: 'Browse our complete collection of products',
          url: '/products',
        }),
      },
    });

    console.log('✅ Products page created successfully!\n');
    console.log('📄 Page Details:');
    console.log(`   ID: ${productsPage.id}`);
    console.log(`   Title: ${productsPage.title}`);
    console.log(`   Slug: /${productsPage.slug}`);
    console.log(`   Status: ${productsPage.status}`);
    console.log(`   System Page: Yes`);
    console.log(`   Essential: Yes (cannot be deleted)`);
    console.log('\n🎨 SEO Settings:');
    console.log(`   Meta Title: ${productsPage.metaTitle}`);
    console.log(`   Meta Description: ${productsPage.metaDescription?.substring(0, 60)}...`);
    console.log(`   Schema Type: ${productsPage.schemaType}`);
    console.log('\n✨ Next Steps:');
    console.log('   1. Visit /admin/pages to see the Products page');
    console.log('   2. Click Edit to customize SEO settings');
    console.log('   3. Add custom OG images, keywords, etc.');
    console.log('   4. Changes will automatically apply to /products\n');

  } catch (error) {
    console.error('❌ Error seeding products page:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

seedProductsPage();
