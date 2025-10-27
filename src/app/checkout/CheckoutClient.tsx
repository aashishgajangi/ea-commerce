'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import SimpleAddressForm from '@/components/checkout/SimpleAddressForm';
import { Session } from 'next-auth';

interface AddressData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CartSummary {
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

interface CheckoutClientProps {
  session: Session | null;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutClient({ session }: CheckoutClientProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [address, setAddress] = useState<AddressData | null>(null);
  const [cart, setCart] = useState<{ items: unknown[] } | null>(null);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddressSubmit = (addressData: AddressData) => {
    setAddress(addressData);
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!address) return;

    setProcessing(true);
    try {
      const sessionId = localStorage.getItem('guestSessionId');
      const url = sessionId ? `/api/orders/create?sessionId=${sessionId}` : '/api/orders/create';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          paymentMethod: 'razorpay',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Open Razorpay checkout
      const options = {
        key: data.razorpay.keyId,
        amount: data.razorpay.amount,
        currency: data.razorpay.currency,
        name: 'Your Store',
        description: `Order #${data.order.orderNumber}`,
        order_id: data.razorpay.orderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch('/api/orders/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.order.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            setOrderNumber(data.order.orderNumber);
            setStep('success');
            // Clear cart from localStorage
            localStorage.removeItem('guestSessionId');
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      razorpay.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.description);
        setProcessing(false);
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process payment');
    } finally {
      setProcessing(false);
    }
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

      {step === 'success' ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="py-16 text-center">
              <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-2">Your order number is:</p>
              <p className="text-2xl font-bold text-blue-600 mb-6">{orderNumber}</p>
              <p className="text-gray-600 mb-8">
                We&apos;ve sent a confirmation email to {address?.email}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild>
                  <Link href="/orders">View Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Checkout Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${
                    step === 'address' ? 'bg-blue-600' : 'bg-green-500'
                  }`}>
                    {step === 'payment' ? '✓' : '1'}
                  </span>
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 'address' ? (
                  <SimpleAddressForm
                    onSubmit={handleAddressSubmit}
                    initialData={session?.user ? {
                      fullName: session.user.name || '',
                      email: session.user.email || '',
                    } : undefined}
                  />
                ) : (
                  <div className="space-y-2">
                    <p className="font-medium">{address?.fullName}</p>
                    <p className="text-sm text-gray-600">{address?.addressLine1}</p>
                    {address?.addressLine2 && (
                      <p className="text-sm text-gray-600">{address.addressLine2}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {address?.city}, {address?.state} - {address?.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {address?.phone}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStep('address')}
                      className="mt-4"
                    >
                      Change Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                      2
                    </span>
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-2 0H4v2h16V6zm0 4H4v8h16v-8z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Pay with Razorpay</h3>
                          <p className="text-sm text-gray-600">
                            Credit/Debit Card, UPI, Net Banking, Wallets
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handlePayment}
                      disabled={processing}
                      size="lg"
                      className="w-full"
                    >
                      {processing ? 'Processing...' : `Pay ₹${summary?.subtotal.toFixed(2)}`}
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      🔒 Secure payment powered by Razorpay
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
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
                      <span className="font-medium text-green-600">FREE</span>
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
      )}
    </div>
  );
}
