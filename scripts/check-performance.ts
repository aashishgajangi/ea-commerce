#!/usr/bin/env tsx

/**
 * Performance Check Script
 * Tests database query performance and cache effectiveness
 * 
 * Usage: npm run perf:check
 */

import { db } from '../src/lib/db';
import { cache } from '../src/lib/redis';
import { getAllSettings, getHeaderSettings } from '../src/lib/settings';
import { getMenuByLocation } from '../src/lib/menus';
import { getProducts } from '../src/lib/products';

async function measureQuery<T>(name: string, fn: () => Promise<T>): Promise<number> {
  const start = performance.now();
  await fn();
  const duration = performance.now() - start;
  return duration;
}

async function main() {
  console.log('\n🔍 Performance Check - Database & Cache Analysis\n');
  console.log('═══════════════════════════════════════════════════\n');

  // Test 1: Settings Performance
  console.log('📊 Test 1: Settings Performance');
  console.log('─────────────────────────────────');
  
  // Clear cache first
  await cache.delPattern('settings:*');
  
  const settingsFirstRun = await measureQuery('getAllSettings (uncached)', getAllSettings);
  console.log(`⏱️  First run (DB): ${settingsFirstRun.toFixed(2)}ms`);
  
  const settingsSecondRun = await measureQuery('getAllSettings (cached)', getAllSettings);
  console.log(`⚡ Second run (cache): ${settingsSecondRun.toFixed(2)}ms`);
  
  const improvement = ((settingsFirstRun - settingsSecondRun) / settingsFirstRun * 100).toFixed(1);
  console.log(`📈 Cache improvement: ${improvement}% faster\n`);

  // Test 2: Menu Performance
  console.log('📊 Test 2: Menu Performance');
  console.log('─────────────────────────────────');
  
  await cache.delPattern('menu:*');
  
  const menuFirstRun = await measureQuery('getMenuByLocation (uncached)', 
    () => getMenuByLocation('header')
  );
  console.log(`⏱️  First run (DB): ${menuFirstRun.toFixed(2)}ms`);
  
  const menuSecondRun = await measureQuery('getMenuByLocation (cached)', 
    () => getMenuByLocation('header')
  );
  console.log(`⚡ Second run (cache): ${menuSecondRun.toFixed(2)}ms`);
  
  const menuImprovement = ((menuFirstRun - menuSecondRun) / menuFirstRun * 100).toFixed(1);
  console.log(`📈 Cache improvement: ${menuImprovement}% faster\n`);

  // Test 3: Product Query Performance
  console.log('📊 Test 3: Product Query Performance');
  console.log('─────────────────────────────────────');
  
  const productsTime = await measureQuery('getProducts (20 items)', 
    () => getProducts({ limit: 20, status: 'published', isActive: true })
  );
  console.log(`⏱️  Query time: ${productsTime.toFixed(2)}ms`);
  
  if (productsTime > 500) {
    console.log(`⚠️  WARNING: Product queries are slow. Consider adding more indexes.`);
  } else if (productsTime > 200) {
    console.log(`⚡ Performance is acceptable but could be improved.`);
  } else {
    console.log(`✅ Excellent performance!`);
  }
  console.log('');

  // Test 4: Individual Setting Fetch
  console.log('📊 Test 4: Individual Setting Performance');
  console.log('────────────────────────────────────────');
  
  await cache.delPattern('settings:*');
  
  const headerFirstRun = await measureQuery('getHeaderSettings (uncached)', getHeaderSettings);
  console.log(`⏱️  First run (DB): ${headerFirstRun.toFixed(2)}ms`);
  
  const headerSecondRun = await measureQuery('getHeaderSettings (cached)', getHeaderSettings);
  console.log(`⚡ Second run (cache): ${headerSecondRun.toFixed(2)}ms\n`);

  // Test 5: Database Connection
  console.log('📊 Test 5: Database Connection Health');
  console.log('─────────────────────────────────────');
  
  try {
    const dbStart = performance.now();
    await db.$queryRaw`SELECT 1`;
    const dbDuration = performance.now() - dbStart;
    console.log(`⏱️  Simple query: ${dbDuration.toFixed(2)}ms`);
    
    if (dbDuration > 50) {
      console.log(`⚠️  WARNING: Database connection is slow`);
    } else {
      console.log(`✅ Database connection is healthy`);
    }
  } catch (error) {
    console.log(`❌ Database connection error: ${error}`);
  }
  console.log('');

  // Test 6: Cache Connection
  console.log('📊 Test 6: Cache Connection Health');
  console.log('──────────────────────────────────');
  
  try {
    const cacheStart = performance.now();
    await cache.set('test:ping', 'pong', 10);
    const result = await cache.get('test:ping');
    const cacheDuration = performance.now() - cacheStart;
    
    if (result === 'pong') {
      console.log(`⏱️  Cache roundtrip: ${cacheDuration.toFixed(2)}ms`);
      console.log(`✅ Redis cache is working`);
    } else {
      console.log(`⚠️  Cache is not functioning correctly`);
    }
    
    await cache.del('test:ping');
  } catch {
    console.log(`⚠️  Redis not available - caching disabled`);
  }
  console.log('');

  // Summary
  console.log('═══════════════════════════════════════════════════');
  console.log('📋 Performance Summary');
  console.log('═══════════════════════════════════════════════════');
  
  const avgCacheImprovement = ((parseFloat(improvement) + parseFloat(menuImprovement)) / 2).toFixed(1);
  console.log(`✅ Average cache improvement: ${avgCacheImprovement}%`);
  
  if (productsTime < 200) {
    console.log(`✅ Product queries: Excellent`);
  } else if (productsTime < 500) {
    console.log(`⚡ Product queries: Good`);
  } else {
    console.log(`⚠️  Product queries: Needs optimization`);
  }
  
  console.log('\n💡 Recommendations:');
  console.log('   1. Ensure Redis is running for optimal performance');
  console.log('   2. Run `npm run db:optimize` to add database indexes');
  console.log('   3. Monitor slow queries in production logs');
  console.log('   4. Consider connection pooling for high traffic\n');

  await db.$disconnect();
}

main()
  .then(() => {
    console.log('✨ Performance check complete!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
