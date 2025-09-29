"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CheckoutForm,
  CheckoutSummary,
  type CheckoutFormData,
} from "@repo/ui/checkout";
import { trpc } from "../../lib/trpc";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
  }, [session, status, router]);

  // Get cart data
  const { data: cartData, isLoading: isCartLoading } =
    trpc.cart.getCart.useQuery(undefined, {
      enabled: !!session,
      refetchOnWindowFocus: false,
    });

  // Create order mutation
  const createOrderMutation = trpc.orders.create.useMutation({
    onSuccess: (data: {
      data: { orderNumber: string; totalAmount: number };
    }) => {
      // Redirect to order confirmation
      router.push(
        `/order-confirmation?orderNumber=${data.data.orderNumber}&total=${data.data.totalAmount}`,
      );
    },
    onError: (error: { message: string }) => {
      alert(`Error creating order: ${error.message}`);
    },
  });

  const handleFormSubmit = (formData: CheckoutFormData) => {
    setIsLoading(true);

    // For demo purposes, create order with form data
    createOrderMutation.mutate(formData, {
      onSettled: () => setIsLoading(false),
    });
  };

  // Loading state
  if (status === "loading" || isCartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null; // Will redirect
  }

  const cart = cartData?.data;
  const isEmpty = !cart || cart.itemCount === 0;

  // Redirect to cart if empty
  if (isEmpty) {
    router.push("/cart");
    return null;
  }

  const subtotal = cart.subtotal || 0;
  const taxAmount = subtotal * 0.1; // 10% tax
  const shippingCost = subtotal > 50 ? 0 : 10; // Free shipping over $50
  const totalAmount = subtotal + taxAmount + shippingCost;

  // Initial form data with user's email
  const initialFormData = {
    shippingAddress: {
      firstName: "",
      lastName: "",
      email: session.user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
    },
    paymentMethod: "credit_card",
    useSameAddressForBilling: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                EA Commerce
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your order information below
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              initialData={initialFormData}
              onSubmit={handleFormSubmit}
              isLoading={isLoading || createOrderMutation.isLoading}
            />
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <CheckoutSummary
              items={cart.items || []}
              subtotal={subtotal}
              taxAmount={taxAmount}
              shippingCost={shippingCost}
              totalAmount={totalAmount}
            />

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Secure Checkout
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your payment information is secure and encrypted. This is a
                    demo checkout - no real payment processing.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">
                    Demo Mode
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    This is Phase 2.2 demonstration. Payment integration, email
                    notifications, and webhooks will be configured in
                    production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
