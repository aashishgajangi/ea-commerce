import { createClient, RedisClientType } from 'redis';
import { env, isFeatureEnabled } from './env';

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
    redisClient = createClient({
      url: env.REDIS_URL,
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    await redisClient.connect();
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
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
      const value = await redisClient!.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Failed to get cache key ${key}:`, error);
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
      await redisClient!.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set cache key ${key}:`, error);
    }
  },

  /**
   * Delete a key from cache
   */
  async del(key: string): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      await redisClient!.del(key);
    } catch (error) {
      console.error(`Failed to delete cache key ${key}:`, error);
    }
  },

  /**
   * Delete multiple keys matching a pattern
   */
  async delPattern(pattern: string): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      const keys = await redisClient!.keys(pattern);
      if (keys.length > 0) {
        await redisClient!.del(keys);
      }
    } catch (error) {
      console.error(`Failed to delete cache pattern ${pattern}:`, error);
    }
  },

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    if (!isRedisAvailable()) return;

    try {
      await redisClient!.flushDb();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  },

  /**
   * Check if a key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!isRedisAvailable()) return false;

    try {
      const exists = await redisClient!.exists(key);
      return exists === 1;
    } catch (error) {
      console.error(`Failed to check if cache key ${key} exists:`, error);
      return false;
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