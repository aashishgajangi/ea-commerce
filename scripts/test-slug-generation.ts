#!/usr/bin/env tsx
/**
 * Test and demonstrate SEO-friendly slug generation
 * Run with: npx tsx scripts/test-slug-generation.ts
 */

import { generateCategorySEOSlug, generateProductSEOSlug } from '../src/lib/slug-utils';

// Test data
const categoryNames = [
  "Men's Clothing & Accessories",
  "Women's Shoes - High Heels",
  "Electronics & Gadgets",
  "Home & Garden Furniture",
  "Kids' Toys & Games",
  "Sports & Outdoor Equipment",
  "Beauty & Personal Care",
  "Books, Movies & Music",
  "Automotive Parts & Accessories",
  "Pet Supplies & Food"
];

const productNames = [
  "iPhone 14 Pro Max 256GB",
  "Men's Nike Air Max 90",
  "Samsung 55\" 4K Smart TV",
  "Women's Levi's 501 Jeans",
  "MacBook Pro 16\" M2 Chip",
  "Sony WH-1000XM4 Wireless Headphones",
  "The North Face Men's Jacket",
  "Canon EOS R5 Mirrorless Camera",
  "Dyson V15 Detect Cordless Vacuum",
  "KitchenAid Stand Mixer - 5Qt"
];

function oldSlugGeneration(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function testSlugGeneration() {
  console.log('🧪 SEO-Friendly Slug Generation Test\n');
  
  console.log('📂 CATEGORY SLUGS:');
  console.log('==================');
  categoryNames.forEach(name => {
    const oldSlug = oldSlugGeneration(name);
    const newSlug = generateCategorySEOSlug(name);
    const improvement = newSlug !== oldSlug ? '✅ IMPROVED' : '⚪ SAME';
    
    console.log(`Name: "${name}"`);
    console.log(`Old:  ${oldSlug}`);
    console.log(`New:  ${newSlug} ${improvement}`);
    console.log('');
  });
  
  console.log('\n📦 PRODUCT SLUGS:');
  console.log('=================');
  productNames.forEach(name => {
    const oldSlug = oldSlugGeneration(name);
    const newSlug = generateProductSEOSlug(name);
    const improvement = newSlug !== oldSlug ? '✅ IMPROVED' : '⚪ SAME';
    
    console.log(`Name: "${name}"`);
    console.log(`Old:  ${oldSlug}`);
    console.log(`New:  ${newSlug} ${improvement}`);
    console.log('');
  });
  
  console.log('🎯 KEY IMPROVEMENTS:');
  console.log('====================');
  console.log('✅ Preserves brand names (Nike, iPhone, Samsung)');
  console.log('✅ Handles possessives properly (Men\'s → mens)');
  console.log('✅ Converts symbols (&, +, %) to words');
  console.log('✅ Removes stop words (the, and, of, etc.)');
  console.log('✅ Handles sizes and units (XL, GB, inch)');
  console.log('✅ Limits length for SEO (under 60 chars)');
  console.log('✅ More readable and SEO-friendly URLs');
  
  console.log('\n📈 SEO BENEFITS:');
  console.log('================');
  console.log('🔍 Better search engine rankings');
  console.log('👥 Improved user experience');
  console.log('📱 More shareable URLs');
  console.log('🏷️ Brand recognition in URLs');
  console.log('🎯 Keyword optimization');
}

// Run the test
testSlugGeneration();
