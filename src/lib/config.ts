import { db } from './db';
import { cache } from './redis';

/**
 * Configuration cache key prefix
 */
const CONFIG_CACHE_PREFIX = 'config:';

/**
 * Configuration cache TTL (24 hours)
 */
const CONFIG_CACHE_TTL = 86400;

/**
 * Configuration service
 * Manages application configuration with Redis caching
 */
export const config = {
  /**
   * Get a configuration value by key
   * First checks Redis cache, then database
   */
  async get<T = string>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      // Try cache first
      const cacheKey = `${CONFIG_CACHE_PREFIX}${key}`;
      const cached = await cache.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Fallback to database
      const config = await db.configuration.findUnique({
        where: { key },
      });

      if (!config) {
        return defaultValue ?? null;
      }

      // Parse JSON if value is a valid JSON string
      let value: T;
      try {
        value = JSON.parse(config.value) as T;
      } catch {
        value = config.value as T;
      }

      // Cache for future requests
      await cache.set(cacheKey, value, CONFIG_CACHE_TTL);

      return value;
    } catch (error) {
      console.error(`Failed to get config ${key}:`, error);
      return defaultValue ?? null;
    }
  },

  /**
   * Set a configuration value
   * Updates database and invalidates cache
   */
  async set(key: string, value: unknown): Promise<void> {
    try {
      const stringValue = typeof value === 'string' 
        ? value 
        : JSON.stringify(value);

      await db.configuration.upsert({
        where: { key },
        create: { key, value: stringValue },
        update: { value: stringValue },
      });

      // Invalidate cache
      const cacheKey = `${CONFIG_CACHE_PREFIX}${key}`;
      await cache.del(cacheKey);
    } catch (error) {
      console.error(`Failed to set config ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get multiple configuration values
   */
  async getMany<T extends Record<string, unknown>>(keys: string[]): Promise<Partial<T>> {
    const result: Partial<T> = {};

    await Promise.all(
      keys.map(async (key) => {
        const value = await this.get(key);
        if (value !== null) {
          result[key as keyof T] = value as T[keyof T];
        }
      })
    );

    return result;
  },

  /**
   * Set multiple configuration values
   */
  async setMany(configs: Record<string, unknown>): Promise<void> {
    await Promise.all(
      Object.entries(configs).map(([key, value]) => this.set(key, value))
    );
  },

  /**
   * Delete a configuration value
   */
  async delete(key: string): Promise<void> {
    try {
      await db.configuration.delete({
        where: { key },
      });

      // Invalidate cache
      const cacheKey = `${CONFIG_CACHE_PREFIX}${key}`;
      await cache.del(cacheKey);
    } catch (error) {
      console.error(`Failed to delete config ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get all configuration values
   */
  async getAll<T extends Record<string, unknown>>(): Promise<T> {
    try {
      const configs = await db.configuration.findMany();
      const result: Record<string, unknown> = {};

      for (const config of configs) {
        try {
          result[config.key] = JSON.parse(config.value);
        } catch {
          result[config.key] = config.value;
        }
      }

      return result as T;
    } catch (error) {
      console.error('Failed to get all configs:', error);
      return {} as T;
    }
  },

  /**
   * Clear all configuration cache
   */
  async clearCache(): Promise<void> {
    await cache.delPattern(`${CONFIG_CACHE_PREFIX}*`);
  },

  /**
   * Check if setup is complete
   */
  async isSetupComplete(): Promise<boolean> {
    const setupComplete = await this.get<boolean>('setup_complete');
    return setupComplete === true;
  },

  /**
   * Mark setup as complete
   */
  async markSetupComplete(): Promise<void> {
    await this.set('setup_complete', true);
  },
};

/**
 * Common configuration keys
 */
export const ConfigKeys = {
  SETUP_COMPLETE: 'setup_complete',
  SITE_NAME: 'site_name',
  SITE_DESCRIPTION: 'site_description',
  SITE_LOGO: 'site_logo',
  SITE_FAVICON: 'site_favicon',
  CONTACT_EMAIL: 'contact_email',
  CONTACT_PHONE: 'contact_phone',
  SOCIAL_FACEBOOK: 'social_facebook',
  SOCIAL_TWITTER: 'social_twitter',
  SOCIAL_INSTAGRAM: 'social_instagram',
  CURRENCY: 'currency',
  CURRENCY_SYMBOL: 'currency_symbol',
  TAX_RATE: 'tax_rate',
  SHIPPING_ENABLED: 'shipping_enabled',
  PAYMENT_METHODS: 'payment_methods',
} as const;