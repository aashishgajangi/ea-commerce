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

// Cart helpers for Phase 2.2
export interface CartItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  productSlug: string;
  productImage?: string;
  addedAt: string;
}

export const cartHelpers = {
  // Get user's complete cart from Redis
  async getCart(userId: string): Promise<CartItem[]> {
    try {
      const cartData = await redis.get(`cart:${userId}`);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Failed to get cart from Redis:", error);
      return [];
    }
  },

  // Add item to cart or update quantity if exists
  async addToCart(
    userId: string,
    item: Omit<CartItem, "addedAt">,
  ): Promise<CartItem[]> {
    try {
      const cart = await this.getCart(userId);
      const existingIndex = cart.findIndex(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existingIndex >= 0) {
        // Update existing item quantity
        const existingItem = cart[existingIndex];
        if (existingItem) {
          existingItem.quantity += item.quantity;
          existingItem.unitPrice = item.unitPrice; // Update price in case it changed
        }
      } else {
        // Add new item
        cart.push({
          ...item,
          addedAt: new Date().toISOString(),
        });
      }

      // Set cart with 30 days expiration
      await redis.setEx(
        `cart:${userId}`,
        30 * 24 * 60 * 60,
        JSON.stringify(cart),
      );
      return cart;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw new Error("Failed to add item to cart");
    }
  },

  // Update item quantity in cart
  async updateCartItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItem[]> {
    try {
      const cart = await this.getCart(userId);
      const itemIndex = cart.findIndex((item) => item.productId === productId);

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          cart.splice(itemIndex, 1);
        } else {
          const item = cart[itemIndex];
          if (item) {
            item.quantity = quantity;
          }
        }

        await redis.setEx(
          `cart:${userId}`,
          30 * 24 * 60 * 60,
          JSON.stringify(cart),
        );
      }

      return cart;
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw new Error("Failed to update cart item");
    }
  },

  // Remove item from cart
  async removeFromCart(userId: string, productId: string): Promise<CartItem[]> {
    try {
      const cart = await this.getCart(userId);
      const filteredCart = cart.filter((item) => item.productId !== productId);

      await redis.setEx(
        `cart:${userId}`,
        30 * 24 * 60 * 60,
        JSON.stringify(filteredCart),
      );
      return filteredCart;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw new Error("Failed to remove item from cart");
    }
  },

  // Clear entire cart
  async clearCart(userId: string): Promise<void> {
    try {
      await redis.del(`cart:${userId}`);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw new Error("Failed to clear cart");
    }
  },

  // Sync cart from Redis to database (for backup/persistence)
  async syncCartToDatabase(userId: string): Promise<void> {
    try {
      // This will be called during checkout or periodically
      // Implementation will be added when we create the cart router
      console.log(`Cart sync requested for user: ${userId}`);
    } catch (error) {
      console.error("Failed to sync cart to database:", error);
    }
  },

  // Calculate cart totals
  async getCartTotals(userId: string): Promise<{
    itemCount: number;
    subtotal: number;
    items: CartItem[];
  }> {
    try {
      const cart = await this.getCart(userId);
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      const subtotal = cart.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0,
      );

      return {
        itemCount,
        subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
        items: cart,
      };
    } catch (error) {
      console.error("Failed to calculate cart totals:", error);
      return { itemCount: 0, subtotal: 0, items: [] };
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
