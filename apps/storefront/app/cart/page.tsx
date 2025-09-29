"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CartItemCard,
  CartSummary,
  CartEmptyState,
  CartHeader,
  type CartItem,
} from "@repo/ui/cart";
import { trpc } from "../../lib/trpc";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/signin?callbackUrl=/cart");
    }
  }, [session, status, router]);

  // Get cart data
  const {
    data: cartData,
    refetch: refetchCart,
    isLoading: isCartLoading,
  } = trpc.cart.getCart.useQuery(undefined, {
    enabled: !!session,
    refetchOnWindowFocus: false,
  });

  // Mutations
  const updateCartItemMutation = trpc.cart.updateCartItem.useMutation({
    onSuccess: () => {
      refetchCart();
    },
    onError: (error: { message: string }) => {
      alert(`Error updating cart: ${error.message}`);
    },
  });

  const removeFromCartMutation = trpc.cart.removeFromCart.useMutation({
    onSuccess: () => {
      refetchCart();
    },
    onError: (error: { message: string }) => {
      alert(`Error removing item: ${error.message}`);
    },
  });

  const clearCartMutation = trpc.cart.clearCart.useMutation({
    onSuccess: () => {
      refetchCart();
    },
    onError: (error: { message: string }) => {
      alert(`Error clearing cart: ${error.message}`);
    },
  });

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setIsLoading(true);
    updateCartItemMutation.mutate(
      { productId, quantity },
      {
        onSettled: () => setIsLoading(false),
      },
    );
  };

  const handleRemoveItem = (productId: string) => {
    setIsLoading(true);
    removeFromCartMutation.mutate(
      { productId },
      {
        onSettled: () => setIsLoading(false),
      },
    );
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setIsLoading(true);
      clearCartMutation.mutate(undefined, {
        onSettled: () => setIsLoading(false),
      });
    }
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Loading state
  if (status === "loading" || isCartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
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
              <Link
                href="/orders"
                className="text-gray-700 hover:text-gray-900"
              >
                My Orders
              </Link>
              <div className="text-sm text-gray-600">
                Hello, {session.user?.name || session.user?.email}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartHeader
          itemCount={cart?.itemCount || 0}
          onClearCart={handleClearCart}
          isClearingCart={clearCartMutation.isLoading}
        />

        {isEmpty ? (
          <CartEmptyState onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart?.items?.map((item: CartItem) => (
                  <CartItemCard
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="mt-8 lg:mt-0">
              <CartSummary
                itemCount={cart?.itemCount || 0}
                subtotal={cart?.subtotal || 0}
                taxAmount={cart?.subtotal ? cart.subtotal * 0.1 : 0} // 10% tax
                shippingCost={cart?.subtotal && cart.subtotal > 50 ? 0 : 10} // Free shipping over $50
                onCheckout={handleCheckout}
                isCheckoutLoading={false}
              />

              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
