import { db } from '../src/lib/db';

async function checkHomepage() {
  console.log('\n🏠 Checking Homepage...\n');

  // Find homepage
  const homepage = await db.page.findFirst({
    where: {
      OR: [
        { slug: '' },
        { pageType: 'homepage' },
        { isHomepage: true },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      pageType: true,
      isHomepage: true,
      status: true,
      blocks: true,
    },
  });

  if (!homepage) {
    console.log('❌ NO HOMEPAGE FOUND!\n');
    console.log('💡 To fix: Go to /admin/pages and create a new page');
    console.log('   - Use "Homepage" template');
    console.log('   - Or set pageType to "homepage"');
    console.log('   - Slug should be empty\n');
  } else {
    console.log('✅ Homepage found!');
    console.log(`   ID: ${homepage.id}`);
    console.log(`   Title: ${homepage.title}`);
    console.log(`   Slug: "${homepage.slug}"`);
    console.log(`   PageType: ${homepage.pageType || 'none'}`);
    console.log(`   IsHomepage: ${homepage.isHomepage}`);
    console.log(`   Status: ${homepage.status}\n`);

    // Parse blocks
    if (homepage.blocks) {
      try {
        const blocks = typeof homepage.blocks === 'string' 
          ? JSON.parse(homepage.blocks) 
          : homepage.blocks;

        console.log(`📦 Blocks: ${blocks.length} total\n`);

        blocks.forEach((block: any, i: number) => {
          console.log(`${i + 1}. Type: ${block.type}`);
          console.log(`   ID: ${block.id}`);
          console.log(`   Enabled: ${block.enabled}`);
          if (block.data?.title) {
            console.log(`   Title: "${block.data.title}"`);
          }
          if (block.type === 'products_grid') {
            console.log(`   ⭐ This is the Products Grid block!`);
          }
          console.log('');
        });
      } catch (e) {
        console.log('❌ Failed to parse blocks:', e);
      }
    } else {
      console.log('⚠️  No blocks found!\n');
      console.log('💡 To add blocks:');
      console.log('   1. Go to /admin/pages');
      console.log('   2. Edit the homepage');
      console.log('   3. Add "Products Grid" block');
      console.log('   4. Save\n');
    }
  }

  await db.$disconnect();
}

checkHomepage().catch(console.error);
