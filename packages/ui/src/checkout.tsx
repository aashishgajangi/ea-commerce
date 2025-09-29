"use client";

import { type HTMLAttributes, useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface CheckoutFormData {
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?:
    | {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      }
    | undefined;
  paymentMethod: string;
  notes?: string;
  useSameAddressForBilling: boolean;
}

interface CheckoutFormProps {
  initialData?: Partial<CheckoutFormData>;
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
  className?: string;
}

export function CheckoutForm({
  initialData,
  onSubmit,
  isLoading = false,
  className = "",
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
    },
    paymentMethod: "credit_card",
    useSameAddressForBilling: true,
    ...initialData,
  });

  const handleShippingChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      billingAddress: formData.useSameAddressForBilling
        ? undefined
        : formData.billingAddress || formData.shippingAddress,
    } as CheckoutFormData;

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.shippingAddress.firstName}
                onChange={(e) =>
                  handleShippingChange("firstName", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.shippingAddress.lastName}
                onChange={(e) =>
                  handleShippingChange("lastName", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.shippingAddress.email}
              onChange={(e) => handleShippingChange("email", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.shippingAddress.phone}
              onChange={(e) => handleShippingChange("phone", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.shippingAddress.address}
              onChange={(e) => handleShippingChange("address", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.shippingAddress.city}
                onChange={(e) => handleShippingChange("city", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.shippingAddress.state}
                onChange={(e) => handleShippingChange("state", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.shippingAddress.postalCode}
                onChange={(e) =>
                  handleShippingChange("postalCode", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.shippingAddress.country}
              onChange={(e) => handleShippingChange("country", e.target.value)}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="India">India</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useSameAddressForBilling"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.useSameAddressForBilling}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  useSameAddressForBilling: e.target.checked,
                }))
              }
            />
            <label
              htmlFor="useSameAddressForBilling"
              className="ml-2 text-sm text-gray-900"
            >
              Use same address for billing
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="credit_card"
                name="paymentMethod"
                value="credit_card"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={formData.paymentMethod === "credit_card"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
              />
              <label
                htmlFor="credit_card"
                className="ml-2 text-sm text-gray-900"
              >
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={formData.paymentMethod === "paypal"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
              />
              <label htmlFor="paypal" className="ml-2 text-sm text-gray-900">
                PayPal
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="bank_transfer"
                name="paymentMethod"
                value="bank_transfer"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                checked={formData.paymentMethod === "bank_transfer"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
              />
              <label
                htmlFor="bank_transfer"
                className="ml-2 text-sm text-gray-900"
              >
                Bank Transfer
              </label>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              🔒 Your payment information is secure and encrypted.
              {formData.paymentMethod === "credit_card" &&
                " Payment processing will be handled by our secure payment gateway."}
              {formData.paymentMethod === "paypal" &&
                " You will be redirected to PayPal to complete your payment."}
              {formData.paymentMethod === "bank_transfer" &&
                " Bank transfer details will be provided after order confirmation."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Order Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special instructions for your order..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? "Processing Order..." : "Place Order"}
      </Button>
    </form>
  );
}

interface OrderConfirmationProps extends HTMLAttributes<HTMLDivElement> {
  orderNumber: string;
  totalAmount: number;
  onContinueShopping?: () => void;
  onViewOrder?: () => void;
}

export function OrderConfirmation({
  orderNumber,
  totalAmount,
  onContinueShopping,
  onViewOrder,
  className = "",
  ...props
}: OrderConfirmationProps) {
  return (
    <div className={`text-center py-12 ${className}`} {...props}>
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h1>

      <p className="text-lg text-gray-600 mb-1">
        Your order has been successfully placed.
      </p>

      <p className="text-sm text-gray-500 mb-8">
        Order #{orderNumber} • Total: ${totalAmount.toFixed(2)}
      </p>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            📧 A confirmation email has been sent to your email address with
            order details and tracking information.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          {onViewOrder && (
            <Button onClick={onViewOrder}>View Order Details</Button>
          )}
          {onContinueShopping && (
            <Button variant="outline" onClick={onContinueShopping}>
              Continue Shopping
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface CheckoutSummaryProps extends HTMLAttributes<HTMLDivElement> {
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    productImage?: string;
  }>;
  subtotal: number;
  taxAmount?: number;
  shippingCost?: number;
  totalAmount?: number;
}

export function CheckoutSummary({
  items,
  subtotal,
  taxAmount = 0,
  shippingCost = 0,
  totalAmount,
  className = "",
  ...props
}: CheckoutSummaryProps) {
  const calculatedTotal = totalAmount || subtotal + taxAmount + shippingCost;

  return (
    <Card className={`sticky top-6 ${className}`} {...props}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                {item.productImage ? (
                  <img
                    src={item.productImage}
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
                  {item.quantity} × ${item.unitPrice.toFixed(2)}
                </p>
              </div>
              <span className="text-sm font-medium">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {taxAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Free"}
            </span>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${calculatedTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
