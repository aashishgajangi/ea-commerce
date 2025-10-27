'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import LocationSelector from '@/components/checkout/LocationSelector';
import { Session } from 'next-auth';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  placeId?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface CartSummary {
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

interface CheckoutClientProps {
  session: Session | null;
}

export default function CheckoutClient({ session }: CheckoutClientProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [cart, setCart] = useState<{ items: unknown[] } | null>(null);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const sessionId = localStorage.getItem('guestSessionId');
        const url = sessionId ? `/api/cart?sessionId=${sessionId}` : '/api/cart';
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCart(data.cart);
          setSummary(data.summary);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData);
    console.log('Location selected:', locationData);
  };

  const handleContinue = () => {
    if (!location) {
      alert('Please select a delivery location');
      return;
    }

    // TODO: Navigate to next step (delivery slot selection)
    console.log('Proceeding with location:', location);
  };

  // Empty cart check
  if (!loading && (!cart || !cart.items || cart.items.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="py-16 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add items to your cart before checking out
            </p>
            <Button asChild>
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-600 mt-2">
          Complete your order in a few simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Checkout Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                  1
                </span>
                Delivery Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationSelector
                onLocationSelect={handleLocationSelect}
              />
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={!location}
              size="lg"
              className="min-w-[200px]"
            >
              Continue to Delivery Slot
            </Button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : (cart && summary) ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items</span>
                    <span className="font-medium">{summary.itemCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{summary.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium text-green-600">
                      {location ? 'Calculated next' : 'Enter location'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      ₹{summary.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : null}

              {session ? (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                  ✓ Logged in as {session.user?.email}
                </div>
              ) : (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  💡 <Link href="/login" className="underline">Login</Link> to save your address
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
