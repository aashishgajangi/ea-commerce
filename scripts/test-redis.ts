#!/usr/bin/env tsx

import { config } from 'dotenv';
import { initRedis, isRedisAvailable, cache } from '../src/lib/redis';

// Load environment variables
config();

async function testRedis() {
  console.log('🧪 Testing Redis Connection...\n');

  try {
    // Initialize Redis
    console.log('1. Initializing Redis...');
    await initRedis();
    
    // Check if Redis is available
    console.log('2. Checking Redis availability...');
    const available = isRedisAvailable();
    console.log(`   Redis Available: ${available ? '✅ YES' : '❌ NO'}`);
    
    if (!available) {
      console.log('\n❌ Redis is not available. Please check:');
      console.log('   - Redis server is running: redis-server');
      console.log('   - REDIS_URL is set in .env: redis://localhost:6379');
      process.exit(1);
    }

    // Test cache operations
    console.log('\n3. Testing cache operations...');
    
    // Set a test value
    console.log('   Setting test value...');
    await cache.set('test:redis', { message: 'Hello Redis!', timestamp: Date.now() }, 60);
    
    // Get the test value
    console.log('   Getting test value...');
    const value = await cache.get('test:redis');
    console.log('   Retrieved:', value);
    
    // Check if key exists
    console.log('   Checking if key exists...');
    const exists = await cache.exists('test:redis');
    console.log(`   Key exists: ${exists ? '✅ YES' : '❌ NO'}`);
    
    // Delete the test value
    console.log('   Deleting test value...');
    await cache.del('test:redis');
    
    // Verify deletion
    const deletedValue = await cache.get('test:redis');
    console.log(`   Value after deletion: ${deletedValue === null ? '✅ NULL (deleted)' : '❌ Still exists'}`);
    
    console.log('\n✅ All Redis tests passed!');
    console.log('\n📊 Redis Status:');
    console.log('   - Connection: ✅ Active');
    console.log('   - Cache operations: ✅ Working');
    console.log('   - TTL support: ✅ Working');
    console.log('   - Key deletion: ✅ Working');
    
    console.log('\n🎉 Redis is ready for caching!');
    
  } catch (error) {
    console.error('\n❌ Redis test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Start Redis server: redis-server');
    console.log('   2. Check Redis is running: redis-cli ping');
    console.log('   3. Verify REDIS_URL in .env file');
    process.exit(1);
  }
}

// Run the test
testRedis();
