/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OrdersList } from "@repo/ui/orders";
import { trpc } from "../../lib/trpc";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/signin?callbackUrl=/orders");
    }
  }, [session, status, router]);

  // Get orders data
  const {
    data: ordersData,
    refetch: refetchOrders,
    isLoading: isOrdersLoading,
  } = trpc.orders.getUserOrders.useQuery(
    { page: 1, limit: 10 },
    {
      enabled: !!session,
      refetchOnWindowFocus: false,
    },
  );

  // Cancel order mutation
  const cancelOrderMutation = trpc.orders.cancel?.useMutation?.({
    onSuccess: () => {
      refetchOrders();
    },
    onError: (error: any) => {
      alert(`Error cancelling order: ${error.message}`);
    },
  }) || {
    mutate: () => {},
    isLoading: false,
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setIsLoading(true);
      if (cancelOrderMutation.mutate) {
        cancelOrderMutation.mutate(
          { id: orderId },
          {
            onSettled: () => setIsLoading(false),
          },
        );
      } else {
        console.log("Mock cancel order:", orderId);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }
  };

  // Loading state
  if (status === "loading" || isOrdersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null; // Will redirect
  }

  const orders = ordersData?.data?.orders || [];

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
                Cart
              </Link>
              <div className="text-sm text-gray-600">
                Hello, {session.user?.name || session.user?.email}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-2">Track and manage your orders</p>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Orders List */}
        <OrdersList
          orders={orders}
          onViewDetails={handleViewDetails}
          onCancelOrder={handleCancelOrder}
          isLoading={isLoading || cancelOrderMutation.isLoading}
          emptyStateMessage="You haven't placed any orders yet. Start shopping to see your orders here!"
        />

        {/* Demo Notice */}
        {orders.length === 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-500 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Demo Phase 2.2 - Order Management
                  </h3>
                  <div className="text-blue-700 space-y-2">
                    <p>This page demonstrates the order management system:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>View order history and status</li>
                      <li>Cancel pending orders</li>
                      <li>Track order progress</li>
                      <li>Integrated with cart and checkout flow</li>
                    </ul>
                    <p className="pt-2">
                      <strong>Next Steps:</strong> Complete a checkout process
                      to see orders appear here, or use the admin panel to
                      manage order statuses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Overview for Demo */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-4">
                Order Tracking
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Real-time order status updates from pending to delivered with
              email notifications.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-4">
                Easy Management
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              View order details, cancel orders, and manage your shopping
              experience seamlessly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-4">
                Secure Payments
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Payment processing with Razorpay integration and secure
              transaction handling (configurable).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
