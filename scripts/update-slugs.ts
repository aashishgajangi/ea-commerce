#!/usr/bin/env tsx
/**
 * Update existing category and product slugs to be SEO-friendly
 * Run with: npx tsx scripts/update-slugs.ts
 */

import { db } from '../src/lib/db';
import { generateCategorySEOSlug, generateProductSEOSlug } from '../src/lib/slug-utils';

interface SlugUpdate {
  id: string;
  name: string;
  oldSlug: string;
  newSlug: string;
}

async function updateCategorySlugs() {
  console.log('🔄 Updating category slugs...');
  
  const categories = await db.category.findMany({
    select: { id: true, name: true, slug: true }
  });

  const updates: SlugUpdate[] = [];
  const slugMap = new Map<string, number>(); // Track slug usage for uniqueness

  for (const category of categories) {
    const newSlug = generateCategorySEOSlug(category.name);
    
    // Ensure uniqueness
    let uniqueSlug = newSlug;
    let counter = 1;
    while (slugMap.has(uniqueSlug) || 
           await db.category.findFirst({ 
             where: { slug: uniqueSlug, id: { not: category.id } } 
           })) {
      uniqueSlug = `${newSlug}-${counter}`;
      counter++;
    }
    
    slugMap.set(uniqueSlug, 1);
    
    if (category.slug !== uniqueSlug) {
      updates.push({
        id: category.id,
        name: category.name,
        oldSlug: category.slug,
        newSlug: uniqueSlug
      });
    }
  }

  console.log(`📊 Found ${updates.length} categories to update:`);
  updates.forEach(update => {
    console.log(`  "${update.name}": "${update.oldSlug}" → "${update.newSlug}"`);
  });

  if (updates.length > 0) {
    console.log('💾 Updating category slugs in database...');
    
    for (const update of updates) {
      await db.category.update({
        where: { id: update.id },
        data: { slug: update.newSlug }
      });
    }
    
    console.log(`✅ Updated ${updates.length} category slugs`);
  } else {
    console.log('✅ All category slugs are already SEO-friendly');
  }
}

async function updateProductSlugs() {
  console.log('\n🔄 Updating product slugs...');
  
  const products = await db.product.findMany({
    select: { id: true, name: true, slug: true }
  });

  const updates: SlugUpdate[] = [];
  const slugMap = new Map<string, number>(); // Track slug usage for uniqueness

  for (const product of products) {
    const newSlug = generateProductSEOSlug(product.name);
    
    // Ensure uniqueness
    let uniqueSlug = newSlug;
    let counter = 1;
    while (slugMap.has(uniqueSlug) || 
           await db.product.findFirst({ 
             where: { slug: uniqueSlug, id: { not: product.id } } 
           })) {
      uniqueSlug = `${newSlug}-${counter}`;
      counter++;
    }
    
    slugMap.set(uniqueSlug, 1);
    
    if (product.slug !== uniqueSlug) {
      updates.push({
        id: product.id,
        name: product.name,
        oldSlug: product.slug,
        newSlug: uniqueSlug
      });
    }
  }

  console.log(`📊 Found ${updates.length} products to update:`);
  updates.slice(0, 10).forEach(update => { // Show first 10
    console.log(`  "${update.name}": "${update.oldSlug}" → "${update.newSlug}"`);
  });
  if (updates.length > 10) {
    console.log(`  ... and ${updates.length - 10} more`);
  }

  if (updates.length > 0) {
    console.log('💾 Updating product slugs in database...');
    
    for (const update of updates) {
      await db.product.update({
        where: { id: update.id },
        data: { slug: update.newSlug }
      });
    }
    
    console.log(`✅ Updated ${updates.length} product slugs`);
  } else {
    console.log('✅ All product slugs are already SEO-friendly');
  }
}

async function main() {
  console.log('🚀 Starting SEO-friendly slug update...\n');
  
  try {
    await updateCategorySlugs();
    await updateProductSlugs();
    
    console.log('\n🎉 Slug update completed successfully!');
    console.log('\n📈 SEO Benefits:');
    console.log('  ✅ More readable URLs');
    console.log('  ✅ Better search engine rankings');
    console.log('  ✅ Improved user experience');
    console.log('  ✅ Brand name preservation');
    console.log('  ✅ Stop word removal');
    
  } catch (error) {
    console.error('❌ Error updating slugs:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { updateCategorySlugs, updateProductSlugs };
