"use client";

import { type HTMLAttributes } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
}

interface CartItemCardProps extends HTMLAttributes<HTMLDivElement> {
  item: CartItem;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  isLoading?: boolean;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isLoading = false,
  className = "",
  ...props
}: CartItemCardProps) {
  const totalPrice = item.quantity * item.unitPrice;

  return (
    <div
      className={`flex items-center gap-4 p-4 border rounded-lg bg-white ${className}`}
      {...props}
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900 line-clamp-2">
          {item.productName}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          ${item.unitPrice.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity?.(item.productId, item.quantity - 1)}
          disabled={isLoading || item.quantity <= 1}
          className="w-8 h-8 p-0"
        >
          -
        </Button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity?.(item.productId, item.quantity + 1)}
          disabled={isLoading}
          className="w-8 h-8 p-0"
        >
          +
        </Button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-[80px]">
        <p className="font-medium text-gray-900">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove?.(item.productId)}
        disabled={isLoading}
        className="ml-2"
      >
        Remove
      </Button>
    </div>
  );
}

interface CartSummaryProps extends HTMLAttributes<HTMLDivElement> {
  itemCount: number;
  subtotal: number;
  taxAmount?: number;
  shippingCost?: number;
  totalAmount?: number;
  onCheckout?: () => void;
  isCheckoutLoading?: boolean;
}

export function CartSummary({
  itemCount,
  subtotal,
  taxAmount = 0,
  shippingCost = 0,
  totalAmount,
  onCheckout,
  isCheckoutLoading = false,
  className = "",
  ...props
}: CartSummaryProps) {
  const calculatedTotal = totalAmount || subtotal + taxAmount + shippingCost;

  return (
    <Card className={`${className}`} {...props}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {taxAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
        )}

        {shippingCost > 0 && (
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
        )}

        <hr className="border-gray-200" />

        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${calculatedTotal.toFixed(2)}</span>
        </div>

        <Button
          onClick={onCheckout}
          disabled={isCheckoutLoading || itemCount === 0}
          className="w-full"
        >
          {isCheckoutLoading ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </CardContent>
    </Card>
  );
}

interface CartEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  onContinueShopping?: () => void;
}

export function CartEmptyState({
  onContinueShopping,
  className = "",
  ...props
}: CartEmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`} {...props}>
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-gray-400"
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
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 mb-6">Add some products to get started!</p>
      {onContinueShopping && (
        <Button onClick={onContinueShopping}>Continue Shopping</Button>
      )}
    </div>
  );
}

interface CartHeaderProps extends HTMLAttributes<HTMLDivElement> {
  itemCount: number;
  onClearCart?: () => void;
  isClearingCart?: boolean;
}

export function CartHeader({
  itemCount,
  onClearCart,
  isClearingCart = false,
  className = "",
  ...props
}: CartHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between mb-6 ${className}`}
      {...props}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-1">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {itemCount > 0 && (
        <Button
          variant="outline"
          onClick={onClearCart}
          disabled={isClearingCart}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          {isClearingCart ? "Clearing..." : "Clear Cart"}
        </Button>
      )}
    </div>
  );
}

// Cart Badge Component for Header Navigation
interface CartBadgeProps extends HTMLAttributes<HTMLButtonElement> {
  itemCount: number;
  onClick?: () => void;
}

export function CartBadge({
  itemCount,
  onClick,
  className = "",
  ...props
}: CartBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      {...props}
    >
      <svg
        className="w-6 h-6"
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
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
