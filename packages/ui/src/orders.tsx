"use client";

import { type HTMLAttributes } from "react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./card";

export interface Address {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";
  totalAmount: number;
  createdAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    slug: string;
    images: Array<{ url: string }>;
  };
}

interface OrderCardProps extends HTMLAttributes<HTMLDivElement> {
  order: Order;
  onViewDetails?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  showActions?: boolean;
  isLoading?: boolean;
}

export function OrderCard({
  order,
  onViewDetails,
  onCancelOrder,
  showActions = true,
  isLoading = false,
  className = "",
  ...props
}: OrderCardProps) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-gray-100 text-gray-800",
  };

  const paymentStatusColors = {
    PENDING: "text-yellow-600",
    PAID: "text-green-600",
    FAILED: "text-red-600",
    REFUNDED: "text-gray-600",
    PARTIALLY_REFUNDED: "text-orange-600",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className={`${className}`} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">
              Order #{order.orderNumber}
            </CardTitle>
            <CardDescription>
              Placed on {formatDate(order.createdAt)}
            </CardDescription>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
            >
              {order.status.toLowerCase().replace("_", " ")}
            </span>
            <div
              className={`text-sm font-medium mt-1 ${paymentStatusColors[order.paymentStatus]}`}
            >
              Payment: {order.paymentStatus.toLowerCase().replace("_", " ")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {order.orderItems && order.orderItems.length > 0 && (
          <div className="mb-4">
            <div className="space-y-2">
              {order.orderItems.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.product?.images[0] ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">?</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {order.orderItems.length > 2 && (
                <p className="text-sm text-gray-500">
                  +{order.orderItems.length - 2} more items
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-lg font-semibold text-gray-900">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>

          {showActions && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails?.(order.id)}
                disabled={isLoading}
              >
                View Details
              </Button>
              {order.status === "PENDING" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancelOrder?.(order.id)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface OrderDetailsProps extends HTMLAttributes<HTMLDivElement> {
  order: Order & {
    shippingAddress?: Address;
    billingAddress?: Address;
    paymentMethod?: string;
    orderItems: OrderItem[];
  };
  onBack?: () => void;
  onCancelOrder?: (orderId: string) => void;
  showActions?: boolean;
  isLoading?: boolean;
}

export function OrderDetails({
  order,
  onBack,
  onCancelOrder,
  showActions = true,
  isLoading = false,
  className = "",
  ...props
}: OrderDetailsProps) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-gray-100 text-gray-800",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (address?: Address) => {
    if (!address) return null;
    return (
      <div className="text-sm text-gray-600">
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        {address.phone && <p>Phone: {address.phone}</p>}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{order.orderNumber}
            </h1>
            <p className="text-gray-600">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
        >
          {order.status.toLowerCase().replace("_", " ")}
        </span>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b last:border-b-0"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product?.images[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${item.unitPrice.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary & Addresses */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>{formatAddress(order.shippingAddress)}</CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-medium">
                {order.paymentMethod || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status</span>
              <span className="font-medium">{order.paymentStatus}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      {showActions && order.status === "PENDING" && (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={() => onCancelOrder?.(order.id)}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Order"}
          </Button>
        </div>
      )}
    </div>
  );
}

interface OrdersListProps extends HTMLAttributes<HTMLDivElement> {
  orders: Order[];
  onViewDetails?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}

export function OrdersList({
  orders,
  onViewDetails,
  onCancelOrder,
  isLoading = false,
  emptyStateMessage = "No orders found.",
  className = "",
  ...props
}: OrdersListProps) {
  if (orders.length === 0) {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Orders Yet
        </h3>
        <p className="text-gray-500">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          {...(onViewDetails && { onViewDetails })}
          {...(onCancelOrder && { onCancelOrder })}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
