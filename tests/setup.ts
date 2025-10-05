// Test setup file
// Add any global test configuration here

// Setup test environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', writable: true });
process.env.APP_NAME = 'Test Store';
process.env.APP_URL = 'http://localhost:3000';

// Mock Prisma Client for tests
jest.mock('@/lib/db', () => ({
  db: {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $transaction: jest.fn(),
    $queryRaw: jest.fn(),
    configuration: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
    },
  },
  testDatabaseConnection: jest.fn().mockResolvedValue(true),
  disconnectDatabase: jest.fn().mockResolvedValue(undefined),
  transaction: jest.fn(),
}));

export {};