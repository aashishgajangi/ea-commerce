import { createClient } from "redis";

export type RedisClient = ReturnType<typeof createClient>;

declare global {
  // eslint-disable-next-line no-var
  var __redis: RedisClient | undefined;
}

const createRedisClient = (): RedisClient => {
  const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
      connectTimeout: 60000,
    },
  });

  client.on("error", (err: Error) => {
    console.error("Redis Client Error:", err);
  });

  client.on("connect", () => {
    console.log("Redis Client Connected");
  });

  client.on("ready", () => {
    console.log("Redis Client Ready");
  });

  client.on("end", () => {
    console.log("Redis Client Disconnected");
  });

  return client;
};

// Redis client instance - reuse in development
export const redis = globalThis.__redis || createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__redis = redis;
}

// In-memory fallback for development when Redis isn't available
const memoryStore = new Map<string, { value: string; expires: number }>();

// Graceful shutdown
process.on("beforeExit", async () => {
  try {
    if (redis && typeof redis.quit === "function") {
      await redis.quit();
    }
  } catch (error) {
    // Ignore errors during shutdown
  }
});

// Session helpers
export const sessionHelpers = {
  async setSession(
    sessionToken: string,
    userId: string,
    expires: Date,
  ): Promise<void> {
    try {
      await redis.setEx(
        `session:${sessionToken}`,
        Math.floor((expires.getTime() - Date.now()) / 1000),
        JSON.stringify({ userId, expires: expires.toISOString() }),
      );
    } catch (error) {
      console.error("Failed to set session in Redis:", error);
      throw new Error("Session storage failed");
    }
  },

  async getSession(
    sessionToken: string,
  ): Promise<{ userId: string; expires: Date } | null> {
    try {
      const session = await redis.get(`session:${sessionToken}`);
      if (!session) return null;

      const parsed = JSON.parse(session);
      return {
        userId: parsed.userId,
        expires: new Date(parsed.expires),
      };
    } catch (error) {
      console.error("Failed to get session from Redis:", error);
      return null;
    }
  },

  async deleteSession(sessionToken: string): Promise<void> {
    try {
      await redis.del(`session:${sessionToken}`);
    } catch (error) {
      console.error("Failed to delete session from Redis:", error);
      // Don't throw - session cleanup failures shouldn't break auth
    }
  },
};

// Cache helpers for future use
export const cacheHelpers = {
  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      await redis.setEx(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error("Cache set failed:", error);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Cache get failed:", error);
      return null;
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error("Cache delete failed:", error);
    }
  },
};

// Graceful shutdown
process.on("beforeExit", async () => {
  try {
    await redis.quit();
  } catch (error) {
    console.error("Error closing Redis connection:", error);
  }
});

export { redis as default };
