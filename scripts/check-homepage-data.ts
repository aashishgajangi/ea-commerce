/**
 * Check Homepage Data - View what's stored in database
 * Run: npx tsx scripts/check-homepage-data.ts
 */

import { db } from '../src/lib/db';

async function checkHomepage() {
  console.log('🔍 Checking homepage data...\n');

  // Find homepage
  const homepage = await db.page.findFirst({
    where: {
      slug: '',
    },
  });

  if (!homepage) {
    console.log('❌ No homepage found!\n');
    return;
  }

  console.log('✅ Homepage found!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📄 Basic Info:');
  console.log(`   ID: ${homepage.id}`);
  console.log(`   Title: ${homepage.title}`);
  console.log(`   Slug: "${homepage.slug}" (blank = homepage)`);
  console.log(`   Status: ${homepage.status}`);
  console.log(`   PageType: ${homepage.pageType}`);
  console.log(`   Template: ${homepage.template}`);
  console.log(`   IsHomepage: ${homepage.isHomepage}`);
  console.log(`   IsEssential: ${homepage.isEssential}\n`);

  console.log('🎨 SEO Meta:');
  console.log(`   Meta Title: ${homepage.metaTitle || '(empty)'}`);
  console.log(`   Meta Description: ${homepage.metaDescription || '(empty)'}`);
  console.log(`   Meta Keywords: ${homepage.metaKeywords || '(empty)'}\n`);

  console.log('📝 Content Preview:');
  const contentPreview = homepage.content.substring(0, 100);
  console.log(`   ${contentPreview}${homepage.content.length > 100 ? '...' : ''}\n`);

  if (homepage.homepageData) {
    try {
      const data = JSON.parse(homepage.homepageData);
      console.log('🏠 Homepage Sections Data:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      console.log('🎯 Hero Section:');
      console.log(`   Enabled: ${data.showHero ? '✅ Yes' : '❌ No'}`);
      console.log(`   Title: "${data.heroTitle}"`);
      console.log(`   Subtitle: "${data.heroSubtitle}"`);
      console.log(`   Button: "${data.heroButtonText}" → ${data.heroButtonUrl}`);
      console.log(`   Image ID: ${data.heroImageId || '(none)'}\n`);

      console.log('📦 Featured Products:');
      console.log(`   Enabled: ${data.showFeaturedProducts ? '✅ Yes' : '❌ No'}`);
      console.log(`   Title: "${data.featuredProductsTitle}"`);
      console.log(`   Count: ${data.featuredProductsCount}\n`);

      console.log('📂 Categories:');
      console.log(`   Enabled: ${data.showCategories ? '✅ Yes' : '❌ No'}`);
      console.log(`   Title: "${data.categoriesTitle}"`);
      console.log(`   Count: ${data.categoriesCount}\n`);

      console.log('📧 Newsletter:');
      console.log(`   Enabled: ${data.showNewsletter ? '✅ Yes' : '❌ No'}`);
      console.log(`   Title: "${data.newsletterTitle}"`);
      console.log(`   Subtitle: "${data.newsletterSubtitle}"\n`);

    } catch (error) {
      console.log('❌ Error parsing homepage data:', error);
      console.log('Raw data:', homepage.homepageData.substring(0, 200));
    }
  } else {
    console.log('⚠️  No homepageData found (sections not configured)\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📅 Timestamps:');
  console.log(`   Created: ${homepage.createdAt}`);
  console.log(`   Updated: ${homepage.updatedAt}`);
  console.log(`   Published: ${homepage.publishedAt || '(not published)'}\n`);

  console.log('💡 Tips:');
  console.log('   - Changes may take up to 10 seconds to appear (ISR cache)');
  console.log('   - Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)');
  console.log('   - Check that homepageData contains your latest changes\n');
}

checkHomepage()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
