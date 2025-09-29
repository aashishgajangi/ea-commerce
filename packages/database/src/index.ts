// Database client
export { prisma, withErrorHandling } from "./client";
export type { User, Account, Session } from "./client";

// Redis client
export {
  default as redis,
  sessionHelpers,
  cacheHelpers,
  cartHelpers,
} from "./redis";
export type { RedisClient, CartItem } from "./redis";

// Auth helpers
export {
  hashPassword,
  verifyPassword,
  validatePassword,
  generateSecureToken,
} from "./auth";
