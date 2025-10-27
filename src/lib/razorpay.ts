import Razorpay from 'razorpay';
import { env } from './env';

/**
 * Razorpay instance (server-side only)
 */
export function getRazorpayInstance() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }

  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(amount: number, currency: string = 'INR', receipt?: string) {
  const razorpay = getRazorpayInstance();

  const options = {
    amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
    currency,
    receipt: receipt || `order_${Date.now()}`,
    payment_capture: 1, // Auto-capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    throw new Error('Failed to create payment order');
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require('crypto');

  const text = `${orderId}|${paymentId}`;
  const generated_signature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET!)
    .update(text)
    .digest('hex');

  return generated_signature === signature;
}

/**
 * Fetch payment details
 */
export async function fetchPaymentDetails(paymentId: string) {
  const razorpay = getRazorpayInstance();
  
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Failed to fetch payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
}

/**
 * Get Razorpay public key (safe to expose to client)
 */
export function getRazorpayPublicKey(): string {
  if (!env.RAZORPAY_KEY_ID) {
    throw new Error('Razorpay key ID not configured');
  }
  return env.RAZORPAY_KEY_ID;
}
