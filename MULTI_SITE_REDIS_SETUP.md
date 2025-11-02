# Multi-Site Redis Cache Configuration

This guide explains how to configure Redis caching for multiple websites using the same codebase and Redis server.

## Problem
When deploying the same codebase to multiple websites on the same server with shared Redis, cache keys collide causing mixed content between sites.

## Solution
Two approaches implemented:

### 1. Cache Key Prefixing (Recommended)
Uses the same Redis database but adds unique prefixes to all cache keys.

### 2. Redis Database Selection
Uses different Redis databases (0-15) for each site.

## Configuration

### Environment Variables

Add these to your `.env` file for each site:

#### Site 1 (.env)
```bash
# Basic Redis connection
REDIS_URL=redis://localhost:6379

# Option 1: Use cache prefix (recommended)
CACHE_PREFIX=site1
APP_NAME=Site One
APP_URL=https://site1.example.com

# Option 2: Use different Redis database
REDIS_DB=0
```

#### Site 2 (.env)
```bash
# Basic Redis connection  
REDIS_URL=redis://localhost:6379

# Option 1: Use cache prefix (recommended)
CACHE_PREFIX=site2
APP_NAME=Site Two
APP_URL=https://site2.example.com

# Option 2: Use different Redis database
REDIS_DB=1
```

## Cache Prefix Priority

The system automatically determines cache prefixes in this order:

1. **CACHE_PREFIX** (highest priority) - Manual override
2. **APP_NAME** - Sanitized app name (lowercase, underscores)
3. **APP_URL** - Domain extracted from URL
4. **"site:"** - Default fallback

## Examples

### Example 1: Manual Prefix
```bash
CACHE_PREFIX=ecommerce_main
# Results in cache keys: "ecommerce_main:settings:general"
```

### Example 2: App Name
```bash
APP_NAME=My Store
# Results in cache keys: "my_store:settings:general"
```

### Example 3: Domain from URL
```bash
APP_URL=https://shop.example.com
# Results in cache keys: "shop_example_com:settings:general"
```

### Example 4: Redis Database Selection
```bash
REDIS_URL=redis://localhost:6379
REDIS_DB=1
# Connects to Redis database 1 instead of default 0
```

## Verification

### Check Cache Prefix
When the app starts, you'll see:
```
🔧 Redis cache prefix: site1:
✅ Redis connected successfully
```

### Check Redis Database
When using REDIS_DB:
```
🔧 Redis database: 1
✅ Redis connected successfully
```

### View Cache Keys in Redis
```bash
# Connect to Redis CLI
redis-cli

# View all keys for site1
KEYS site1:*

# View all keys for site2  
KEYS site2:*

# Switch to database 1
SELECT 1
KEYS *
```

## Cache Statistics

The system provides cache stats via the admin panel or API:

```typescript
import { cache } from '@/lib/redis';

const stats = await cache.getStats();
console.log(stats);
// Output: { keys: 15, prefix: "site1:", database: "0" }
```

## Cache Operations

All cache operations are automatically prefixed:

```typescript
// Your code (no changes needed)
await cache.set('settings:general', data);
await cache.get('settings:general');

// Actual Redis keys
// Site 1: "site1:settings:general"
// Site 2: "site2:settings:general"
```

## Cache Clearing

Cache clearing only affects the current site:

```typescript
await cache.clear();
// Only clears keys with current site's prefix
// Site 1: Clears "site1:*" keys only
// Site 2: Clears "site2:*" keys only
```

## Production Deployment

### Method 1: Cache Prefixing (Recommended)
```bash
# Site 1 deployment
REDIS_URL=redis://localhost:6379
CACHE_PREFIX=site1

# Site 2 deployment  
REDIS_URL=redis://localhost:6379
CACHE_PREFIX=site2
```

### Method 2: Database Selection
```bash
# Site 1 deployment
REDIS_URL=redis://localhost:6379
REDIS_DB=0

# Site 2 deployment
REDIS_URL=redis://localhost:6379  
REDIS_DB=1
```

### Method 3: Combined Approach
```bash
# Site 1 (main site)
REDIS_URL=redis://localhost:6379
REDIS_DB=0
CACHE_PREFIX=main

# Site 2 (staging)
REDIS_URL=redis://localhost:6379
REDIS_DB=1  
CACHE_PREFIX=staging
```

## Benefits

✅ **Complete Isolation** - No cache key collisions between sites
✅ **Zero Code Changes** - Existing cache code works unchanged
✅ **Flexible Configuration** - Multiple deployment strategies
✅ **Easy Debugging** - Clear cache key identification
✅ **Performance** - Same Redis performance, isolated data

## Troubleshooting

### Mixed Content Issues
If you still see mixed content:

1. **Clear all caches**:
   ```bash
   # In each site's admin panel
   /admin/cache -> Clear All Cache
   ```

2. **Verify environment variables**:
   ```bash
   # Check your .env files have different prefixes
   echo $CACHE_PREFIX
   ```

3. **Check Redis keys**:
   ```bash
   redis-cli
   KEYS *
   # Should see prefixed keys like "site1:*" and "site2:*"
   ```

### Performance Issues
- Use cache prefixing instead of database selection for better performance
- Monitor Redis memory usage with multiple sites
- Consider Redis clustering for high traffic

## Migration from Shared Cache

If you're migrating from shared cache:

1. **Add prefixes** to environment variables
2. **Clear all cache** in Redis: `redis-cli FLUSHALL`
3. **Restart both sites** to rebuild cache with prefixes
4. **Verify separation** using Redis CLI

The system will automatically start using prefixed keys without any code changes.
