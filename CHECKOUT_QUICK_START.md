# 🚀 Checkout System - Quick Start Guide

## 📋 TL;DR

Building a **Zomato/Swiggy-style checkout** with GPS + Google Places API for your e-commerce PWA.

---

## 🎯 What We're Building

```
Cart → GPS Location → Delivery Slot → Payment → Order Confirmation
```

**Key Features:**
- 📍 GPS location detection (like Zomato)
- 🗺️ Google Maps with draggable marker
- 🔍 Google Places autocomplete
- 📦 Delivery zone validation
- 💳 Multiple payment methods (COD, Razorpay, Stripe)
- 📧 Email/SMS notifications
- 📱 PWA-optimized (works offline)

---

## ⚡ Quick Setup (5 Minutes)

### 1. Get Google Maps API Key

```bash
# Go to: https://console.cloud.google.com/
# Enable: Maps JavaScript API, Places API, Geocoding API
# Create API key and restrict by domain
```

### 2. Add to Environment

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
GOOGLE_MAPS_API_KEY=your_api_key_here  # Server-side
```

### 3. Install Dependencies

```bash
npm install @googlemaps/js-api-loader @react-google-maps/api razorpay
```

### 4. Run Database Migration

```bash
# Copy schema from CHECKOUT_PLAN.md to prisma/schema.prisma
npx prisma migrate dev --name add_checkout_models
npx prisma generate
```

---

## 📁 File Structure

```
src/
├── app/
│   ├── checkout/
│   │   ├── page.tsx                    # Main checkout page
│   │   ├── address/page.tsx            # Step 1: Address
│   │   ├── delivery/page.tsx           # Step 2: Delivery slot
│   │   ├── payment/page.tsx            # Step 3: Payment
│   │   └── success/[orderId]/page.tsx  # Confirmation
│   ├── orders/
│   │   ├── page.tsx                    # Order history
│   │   └── [orderId]/page.tsx          # Order details
│   └── api/
│       ├── checkout/
│       │   ├── validate-address/route.ts
│       │   ├── calculate-delivery/route.ts
│       │   ├── apply-coupon/route.ts
│       │   └── create-order/route.ts
│       ├── orders/
│       │   └── [orderId]/route.ts
│       └── geocoding/
│           ├── address-to-coords/route.ts
│           └── coords-to-address/route.ts
├── components/
│   ├── checkout/
│   │   ├── LocationSelector.tsx        # GPS + Map + Autocomplete
│   │   ├── DeliverySlotSelector.tsx    # Date/time picker
│   │   ├── OrderSummary.tsx            # Cart + pricing
│   │   └── PaymentSelector.tsx         # Payment methods
│   └── orders/
│       ├── OrderCard.tsx               # Order list item
│       └── OrderTracking.tsx           # Status timeline
└── lib/
    ├── orders.ts                       # Order CRUD operations
    ├── geocoding.ts                    # Google Maps helpers
    └── delivery-zones.ts               # Zone validation
```

---

## 🗄️ Database Models (Add to schema.prisma)

```prisma
// Order model
model Order {
  id                String      @id @default(cuid())
  orderNumber       String      @unique
  userId            String?
  status            String      @default("pending")
  paymentStatus     String      @default("pending")
  deliveryAddress   Json
  deliveryLat       Float?
  deliveryLng       Float?
  subtotal          Float
  deliveryCharge    Float       @default(0)
  total             Float
  currency          String      @default("USD")
  createdAt         DateTime    @default(now())
  items             OrderItem[]
  
  @@index([userId])
  @@index([orderNumber])
  @@map("orders")
}

// Order items
model OrderItem {
  id              String      @id @default(cuid())
  orderId         String
  productId       String
  productName     String
  price           Float
  quantity        Int
  subtotal        Float
  order           Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@index([orderId])
  @@map("order_items")
}

// Delivery zones
model DeliveryZone {
  id              String      @id @default(cuid())
  name            String
  boundaries      Json        # Array of {lat, lng}
  isActive        Boolean     @default(true)
  deliveryCharge  Float       @default(0)
  
  @@map("delivery_zones")
}

// Update Address model (add GPS fields)
model Address {
  // ... existing fields ...
  latitude        Float?      # NEW
  longitude       Float?      # NEW
  placeId         String?     # NEW
  formattedAddress String?    # NEW
}
```

---

## 🎨 Core Components

### 1. LocationSelector Component

```tsx
// src/components/checkout/LocationSelector.tsx

'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function LocationSelector({ onLocationSelect }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  // Get current location
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error('GPS error:', error);
          // Fallback to manual entry
        }
      );
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lat: number, lng: number) => {
    const response = await fetch('/api/geocoding/coords-to-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
    });
    const data = await response.json();
    setAddress(data.address);
  };

  return (
    <div className="space-y-4">
      {/* Use Current Location Button */}
      <button onClick={getCurrentLocation}>
        📍 Use Current Location
      </button>

      {/* Google Map */}
      {isLoaded && location && (
        <GoogleMap
          center={location}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '400px' }}
        >
          <Marker
            position={location}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              if (lat && lng) {
                setLocation({ lat, lng });
                reverseGeocode(lat, lng);
              }
            }}
          />
        </GoogleMap>
      )}

      {/* Address Display */}
      {address && (
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-medium">Delivery Address:</p>
          <p>{address}</p>
        </div>
      )}

      {/* Manual Address Entry (fallback) */}
      <input
        type="text"
        placeholder="Enter address manually"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
```

### 2. Checkout Page

```tsx
// src/app/checkout/page.tsx

import { Suspense } from 'react';
import LocationSelector from '@/components/checkout/LocationSelector';
import DeliverySlotSelector from '@/components/checkout/DeliverySlotSelector';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Checkout Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              1. Delivery Address
            </h2>
            <LocationSelector onLocationSelect={(data) => {
              // Handle location selection
            }} />
          </section>

          {/* Step 2: Delivery Slot */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              2. Delivery Slot
            </h2>
            <DeliverySlotSelector />
          </section>

          {/* Step 3: Payment */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              3. Payment Method
            </h2>
            {/* Payment selector */}
          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <OrderSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔌 API Routes

### 1. Validate Delivery Address

```typescript
// src/app/api/checkout/validate-address/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const { latitude, longitude } = await request.json();

  // Get active delivery zones
  const zones = await db.deliveryZone.findMany({
    where: { isActive: true },
  });

  // Check if point is in any zone
  for (const zone of zones) {
    if (isPointInPolygon({ lat: latitude, lng: longitude }, zone.boundaries)) {
      return NextResponse.json({
        valid: true,
        zone: {
          id: zone.id,
          name: zone.name,
          deliveryCharge: zone.deliveryCharge,
        },
      });
    }
  }

  return NextResponse.json({
    valid: false,
    error: 'Delivery not available in your area',
  });
}

// Point-in-polygon algorithm
function isPointInPolygon(point: {lat: number, lng: number}, polygon: any) {
  let inside = false;
  const coords = JSON.parse(polygon);
  
  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const xi = coords[i].lat, yi = coords[i].lng;
    const xj = coords[j].lat, yj = coords[j].lng;
    
    const intersect = ((yi > point.lng) !== (yj > point.lng))
      && (point.lat < (xj - xi) * (point.lng - yi) / (yj - yi) + xi);
    
    if (intersect) inside = !inside;
  }
  
  return inside;
}
```

### 2. Create Order

```typescript
// src/app/api/checkout/create-order/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();
  const data = await request.json();

  // Get cart
  const cart = await db.cart.findUnique({
    where: { id: data.cartId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  // Validate delivery zone
  const zoneValidation = await fetch('/api/checkout/validate-address', {
    method: 'POST',
    body: JSON.stringify({
      latitude: data.latitude,
      longitude: data.longitude,
    }),
  });
  const { valid, zone } = await zoneValidation.json();

  if (!valid) {
    return NextResponse.json(
      { error: 'Delivery not available' },
      { status: 400 }
    );
  }

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = zone.deliveryCharge;
  const total = subtotal + deliveryCharge;

  // Create order
  const order = await db.order.create({
    data: {
      orderNumber: `ORD-${Date.now()}`,
      userId: session?.user?.id,
      status: 'pending',
      paymentStatus: 'pending',
      deliveryAddress: data.address,
      deliveryLat: data.latitude,
      deliveryLng: data.longitude,
      subtotal,
      deliveryCharge,
      total,
      currency: data.currency || 'USD',
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  // Clear cart
  await db.cartItem.deleteMany({ where: { cartId: cart.id } });

  // Send confirmation email (implement later)
  // await sendOrderConfirmationEmail(order);

  return NextResponse.json({ order });
}
```

---

## 🎯 Implementation Checklist

### Week 1: Setup & Database
- [ ] Get Google Maps API key
- [ ] Add environment variables
- [ ] Install dependencies
- [ ] Create database migration
- [ ] Run migration
- [ ] Test database models

### Week 2: Location & Maps
- [ ] Create LocationSelector component
- [ ] Implement GPS detection
- [ ] Add Google Maps display
- [ ] Add draggable marker
- [ ] Implement Places autocomplete
- [ ] Create geocoding API routes
- [ ] Test on mobile devices

### Week 3: Checkout Flow
- [ ] Create checkout page layout
- [ ] Add delivery slot selector
- [ ] Create order summary component
- [ ] Implement address validation
- [ ] Add delivery zone check
- [ ] Create order creation API
- [ ] Test end-to-end flow

### Week 4: Orders & Admin
- [ ] Create order history page
- [ ] Add order details page
- [ ] Implement order tracking
- [ ] Create admin order management
- [ ] Add order status updates
- [ ] Create delivery zone admin UI

### Week 5: Payments
- [ ] Implement COD payment
- [ ] Add Razorpay integration
- [ ] Create payment success page
- [ ] Add payment failure handling
- [ ] Implement webhooks

### Week 6: Polish
- [ ] Add email notifications
- [ ] Implement error handling
- [ ] Mobile optimization
- [ ] Performance testing
- [ ] Documentation

---

## 🚨 Common Issues & Solutions

### Issue 1: GPS Not Working

**Problem:** Location detection fails on some devices

**Solution:**
```typescript
// Always provide fallback
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    onSuccess,
    (error) => {
      // Show manual address entry
      setShowManualEntry(true);
    }
  );
} else {
  // GPS not supported
  setShowManualEntry(true);
}
```

### Issue 2: API Key Errors

**Problem:** Google Maps not loading

**Solution:**
1. Check API key is correct
2. Verify APIs are enabled in Google Cloud Console
3. Check domain restrictions
4. Ensure billing is enabled (free tier available)

### Issue 3: Delivery Zone Not Detecting

**Problem:** Address shows as out of zone

**Solution:**
```typescript
// Debug zone boundaries
console.log('Point:', { lat, lng });
console.log('Zones:', zones);
console.log('In zone:', isPointInPolygon(point, zone.boundaries));
```

---

## 📊 Testing Checklist

### Functional Testing
- [ ] GPS location detection works
- [ ] Map displays correctly
- [ ] Marker is draggable
- [ ] Address autocomplete works
- [ ] Delivery zone validation works
- [ ] Order creation succeeds
- [ ] Payment processing works
- [ ] Email notifications sent

### Mobile Testing
- [ ] Responsive design
- [ ] Touch interactions work
- [ ] GPS permission prompt
- [ ] Map performance
- [ ] Offline fallback

### Edge Cases
- [ ] GPS disabled
- [ ] Out of delivery zone
- [ ] Stock changes during checkout
- [ ] Payment failures
- [ ] Network errors

---

## 💡 Pro Tips

1. **Cache Geocoding Results**
   ```typescript
   // Save in database to avoid repeated API calls
   await db.address.update({
     where: { id },
     data: { latitude, longitude, formattedAddress }
   });
   ```

2. **Use Session Tokens**
   ```typescript
   // Reduce Places API costs
   const sessionToken = new google.maps.places.AutocompleteSessionToken();
   ```

3. **Lazy Load Maps**
   ```typescript
   // Only load when needed
   const { isLoaded } = useJsApiLoader({
     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
   });
   ```

4. **Validate Server-Side**
   ```typescript
   // Never trust client data
   const actualTotal = calculateTotal(cart);
   if (clientTotal !== actualTotal) {
     throw new Error('Price mismatch');
   }
   ```

---

## 📚 Resources

- **Documentation:** See `CHECKOUT_PLAN.md` for detailed specs
- **Google Maps:** https://developers.google.com/maps
- **Razorpay:** https://razorpay.com/docs/
- **Stripe:** https://stripe.com/docs

---

## 🎉 Next Steps

1. Read `CHECKOUT_PLAN.md` for full details
2. Setup Google Maps API key
3. Run database migration
4. Start with LocationSelector component
5. Build checkout flow step by step

**Questions?** Check the detailed plan in `CHECKOUT_PLAN.md`

---

**Last Updated:** 2025-01-27  
**Status:** Ready to implement  
**Estimated Time:** 6-8 weeks for full system
