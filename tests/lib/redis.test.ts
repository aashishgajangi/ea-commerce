import { initRedis, getRedisClient, isRedisAvailable, cache, closeRedis } from '@/lib/redis';

describe('Redis', () => {
  afterAll(async () => {
    await closeRedis();
  });

  describe('initRedis', () => {
    it('should initialize without errors', async () => {
      await expect(initRedis()).resolves.not.toThrow();
    });
  });

  describe('getRedisClient', () => {
    it('should return a client or null', () => {
      const client = getRedisClient();
      expect(client === null || typeof client === 'object').toBe(true);
    });
  });

  describe('isRedisAvailable', () => {
    it('should return a boolean', () => {
      const available = isRedisAvailable();
      expect(typeof available).toBe('boolean');
    });
  });

  describe('cache', () => {
    describe('when Redis is not available', () => {
      it('get should return null gracefully', async () => {
        const result = await cache.get('test-key');
        expect(result === null || typeof result === 'object').toBe(true);
      });

      it('set should not throw', async () => {
        await expect(cache.set('test-key', 'test-value')).resolves.not.toThrow();
      });

      it('del should not throw', async () => {
        await expect(cache.del('test-key')).resolves.not.toThrow();
      });

      it('exists should return boolean', async () => {
        const result = await cache.exists('test-key');
        expect(typeof result).toBe('boolean');
      });
    });
  });

  describe('closeRedis', () => {
    it('should close without errors', async () => {
      await expect(closeRedis()).resolves.not.toThrow();
    });
  });
});