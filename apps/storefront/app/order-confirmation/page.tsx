/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderConfirmation } from "@repo/ui/checkout";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    const orderNumber = searchParams.get("orderNumber");
    const totalAmount = parseFloat(searchParams.get("total") || "0");

    if (orderNumber && totalAmount) {
      setOrderDetails({
        orderNumber,
        totalAmount,
      });
    } else {
      // Redirect to home if no order details
      router.push("/");
    }
  }, [searchParams, router]);

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleViewOrder = () => {
    if (orderDetails) {
      router.push(`/orders`);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                EA Commerce
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/orders"
                className="text-gray-700 hover:text-gray-900"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderConfirmation
          orderNumber={orderDetails.orderNumber}
          totalAmount={orderDetails.totalAmount}
          onContinueShopping={handleContinueShopping}
          onViewOrder={handleViewOrder}
        />

        {/* Additional Information */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p>
                    We'll review and confirm your order details within 1-2
                    business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Preparation</p>
                  <p>
                    Your items will be carefully prepared and packaged for
                    shipping.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 font-semibold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping</p>
                  <p>
                    You'll receive tracking information once your order ships
                    (typically 2-3 business days).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-900">
                  Demo Environment
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  This is a demonstration of Phase 2.2 functionality. No actual
                  payment was processed and no real order was created. In
                  production, you would receive email confirmations and tracking
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
