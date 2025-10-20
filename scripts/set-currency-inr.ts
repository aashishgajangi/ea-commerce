#!/usr/bin/env tsx

/**
 * Set Currency to INR (Indian Rupee)
 */

import { db } from '../src/lib/db';
import { setSetting } from '../src/lib/settings';

async function main() {
  console.log('\n💱 Setting Currency to INR (Indian Rupee)...\n');
  
  try {
    // Update currency to INR
    await setSetting('general', {
      siteName: 'My Store',
      tagline: 'Your one-stop shop',
      description: 'Best products at best prices',
      timezone: 'Asia/Kolkata',
      currency: 'INR', // ← Set to INR
      language: 'en',
    }, 'general');
    
    console.log('✅ Currency updated to INR');
    console.log('');
    console.log('Expected symbols:');
    console.log('  INR = ₹ (Indian Rupee)');
    console.log('');
    console.log('🔄 Now restart your dev server:');
    console.log('   npm run dev');
    console.log('');
    console.log('Then refresh the product page - should show ₹ instead of $');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
