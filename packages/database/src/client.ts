import { PrismaClient } from "./generated/client/index.js";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
export const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// Error handling wrapper for database operations
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`Database error in ${context}:`, error);
    throw new Error(`Database operation failed: ${context}`);
  }
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export type { User, Account, Session } from "./generated/client/index.js";
export * from "./generated/client/index.js";
