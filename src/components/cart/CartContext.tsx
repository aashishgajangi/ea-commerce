'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, variantId?: string, quantity?: number, selectedWeight?: number) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_CACHE_KEY = 'cartCount';
const CART_TIMESTAMP_KEY = 'cartCountTimestamp';
const CACHE_DURATION = 300000; // 5 minutes

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  
  // Initialize from localStorage cache
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CART_CACHE_KEY);
      return cached ? parseInt(cached, 10) : 0;
    }
    return 0;
  });

  // Get or create session ID for guest users
  const getSessionId = () => {
    if (typeof window === 'undefined') return null;
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
  };

  // Check if cache is stale
  const isCacheStale = useCallback(() => {
    if (typeof window === 'undefined') return true;
    const timestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    if (!timestamp) return true;
    return Date.now() - parseInt(timestamp, 10) > CACHE_DURATION;
  }, []);

  // Update cache
  const updateCache = useCallback((count: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_CACHE_KEY, count.toString());
    localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
  }, []);

  // Fetch cart count
  const refreshCart = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      const url = sessionId ? `/api/cart?sessionId=${sessionId}` : '/api/cart';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const count = data.summary?.totalQuantity || 0;
        setCartCount(count);
        updateCache(count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [updateCache]);

  // Add to cart function
  const addToCart = async (
    productId: string,
    variantId?: string,
    quantity: number = 1,
    selectedWeight?: number
  ): Promise<boolean> => {
    try {
      const sessionId = getSessionId();
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          variantId,
          quantity,
          selectedWeight,
          sessionId,
        }),
      });

      if (response.ok) {
        await refreshCart();
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add to cart');
        return false;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
      return false;
    }
  };

  // Load cart on mount only if cache is stale
  useEffect(() => {
    if (isCacheStale()) {
      refreshCart();
    }
  }, [session, refreshCart, isCacheStale]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
