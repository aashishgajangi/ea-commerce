#!/usr/bin/env tsx

/**
 * Check Currency Setting
 * Verify what currency is stored in general settings
 */

import { getGeneralSettings } from '../src/lib/settings';

async function main() {
  console.log('\n🔍 Checking Currency Setting...\n');
  
  const settings = await getGeneralSettings();
  
  console.log('General Settings:');
  console.log('─────────────────');
  console.log('Currency:', settings.currency || '(not set)');
  console.log('Site Name:', settings.siteName);
  console.log('Language:', settings.language);
  console.log('Timezone:', settings.timezone);
  
  console.log('\n💡 Expected Currency Code:');
  console.log('   INR = Indian Rupee (₹)');
  console.log('   USD = US Dollar ($)');
  console.log('   EUR = Euro (€)');
  console.log('   GBP = British Pound (£)');
  
  if (settings.currency === 'INR') {
    console.log('\n✅ Currency is set to INR - should show ₹');
  } else if (settings.currency === 'USD') {
    console.log('\n⚠️  Currency is set to USD - showing $ symbol');
    console.log('   Change it to INR in /admin/setup or database');
  } else {
    console.log('\n⚠️  Currency:', settings.currency || 'NOT SET');
    console.log('   Please set currency to INR in /admin/setup');
  }
  
  console.log('\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
