import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { createRazorpayOrder, getRazorpayPublicKey } from '@/lib/razorpay';
import { z } from 'zod';

const addressSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(6),
  country: z.string().default('India'),
});

const createOrderSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum(['razorpay', 'cod']).default('razorpay'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    
    // Validate input
    const { address, paymentMethod } = createOrderSchema.parse(body);

    // Get cart
    const sessionId = request.nextUrl.searchParams.get('sessionId');
    
    const cart = await db.cart.findFirst({
      where: session?.user?.id 
        ? { userId: session.user.id }
        : { sessionId: sessionId || undefined },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = cart.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const deliveryCharge = 0; // Free delivery for now
    const tax = 0; // No tax for now
    const total = subtotal + deliveryCharge + tax;

    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    // Create Razorpay order if payment method is razorpay
    let razorpayOrderId: string | undefined;
    let razorpayKeyId: string | undefined;

    if (paymentMethod === 'razorpay') {
      try {
        const razorpayOrder = await createRazorpayOrder(total, 'INR', orderNumber);
        razorpayOrderId = razorpayOrder.id;
        razorpayKeyId = getRazorpayPublicKey();
      } catch (error) {
        console.error('Razorpay order creation failed:', error);
        return NextResponse.json(
          { error: 'Failed to create payment order' },
          { status: 500 }
        );
      }
    }

    // Create order in database
    const order = await db.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        guestEmail: !session?.user?.id ? address.email : undefined,
        guestPhone: !session?.user?.id ? address.phone : undefined,
        status: 'pending',
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
        deliveryAddress: address,
        contactPhone: address.phone,
        subtotal,
        deliveryCharge,
        tax,
        total,
        currency: 'INR',
        paymentMethod,
        paymentId: razorpayOrderId,
        items: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: cart.items.map((item: any) => ({
            productId: item.productId,
            productName: item.product.name,
            productSlug: item.product.slug,
            productImage: item.product.images[0]?.url,
            variantId: item.variantId,
            variantName: item.variant?.name,
            price: item.price,
            quantity: item.quantity,
            selectedWeight: item.selectedWeight,
            subtotal: item.price * item.quantity,
          })),
        },
        statusHistory: {
          create: {
            status: 'pending',
            comment: 'Order created',
            createdAt: new Date(),
          },
        },
      },
      include: {
        items: true,
      },
    });

    // Clear cart after order creation
    await db.cart.delete({
      where: { id: cart.id },
    });

    // Return order details with Razorpay info
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        currency: order.currency,
      },
      razorpay: paymentMethod === 'razorpay' ? {
        orderId: razorpayOrderId,
        keyId: razorpayKeyId,
        amount: Math.round(total * 100), // In paise
        currency: 'INR',
      } : undefined,
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
