#!/usr/bin/env tsx
/**
 * Verification script to test database and Redis connectivity
 * Run with: npx tsx scripts/verify-setup.ts
 */

import { db, testDatabaseConnection, disconnectDatabase } from '../src/lib/db';
import { initRedis, isRedisAvailable, cache, closeRedis } from '../src/lib/redis';
import { env, isFeatureEnabled } from '../src/lib/env';

async function verifyEnvironment() {
  console.log('\n🔍 Verifying Environment Variables...\n');
  
  console.log('✅ Required variables:');
  console.log(`   DATABASE_URL: ${env.DATABASE_URL ? '✓ Set' : '✗ Missing'}`);
  console.log(`   APP_NAME: ${env.APP_NAME}`);
  console.log(`   APP_URL: ${env.APP_URL}`);
  console.log(`   NODE_ENV: ${env.NODE_ENV}`);
  
  console.log('\n📦 Optional features:');
  console.log(`   Redis: ${isFeatureEnabled('redis') ? '✓ Enabled' : '✗ Disabled'}`);
  console.log(`   Email: ${isFeatureEnabled('email') ? '✓ Enabled' : '✗ Disabled'}`);
  console.log(`   Stripe: ${isFeatureEnabled('stripe') ? '✓ Enabled' : '✗ Disabled'}`);
  console.log(`   Razorpay: ${isFeatureEnabled('razorpay') ? '✓ Enabled' : '✗ Disabled'}`);
}

async function verifyDatabase() {
  console.log('\n🔍 Verifying PostgreSQL Connection...\n');
  
  try {
    const isConnected = await testDatabaseConnection();
    
    if (isConnected) {
      console.log('✅ PostgreSQL: Connected successfully');
      
      // Test basic query
      const result = await db.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log(`   Tables in database: ${result[0].count.toString()}`);
      
      // Check if our models exist
      const tables = await db.$queryRaw<Array<{ tablename: string }>>`
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
      `;
      
      const tableNames = tables.map(t => t.tablename);
      console.log('\n   Available tables:');
      if (tableNames.length > 0) {
        tableNames.forEach(name => console.log(`   - ${name}`));
      } else {
        console.log('   ⚠️  No tables found. Run: npm run db:push');
      }
      
      return true;
    } else {
      console.log('❌ PostgreSQL: Connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ PostgreSQL: Error -', error instanceof Error ? error.message : error);
    return false;
  }
}

async function verifyRedis() {
  console.log('\n🔍 Verifying Redis Connection...\n');
  
  if (!isFeatureEnabled('redis')) {
    console.log('⚠️  Redis: Not configured (optional)');
    return true;
  }
  
  try {
    await initRedis();
    
    if (isRedisAvailable()) {
      console.log('✅ Redis: Connected successfully');
      
      // Test cache operations
      const testKey = 'verify:test';
      const testValue = { timestamp: Date.now(), test: true };
      
      await cache.set(testKey, testValue, 10);
      const retrieved = await cache.get(testKey);
      
      if (retrieved && JSON.stringify(retrieved) === JSON.stringify(testValue)) {
        console.log('✅ Redis: Cache operations working');
      } else {
        console.log('⚠️  Redis: Cache operations may have issues');
      }
      
      await cache.del(testKey);
      return true;
    } else {
      console.log('❌ Redis: Connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Redis: Error -', error instanceof Error ? error.message : error);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  E-Commerce Platform - Setup Verification');
  console.log('═══════════════════════════════════════════════════');
  
  let allPassed = true;
  
  // Verify environment
  try {
    await verifyEnvironment();
  } catch (error) {
    console.error('\n❌ Environment verification failed:', error);
    allPassed = false;
  }
  
  // Verify database
  const dbPassed = await verifyDatabase();
  if (!dbPassed) allPassed = false;
  
  // Verify Redis
  const redisPassed = await verifyRedis();
  if (!redisPassed && isFeatureEnabled('redis')) allPassed = false;
  
  // Cleanup
  await disconnectDatabase();
  await closeRedis();
  
  console.log('\n═══════════════════════════════════════════════════');
  if (allPassed) {
    console.log('✅ All verifications passed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Run migrations: npm run db:push');
    console.log('   2. Start development: npm run dev');
  } else {
    console.log('❌ Some verifications failed. Please check the errors above.');
    console.log('\n💡 Common issues:');
    console.log('   - PostgreSQL not running: Start your database server');
    console.log('   - Wrong credentials: Check your .env file');
    console.log('   - Database not created: Create the database first');
    process.exit(1);
  }
  console.log('═══════════════════════════════════════════════════\n');
}

main().catch(console.error);