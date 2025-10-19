'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, variantId?: string, quantity?: number, selectedWeight?: number) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

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

  // Fetch cart count
  const refreshCart = async () => {
    try {
      const sessionId = getSessionId();
      const url = sessionId ? `/api/cart?sessionId=${sessionId}` : '/api/cart';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.summary?.totalQuantity || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

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

  // Load cart on mount and when session changes
  useEffect(() => {
    refreshCart();
  }, [session]);

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
