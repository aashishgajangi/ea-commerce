import { config, ConfigKeys } from '@/lib/config';

describe('Configuration', () => {
  describe('config object', () => {
    it('should have required methods', () => {
      expect(config.get).toBeDefined();
      expect(config.set).toBeDefined();
      expect(config.getMany).toBeDefined();
      expect(config.setMany).toBeDefined();
      expect(config.delete).toBeDefined();
      expect(config.getAll).toBeDefined();
      expect(config.clearCache).toBeDefined();
      expect(config.isSetupComplete).toBeDefined();
      expect(config.markSetupComplete).toBeDefined();
    });
  });

  describe('ConfigKeys', () => {
    it('should have common configuration keys', () => {
      expect(ConfigKeys.SETUP_COMPLETE).toBe('setup_complete');
      expect(ConfigKeys.SITE_NAME).toBe('site_name');
      expect(ConfigKeys.SITE_DESCRIPTION).toBe('site_description');
      expect(ConfigKeys.CURRENCY).toBe('currency');
    });
  });

  describe('config methods', () => {
    it('get should handle missing keys gracefully', async () => {
      const result = await config.get('non_existent_key', 'default');
      expect(result).toBeDefined();
    });

    it('isSetupComplete should return a boolean', async () => {
      const result = await config.isSetupComplete();
      expect(typeof result).toBe('boolean');
    });

    it('getAll should return an object', async () => {
      const result = await config.getAll();
      expect(typeof result).toBe('object');
    });
  });
});