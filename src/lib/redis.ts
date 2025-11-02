import { createClient, RedisClientType } from 'redis';
import { env, isFeatureEnabled } from './env';

/**
 * Cache key prefix for multi-site isolation
 * Automatically determined from environment
 */
let cachePrefix: string = '';

/**
 * Get cache prefix for this site
 */
function getCachePrefix(): string {
  if (cachePrefix) return cachePrefix;
  
  // Priority: CACHE_PREFIX > APP_NAME > domain from APP_URL
  if (env.CACHE_PREFIX) {
    cachePrefix = `${env.CACHE_PREFIX}:`;
  } else if (env.APP_NAME && env.APP_NAME !== 'My Store') {
    cachePrefix = `${env.APP_NAME.toLowerCase().replace(/[^a-z0-9]/g, '_')}:`;
  } else {
    // Extract domain from APP_URL as fallback
    try {
      const url = new URL(env.APP_URL);
      const domain = url.hostname.replace(/[^a-z0-9]/g, '_');
      cachePrefix = `${domain}:`;
    } catch {
      cachePrefix = 'site:';
    }
  }
  
  console.log(`🔧 Redis cache prefix: ${cachePrefix}`);
  return cachePrefix;
}

/**
 * Add prefix to cache key
 */
function prefixKey(key: string): string {
  return `${getCachePrefix()}${key}`;
}

/**
 * Redis client instance
 * Null if Redis is not configured
 */
let redisClient: RedisClientType | null = null;

/**
 * Initialize Redis connection
 * Only connects if REDIS_URL is provided
 */
export async function initRedis(): Promise<void> {
  if (!isFeatureEnabled('redis')) {
    console.log('ℹ️  Redis not configured, caching disabled');
    return;
  }

  try {
    // Parse Redis URL and add database selection if specified
    let redisUrl = env.REDIS_URL;
    
    // If REDIS_DB is specified, modify the URL to include database selection
    if (env.REDIS_DB && redisUrl) {
      const url = new URL(redisUrl);
      url.pathname = `/${env.REDIS_DB}`;
      redisUrl = url.toString();
      console.log(`🔧 Redis database: ${env.REDIS_DB}`);
    }
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000, // 5 second timeout
        reconnectStrategy: false, // Disable automatic reconnection
      },
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
      // Set client to null on error to prevent further attempts
      redisClient = null;
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    // Try to connect with timeout
    const connectPromise = redisClient.connect();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Redis connection timeout')), 5000);
    });

    await Promise.race([connectPromise, timeoutPromise]);
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    console.log('ℹ️  Continuing without Redis - caching disabled');
    redisClient = null;
  }
}

/**
 * Get Redis client
 * Returns null if Redis is not configured or connection failed
 */
export function getRedisClient(): RedisClientType | null {
  return redisClient;
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable(): boolean {
  return redisClient !== null && redisClient.isOpen;
}

/**
 * Cache helper functions
 */
export const cache = {
  /**
   * Get a value from cache
   * Returns null if Redis is not available or key doesn't exist
   */
  async get<T>(key: string): Promise<T | null> {
    if (!isRedisAvailable()) return null;

    try {
      const prefixedKey = prefixKey(key);
      const value = await redisClient!.get(prefixedKey);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Failed to get cache key ${key}:`, error);
      // Set client to null on error to prevent further attempts
      redisClient = null;
      return null;
    }
  },

  /**
   * Set a value in cache
   * TTL in seconds (default: 1 hour)
   */
  async set(key: string, value: unknown, ttl: number = 3600): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const prefixedKey = prefixKey(key);
      await redisClient!.setEx(prefixedKey, ttl, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set cache key ${key}:`, error);
      redisClient = null;
    }
  },

  /**
   * Delete a key from cache
   */
  async del(key: string): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const prefixedKey = prefixKey(key);
      await redisClient!.del(prefixedKey);
    } catch (error) {
      console.error(`Failed to delete cache key ${key}:`, error);
      redisClient = null;
    }
  },

  /**
   * Delete multiple keys matching a pattern
   */
  async delPattern(pattern: string): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const prefixedPattern = prefixKey(pattern);
      const keys = await redisClient!.keys(prefixedPattern);
      if (keys.length > 0) {
        await redisClient!.del(keys);
      }
    } catch (error) {
      console.error(`Failed to delete cache pattern ${pattern}:`, error);
      redisClient = null;
    }
  },

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      // Only clear keys with our prefix to avoid affecting other sites
      const prefixedPattern = prefixKey('*');
      const keys = await redisClient!.keys(prefixedPattern);
      if (keys.length > 0) {
        await redisClient!.del(keys);
        console.log(`🗑️  Cleared ${keys.length} cache keys with prefix: ${getCachePrefix()}`);
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
      redisClient = null;
    }
  },

  /**
   * Check if a key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!isRedisAvailable()) return false;

    try {
      const prefixedKey = prefixKey(key);
      const exists = await redisClient!.exists(prefixedKey);
      return exists === 1;
    } catch (error) {
      console.error(`Failed to check if cache key ${key} exists:`, error);
      redisClient = null;
      return false;
    }
  },

  /**
   * Get cache statistics for this site
   */
  async getStats(): Promise<{ keys: number; prefix: string; database: string | undefined }> {
    if (!isRedisAvailable()) return { keys: 0, prefix: getCachePrefix(), database: env.REDIS_DB };

    try {
      const prefixedPattern = prefixKey('*');
      const keys = await redisClient!.keys(prefixedPattern);
      return {
        keys: keys.length,
        prefix: getCachePrefix(),
        database: env.REDIS_DB || '0'
      };
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return { keys: 0, prefix: getCachePrefix(), database: env.REDIS_DB };
    }
  },
};

/**
 * Close Redis connection
 * Should be called on application shutdown
 */
export async function closeRedis(): Promise<void> {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  }
}