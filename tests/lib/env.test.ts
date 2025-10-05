import { isFeatureEnabled } from '@/lib/env';

describe('Environment', () => {
  describe('isFeatureEnabled', () => {
    it('should return boolean for redis feature', () => {
      const result = isFeatureEnabled('redis');
      expect(typeof result).toBe('boolean');
    });

    it('should return boolean for email feature', () => {
      const result = isFeatureEnabled('email');
      expect(typeof result).toBe('boolean');
    });

    it('should return boolean for cloudStorage feature', () => {
      const result = isFeatureEnabled('cloudStorage');
      expect(typeof result).toBe('boolean');
    });

    it('should return boolean for stripe feature', () => {
      const result = isFeatureEnabled('stripe');
      expect(typeof result).toBe('boolean');
    });

    it('should return false for unknown features', () => {
      const result = isFeatureEnabled('unknown_feature');
      expect(result).toBe(false);
    });
  });
});