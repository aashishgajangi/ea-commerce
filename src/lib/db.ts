import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient singleton instance
 * Prevents multiple instances in development due to hot reloading
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Database client instance
 * Uses singleton pattern to prevent multiple connections
 */
export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

/**
 * Test database connection
 * Returns true if connection is successful
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await db.$connect();
    await db.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Disconnect from database
 * Should be called on application shutdown
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await db.$disconnect();
    console.log('✅ Database disconnected');
  } catch (error) {
    console.error('❌ Failed to disconnect from database:', error);
  }
}

/**
 * Execute database queries in a transaction
 */
export const transaction = db.$transaction.bind(db);