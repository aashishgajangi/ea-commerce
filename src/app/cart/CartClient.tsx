'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';

interface CartItem {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  selectedWeight: number | null;
  product: {
    id: string;
    name: string;
    slug: string;
    weightBasedPricing: boolean;
    images: Array<{
      url: string;
      alt: string | null;
    }>;
  };
  variant: {
    name: string;
    options: string;
  } | null;
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface CartSummary {
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

export default function CartClient() {
  const { refreshCart } = useCart(); // Get refresh function from context
  const [cart, setCart] = useState<Cart | null>(null);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>('USD');

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

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Fetch cart
  const fetchCart = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      const url = sessionId ? `/api/cart?sessionId=${sessionId}` : '/api/cart';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('🛒 Cart loaded:', {
          totalItems: data.cart?.items?.length,
          items: data.cart?.items?.map((i: CartItem) => ({
            id: i.id,
            productId: i.productId,
            name: i.product.name,
            weight: i.selectedWeight,
            qty: i.quantity,
            price: i.price,
          })),
        });
        setCart(data.cart);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    
    // Fetch currency setting
    const fetchCurrency = async () => {
      try {
        const response = await fetch('/api/admin/settings/general');
        if (response.ok) {
          const data = await response.json();
          setCurrency(data.currency || 'USD');
        }
      } catch (error) {
        console.error('Failed to fetch currency:', error);
      }
    };
    
    fetchCurrency();
  }, [fetchCart]);

  // Update item quantity
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    // Prevent concurrent updates to avoid race condition
    if (updating) {
      console.warn('Update in progress, please wait...');
      return;
    }

    // Debug logging
    const item = cart?.items.find(i => i.id === itemId);
    console.log('🔄 Updating cart item:', {
      itemId,
      productName: item?.product.name,
      selectedWeight: item?.selectedWeight,
      currentQty: item?.quantity,
      newQty: newQuantity,
    });

    setUpdating(itemId);
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Cart updated successfully:', {
          totalItems: data.cart?.items?.length,
          items: data.cart?.items?.map((i: CartItem) => ({
            id: i.id,
            name: i.product.name,
            weight: i.selectedWeight,
            qty: i.quantity,
          })),
        });
        setCart(data.cart);
        setSummary(data.summary);
        // Update header cart count
        await refreshCart();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart');
    } finally {
      setUpdating(null);
    }
  };

  // Remove item
  const removeItem = async (itemId: string) => {
    if (!confirm('Remove this item from cart?')) return;

    // Prevent concurrent updates to avoid race condition
    if (updating) {
      console.warn('Update in progress, please wait...');
      return;
    }

    setUpdating(itemId);
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        setSummary(data.summary);
        // Update header cart count
        await refreshCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(null);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!confirm('Clear all items from cart?')) return;

    setLoading(true);
    try {
      const sessionId = getSessionId();
      const url = sessionId ? `/api/cart?sessionId=${sessionId}` : '/api/cart';
      
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        await fetchCart();
        // Update header cart count
        await refreshCart();
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {isEmpty ? 'Your cart is empty' : `${summary?.itemCount} ${summary?.itemCount === 1 ? 'item' : 'items'} in cart`}
        </p>
      </div>

      {isEmpty ? (
        /* Empty State */
        <Card>
          <CardContent className="py-16 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping to add items to your cart
            </p>
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Cart Items */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        {item.product.images.length > 0 ? (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.images[0].alt || item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ShoppingBag className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.product.slug}`}
                        className="font-semibold hover:underline block mb-1"
                        style={{ color: 'var(--theme-text, #1a1a1a)' }}
                      >
                        {item.product.name}
                      </Link>

                      {item.variant && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.variant.name}
                        </p>
                      )}

                      {item.product.weightBasedPricing && item.selectedWeight && (
                        <p className="text-sm text-gray-600 mb-2">
                          Weight: {item.selectedWeight}kg
                        </p>
                      )}

                      {/* Debug: Show item ID */}
                      <p className="text-xs text-gray-400 mb-2 font-mono">
                        ID: {item.id.slice(-8)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!!updating || item.quantity <= 1}
                            className="h-10 w-10 sm:h-8 sm:w-8 p-0"
                          >
                            <Minus className="h-4 w-4 sm:h-3 sm:w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                updateQuantity(item.id, val);
                              }
                            }}
                            disabled={!!updating}
                            className="h-10 sm:h-8 w-16 text-center border-0 focus-visible:ring-0"
                            min="1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!!updating}
                            className="h-10 w-10 sm:h-8 sm:w-8 p-0"
                          >
                            <Plus className="h-4 w-4 sm:h-3 sm:w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          disabled={!!updating}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 sm:h-auto min-w-[100px]"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-lg" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--theme-text, #1a1a1a)' }}>
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(summary?.subtotal || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items</span>
                    <span className="font-medium">{summary?.totalQuantity}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg" style={{ color: 'var(--theme-primary, #0070f3)' }}>
                      {formatPrice(summary?.subtotal || 0)}
                    </span>
                  </div>
                </div>

                <Button className="w-full mb-3" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
