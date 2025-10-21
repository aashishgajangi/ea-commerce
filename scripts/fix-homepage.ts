/**
 * Fix Homepage - Ensure homepage has correct fields
 * Run: npx tsx scripts/fix-homepage.ts
 */

import { db } from '../src/lib/db';

async function fixHomepage() {
  console.log('🔍 Checking for homepage...\n');

  // Find any page with blank slug
  const blankSlugPages = await db.page.findMany({
    where: {
      slug: '',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      pageType: true,
      isHomepage: true,
      status: true,
    },
  });

  console.log(`Found ${blankSlugPages.length} page(s) with blank slug:\n`);
  blankSlugPages.forEach((page, i) => {
    console.log(`${i + 1}. ID: ${page.id}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   Slug: "${page.slug}" (blank)`);
    console.log(`   PageType: ${page.pageType || 'null'}`);
    console.log(`   IsHomepage: ${page.isHomepage}`);
    console.log(`   Status: ${page.status}\n`);
  });

  if (blankSlugPages.length === 0) {
    console.log('✅ No pages with blank slug found.');
    console.log('Homepage will be auto-created on next visit.\n');
    return;
  }

  if (blankSlugPages.length > 1) {
    console.log('⚠️  WARNING: Multiple pages with blank slug found!');
    console.log('This should not happen. Keeping first, deleting others...\n');
    
    // Delete duplicates
    for (let i = 1; i < blankSlugPages.length; i++) {
      await db.page.delete({
        where: { id: blankSlugPages[i].id },
      });
      console.log(`❌ Deleted duplicate: ${blankSlugPages[i].title} (${blankSlugPages[i].id})`);
    }
  }

  // Update the remaining page to be proper homepage
  const homepage = blankSlugPages[0];
  
  console.log('\n🔧 Updating homepage fields...');
  
  const defaultHomepageData = {
    showHero: true,
    heroTitle: 'Welcome to Our Store',
    heroSubtitle: 'Discover amazing products at great prices',
    heroImageId: null,
    heroButtonText: 'Shop Now',
    heroButtonUrl: '/products',
    showFeaturedProducts: true,
    featuredProductsTitle: 'Featured Products',
    featuredProductsCount: 8,
    showCategories: true,
    categoriesTitle: 'Shop by Category',
    categoriesCount: 6,
    showNewsletter: true,
    newsletterTitle: 'Stay Updated',
    newsletterSubtitle: 'Subscribe to get special offers and updates',
  };

  await db.page.update({
    where: { id: homepage.id },
    data: {
      pageType: 'homepage',
      template: 'homepage',
      isEssential: true,
      isHomepage: true,
      homepageData: JSON.stringify(defaultHomepageData),
      status: 'published',
    },
  });

  console.log('✅ Homepage updated successfully!\n');
  console.log('Homepage details:');
  console.log(`   ID: ${homepage.id}`);
  console.log(`   Title: ${homepage.title}`);
  console.log(`   Slug: "/" (homepage)`);
  console.log(`   PageType: homepage`);
  console.log(`   Status: published\n`);
  console.log('🎉 Done! Visit http://localhost:3000 to see your homepage.\n');
}

fixHomepage()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
