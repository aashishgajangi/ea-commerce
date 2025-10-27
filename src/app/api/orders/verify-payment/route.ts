import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { z } from 'zod';

const verifyPaymentSchema = z.object({
  orderId: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = 
      verifyPaymentSchema.parse(body);

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'paid',
        status: 'confirmed',
        paymentId: razorpayPaymentId,
        paymentData: {
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          verifiedAt: new Date().toISOString(),
        },
        confirmedAt: new Date(),
      },
    });

    // Add status history
    await db.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'confirmed',
        comment: 'Payment verified and order confirmed',
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
