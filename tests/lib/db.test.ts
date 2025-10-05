import { db, testDatabaseConnection, disconnectDatabase } from '@/lib/db';

describe('Database', () => {
  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('db client', () => {
    it('should be defined', () => {
      expect(db).toBeDefined();
    });

    it('should have prisma methods', () => {
      expect(db.$connect).toBeDefined();
      expect(db.$disconnect).toBeDefined();
      expect(db.$transaction).toBeDefined();
    });
  });

  describe('testDatabaseConnection', () => {
    it('should return a boolean', async () => {
      const result = await testDatabaseConnection();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('disconnectDatabase', () => {
    it('should disconnect without errors', async () => {
      await expect(disconnectDatabase()).resolves.not.toThrow();
    });
  });
});