import { db } from '../src/lib/db';

async function checkFeaturedProducts() {
  console.log('\n🔍 Checking Featured Products...\n');

  // Check total products
  const totalProducts = await db.product.count();
  console.log(`📦 Total products: ${totalProducts}`);

  // Check published products
  const publishedProducts = await db.product.count({
    where: { status: 'published' },
  });
  console.log(`✅ Published products: ${publishedProducts}`);

  // Check featured products
  const featuredProducts = await db.product.count({
    where: {
      status: 'published',
      isFeatured: true,
    },
  });
  console.log(`⭐ Featured products: ${featuredProducts}`);

  if (featuredProducts === 0) {
    console.log('\n⚠️  NO FEATURED PRODUCTS FOUND!');
    console.log('\n💡 To fix:');
    console.log('1. Go to /admin/products');
    console.log('2. Edit a product');
    console.log('3. Check "Featured" checkbox');
    console.log('4. Set status to "Published"');
    console.log('5. Save');
    console.log('\nOr run: npm run seed:featured-products\n');
  } else {
    console.log(`\n✅ ${featuredProducts} featured products ready to display!\n`);
    
    // Show first 3
    const products = await db.product.findMany({
      where: {
        status: 'published',
        isFeatured: true,
      },
      take: 3,
      select: {
        id: true,
        name: true,
        price: true,
        isFeatured: true,
        status: true,
      },
    });

    console.log('First 3 featured products:');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - $${p.price} (Featured: ${p.isFeatured}, Status: ${p.status})`);
    });
    console.log('');
  }

  await db.$disconnect();
}

checkFeaturedProducts().catch(console.error);
