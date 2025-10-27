# 🛒 Checkout System Plan - GPS + Google Places API Integration

## 📋 Project Understanding

### Current State Analysis

**✅ What We Have:**
- Complete shopping cart system (guest + authenticated users)
- Product management with variants and weight-based pricing
- User authentication (email + OAuth)
- Address model in database (CustomerProfile → Address)
- Dynamic currency support (20 currencies)
- PWA support (offline capability)
- Theme customization system
- Redis caching layer

**🎯 What We Need:**
- Multi-step checkout flow
- GPS + Google Places API for delivery address
- Real-time location detection (like Zomato/Swiggy)
- Order management system
- Payment gateway integration
- Delivery zone validation
- Order tracking

---

## 🗺️ Checkout Flow Design (Zomato/Swiggy Style)

### User Journey

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: DELIVERY ADDRESS (GPS + Google Places)             │
├─────────────────────────────────────────────────────────────┤
│  • Detect current location (GPS)                            │
│  • Show map with marker                                     │
│  • Google Places autocomplete for search                    │
│  • Manual address entry with autocomplete                   │
│  • Save address for future orders                           │
│  • Delivery zone validation                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: DELIVERY SLOT & INSTRUCTIONS                       │
├─────────────────────────────────────────────────────────────┤
│  • Select delivery date/time slot                           │
│  • Add delivery instructions                                │
│  • Contact phone number                                     │
│  • Alternative contact (optional)                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: ORDER SUMMARY & PAYMENT                            │
├─────────────────────────────────────────────────────────────┤
│  • Cart items review                                        │
│  • Delivery charges calculation                             │
│  • Apply coupon/promo code                                  │
│  • Payment method selection                                 │
│  • Place order                                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: ORDER CONFIRMATION                                 │
├─────────────────────────────────────────────────────────────┤
│  • Order ID & tracking link                                 │
│  • Estimated delivery time                                  │
│  • Order details                                            │
│  • Email/SMS notification                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema Updates

### New Models Required

```prisma
// Order model for customer orders
model Order {
  id                String      @id @default(cuid())
  orderNumber       String      @unique // ORD-20250127-001
  
  // Customer info
  userId            String?     // Nullable for guest checkout
  guestEmail        String?     // For guest orders
  guestPhone        String?     // For guest orders
  
  // Order status
  status            String      @default("pending") // pending, confirmed, preparing, out_for_delivery, delivered, cancelled
  paymentStatus     String      @default("pending") // pending, paid, failed, refunded
  
  // Delivery address (snapshot at order time)
  deliveryAddress   Json        // Full address object with GPS coordinates
  deliveryLat       Float?      // Latitude for map display
  deliveryLng       Float?      // Longitude for map display
  deliveryZone      String?     // Zone ID for delivery charge calculation
  
  // Delivery details
  deliveryDate      DateTime?   // Scheduled delivery date
  deliverySlot      String?     // Morning, Afternoon, Evening
  deliveryInstructions String?  @db.Text
  contactPhone      String
  alternatePhone    String?
  
  // Pricing (snapshot at order time)
  subtotal          Float       // Cart subtotal
  deliveryCharge    Float       @default(0)
  discount          Float       @default(0)
  tax               Float       @default(0)
  total             Float       // Final amount
  currency          String      @default("USD")
  
  // Payment details
  paymentMethod     String?     // cod, card, upi, wallet
  paymentId         String?     // Payment gateway transaction ID
  paymentData       Json?       // Additional payment info
  
  // Timestamps
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  confirmedAt       DateTime?
  deliveredAt       DateTime?
  cancelledAt       DateTime?
  
  // Relations
  items             OrderItem[]
  statusHistory     OrderStatusHistory[]
  
  // Indexes
  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([paymentStatus])
  @@index([createdAt])
  @@map("orders")
}

// Order items (snapshot of cart at order time)
model OrderItem {
  id                String      @id @default(cuid())
  orderId           String
  
  // Product snapshot (in case product changes/deleted)
  productId         String
  productName       String
  productSlug       String
  productImage      String?
  
  // Variant info
  variantId         String?
  variantName       String?
  
  // Pricing snapshot
  price             Float       // Price per unit at order time
  quantity          Int
  selectedWeight    Float?      // For weight-based products
  subtotal          Float       // price * quantity
  
  // Timestamps
  createdAt         DateTime    @default(now())
  
  // Relations
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}

// Order status history for tracking
model OrderStatusHistory {
  id          String      @id @default(cuid())
  orderId     String
  
  status      String      // Status value
  comment     String?     @db.Text
  updatedBy   String?     // Admin user ID
  
  createdAt   DateTime    @default(now())
  
  // Relations
  order       Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@index([orderId])
  @@index([createdAt])
  @@map("order_status_history")
}

// Delivery zones for area-based delivery charges
model DeliveryZone {
  id            String      @id @default(cuid())
  name          String      // "Zone A - City Center"
  description   String?     @db.Text
  
  // Geographic boundaries (polygon coordinates)
  boundaries    Json        // Array of {lat, lng} points
  
  // Delivery settings
  isActive      Boolean     @default(true)
  deliveryCharge Float      @default(0)
  minOrderValue Float?      // Minimum order value for this zone
  maxOrderValue Float?      // Maximum order value (if any)
  
  // Delivery time
  estimatedTime String?     // "30-45 mins"
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  @@index([isActive])
  @@map("delivery_zones")
}

// Update existing Address model for GPS support
model Address {
  id            String   @id @default(cuid())
  customerId    String
  
  // Address details
  type          String   @default("shipping") // shipping, billing
  isDefault     Boolean  @default(false)
  
  // Recipient information
  firstName     String
  lastName      String
  company       String?
  
  // Address fields
  streetAddress String
  apartment     String?
  landmark      String?  // NEW: For easier delivery
  city          String
  state         String
  postalCode    String
  country       String   @default("IN")
  
  // GPS coordinates (NEW)
  latitude      Float?
  longitude     Float?
  placeId       String?  // Google Places ID
  formattedAddress String? @db.Text // Full formatted address from Google
  
  // Contact
  phone         String?
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  customer      CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  @@index([customerId])
  @@index([type])
  @@index([isDefault])
  @@map("addresses")
}

// Coupon/Promo code model
model Coupon {
  id              String      @id @default(cuid())
  code            String      @unique
  description     String?     @db.Text
  
  // Discount settings
  discountType    String      // percentage, fixed
  discountValue   Float       // 10 (for 10%) or 100 (for ₹100)
  
  // Validity
  isActive        Boolean     @default(true)
  validFrom       DateTime?
  validUntil      DateTime?
  
  // Usage limits
  maxUses         Int?        // Total uses allowed
  usedCount       Int         @default(0)
  maxUsesPerUser  Int?        // Per user limit
  
  // Conditions
  minOrderValue   Float?      // Minimum order value
  maxDiscount     Float?      // Maximum discount amount
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  @@index([code])
  @@index([isActive])
  @@map("coupons")
}
```

---

## 🔌 Google Maps & Places API Integration

### Required APIs

1. **Google Maps JavaScript API**
   - Display interactive map
   - Show delivery location marker
   - Draw delivery zones

2. **Google Places API**
   - Autocomplete address search
   - Place details (coordinates, formatted address)
   - Geocoding (address → coordinates)

3. **Geolocation API (Browser)**
   - Get user's current location
   - No API key needed (browser native)

### Environment Variables

```env
# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Restrict API key to:
# - Maps JavaScript API
# - Places API
# - Geocoding API
```

### API Key Setup Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create API key
5. Restrict API key:
   - Application restrictions: HTTP referrers
   - Add your domain: `yourdomain.com/*`
   - API restrictions: Select only required APIs
6. Add to `.env.local`

---

## 🎨 UI Components Design

### 1. Location Selector Component

```tsx
// src/components/checkout/LocationSelector.tsx

Features:
- "Use Current Location" button (GPS)
- Google Maps display with draggable marker
- Google Places autocomplete search bar
- Manual address form (fallback)
- Saved addresses list (for logged-in users)
- Delivery zone indicator (in zone / out of zone)
- Address validation
```

### 2. Delivery Slot Selector

```tsx
// src/components/checkout/DeliverySlotSelector.tsx

Features:
- Date picker (today, tomorrow, custom)
- Time slot selection (Morning, Afternoon, Evening)
- Delivery instructions textarea
- Contact phone input with validation
- Alternative contact (optional)
```

### 3. Order Summary Component

```tsx
// src/components/checkout/OrderSummary.tsx

Features:
- Cart items list (read-only)
- Pricing breakdown:
  - Subtotal
  - Delivery charge (based on zone)
  - Discount (if coupon applied)
  - Tax (if applicable)
  - Total
- Coupon code input
- Payment method selector
- Place Order button
```

### 4. Order Tracking Component

```tsx
// src/components/orders/OrderTracking.tsx

Features:
- Order status timeline
- Live map with delivery person location (future)
- Estimated delivery time
- Contact delivery person (future)
- Order details
```

---

## 🛣️ Routes & Pages

### Frontend Routes

```
/checkout
  ├── /checkout/address          # Step 1: Delivery address
  ├── /checkout/delivery         # Step 2: Delivery slot
  ├── /checkout/payment          # Step 3: Payment
  └── /checkout/success/[orderId] # Step 4: Confirmation

/orders
  ├── /orders                    # Order history
  └── /orders/[orderId]          # Order details & tracking

/account/addresses                # Manage saved addresses
```

### API Routes

```
/api/checkout
  ├── POST /api/checkout/validate-address    # Validate delivery address
  ├── POST /api/checkout/calculate-delivery  # Calculate delivery charge
  ├── POST /api/checkout/apply-coupon        # Apply coupon code
  └── POST /api/checkout/create-order        # Create order

/api/orders
  ├── GET  /api/orders                       # List user orders
  ├── GET  /api/orders/[orderId]             # Get order details
  ├── POST /api/orders/[orderId]/cancel      # Cancel order
  └── GET  /api/orders/[orderId]/track       # Track order status

/api/admin/orders
  ├── GET    /api/admin/orders               # List all orders
  ├── GET    /api/admin/orders/[orderId]     # Get order details
  ├── PATCH  /api/admin/orders/[orderId]     # Update order status
  └── DELETE /api/admin/orders/[orderId]     # Delete order (admin only)

/api/admin/delivery-zones
  ├── GET    /api/admin/delivery-zones       # List zones
  ├── POST   /api/admin/delivery-zones       # Create zone
  ├── PUT    /api/admin/delivery-zones/[id]  # Update zone
  └── DELETE /api/admin/delivery-zones/[id]  # Delete zone

/api/admin/coupons
  ├── GET    /api/admin/coupons              # List coupons
  ├── POST   /api/admin/coupons              # Create coupon
  ├── PUT    /api/admin/coupons/[id]         # Update coupon
  └── DELETE /api/admin/coupons/[id]         # Delete coupon

/api/geocoding
  ├── POST /api/geocoding/address-to-coords  # Convert address to GPS
  └── POST /api/geocoding/coords-to-address  # Reverse geocoding
```

---

## 🔐 Security Considerations

### 1. API Key Protection

```typescript
// ✅ GOOD: Server-side geocoding
// src/app/api/geocoding/address-to-coords/route.ts
const response = await fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
);

// ⚠️ CAREFUL: Client-side Maps API
// Use NEXT_PUBLIC_ prefix but restrict by domain
const map = new google.maps.Map(document.getElementById('map'), {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
});
```

### 2. Delivery Zone Validation

```typescript
// Server-side validation
async function validateDeliveryAddress(lat: number, lng: number) {
  const zones = await db.deliveryZone.findMany({ where: { isActive: true } });
  
  for (const zone of zones) {
    if (isPointInPolygon({ lat, lng }, zone.boundaries)) {
      return { valid: true, zone };
    }
  }
  
  return { valid: false, error: 'Delivery not available in your area' };
}
```

### 3. Order Amount Validation

```typescript
// Prevent price manipulation
async function createOrder(cartId: string, deliveryZoneId: string) {
  // Recalculate everything server-side
  const cart = await getCart(cartId);
  const subtotal = calculateCartTotal(cart);
  const deliveryCharge = await getDeliveryCharge(deliveryZoneId);
  const total = subtotal + deliveryCharge;
  
  // Never trust client-sent amounts
  return { subtotal, deliveryCharge, total };
}
```

---

## 💳 Payment Gateway Integration

### Supported Payment Methods

1. **Cash on Delivery (COD)**
   - No integration needed
   - Mark as pending payment
   - Collect on delivery

2. **Razorpay (India)**
   - UPI, Cards, Wallets, Net Banking
   - Best for Indian market
   - Easy integration

3. **Stripe (International)**
   - Cards, Apple Pay, Google Pay
   - Global coverage
   - PCI compliant

4. **PayPal (Optional)**
   - International payments
   - Buyer protection

### Implementation Priority

```
Phase 1: COD only (MVP)
Phase 2: Razorpay (India focus)
Phase 3: Stripe (International)
Phase 4: PayPal (Optional)
```

---

## 📱 PWA Considerations

### Offline Support

```typescript
// Service worker caching strategy
- Cache checkout pages for offline access
- Store draft orders in IndexedDB
- Sync when online
- Show offline indicator
```

### GPS Permissions

```typescript
// Request location permission
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // Use coordinates
    },
    (error) => {
      // Fallback to manual address entry
    }
  );
}
```

### Push Notifications

```typescript
// Order status updates
- Order confirmed
- Out for delivery
- Delivered
- Cancelled
```

---

## 🚀 Implementation Phases

### Phase 1: Database & Schema (Week 1)
- [ ] Create Prisma migrations for new models
- [ ] Update Address model with GPS fields
- [ ] Create Order, OrderItem, OrderStatusHistory models
- [ ] Create DeliveryZone, Coupon models
- [ ] Run migrations and test

### Phase 2: Location & Maps (Week 2)
- [ ] Setup Google Maps API key
- [ ] Create LocationSelector component
- [ ] Implement GPS location detection
- [ ] Add Google Places autocomplete
- [ ] Create interactive map with marker
- [ ] Add delivery zone validation
- [ ] Create address management UI

### Phase 3: Checkout Flow (Week 3)
- [ ] Create multi-step checkout pages
- [ ] Implement address selection/creation
- [ ] Add delivery slot selector
- [ ] Create order summary component
- [ ] Implement coupon system
- [ ] Add order validation

### Phase 4: Order Management (Week 4)
- [ ] Create order creation API
- [ ] Implement order listing (customer)
- [ ] Create order details page
- [ ] Add order tracking UI
- [ ] Implement order cancellation
- [ ] Create admin order management

### Phase 5: Payment Integration (Week 5)
- [ ] Implement COD payment
- [ ] Add Razorpay integration
- [ ] Create payment success/failure handling
- [ ] Add payment webhooks
- [ ] Implement refund system

### Phase 6: Admin Features (Week 6)
- [ ] Create delivery zone management
- [ ] Add coupon management
- [ ] Implement order status updates
- [ ] Create order analytics dashboard
- [ ] Add bulk order operations

### Phase 7: Notifications (Week 7)
- [ ] Setup email templates
- [ ] Implement order confirmation emails
- [ ] Add SMS notifications (optional)
- [ ] Create push notifications
- [ ] Add WhatsApp notifications (optional)

### Phase 8: Testing & Polish (Week 8)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Documentation

---

## 📊 Delivery Zone Configuration

### Admin UI for Zones

```typescript
// /admin/delivery-zones

Features:
1. Map view with zone boundaries
2. Draw polygon tool for zone creation
3. Zone list with:
   - Name
   - Delivery charge
   - Estimated time
   - Active/Inactive toggle
4. Zone editor:
   - Name & description
   - Delivery charge
   - Min/max order value
   - Estimated delivery time
   - Boundary coordinates
```

### Zone Validation Algorithm

```typescript
// Point-in-polygon algorithm
function isPointInPolygon(point: {lat: number, lng: number}, polygon: Array<{lat: number, lng: number}>) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat, yi = polygon[i].lng;
    const xj = polygon[j].lat, yj = polygon[j].lng;
    
    const intersect = ((yi > point.lng) !== (yj > point.lng))
      && (point.lat < (xj - xi) * (point.lng - yi) / (yj - yi) + xi);
    
    if (intersect) inside = !inside;
  }
  return inside;
}
```

---

## 🎯 Key Features Summary

### Customer Features
✅ GPS-based location detection  
✅ Google Places autocomplete  
✅ Interactive map with draggable marker  
✅ Saved addresses management  
✅ Delivery zone validation  
✅ Delivery slot selection  
✅ Order tracking with status timeline  
✅ Coupon/promo code support  
✅ Multiple payment methods  
✅ Order history  
✅ Order cancellation  
✅ Email/SMS notifications  

### Admin Features
✅ Order management dashboard  
✅ Order status updates  
✅ Delivery zone configuration  
✅ Coupon management  
✅ Order analytics  
✅ Bulk operations  
✅ Customer order history  
✅ Payment tracking  
✅ Refund management  

---

## 💰 Cost Estimation

### Google Maps API Pricing

**Free Tier (Monthly):**
- Maps JavaScript API: $200 credit (28,000 loads)
- Places API: $200 credit (varies by request type)
- Geocoding API: $200 credit (40,000 requests)

**Typical Usage (1000 orders/month):**
- Map loads: ~2000 (checkout pages)
- Autocomplete: ~5000 requests
- Geocoding: ~1000 requests
- **Total: ~$5-10/month** (well within free tier)

### Scaling Considerations

**10,000 orders/month:**
- Map loads: ~20,000
- Autocomplete: ~50,000
- Geocoding: ~10,000
- **Total: ~$50-100/month**

**Optimization Tips:**
1. Cache geocoding results in database
2. Use session tokens for autocomplete
3. Implement map lazy loading
4. Restrict API key by domain

---

## 📚 Libraries & Dependencies

```json
{
  "dependencies": {
    "@googlemaps/js-api-loader": "^1.16.2",
    "@react-google-maps/api": "^2.19.2",
    "razorpay": "^2.9.2",
    "stripe": "^14.10.0",
    "nodemailer": "^6.9.7",
    "qrcode": "^1.5.3",
    "pdf-lib": "^1.17.1"
  }
}
```

---

## 🔄 Migration Strategy

### From Cart to Order

```typescript
async function convertCartToOrder(cartId: string, checkoutData: CheckoutData) {
  // 1. Get cart with items
  const cart = await getCart(cartId);
  
  // 2. Validate delivery address
  const { valid, zone } = await validateDeliveryAddress(
    checkoutData.latitude,
    checkoutData.longitude
  );
  
  if (!valid) throw new Error('Delivery not available');
  
  // 3. Calculate totals
  const subtotal = calculateCartTotal(cart);
  const deliveryCharge = zone.deliveryCharge;
  const discount = await calculateDiscount(checkoutData.couponCode, subtotal);
  const total = subtotal + deliveryCharge - discount;
  
  // 4. Create order
  const order = await db.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: cart.userId,
      deliveryAddress: checkoutData.address,
      deliveryLat: checkoutData.latitude,
      deliveryLng: checkoutData.longitude,
      deliveryZone: zone.id,
      subtotal,
      deliveryCharge,
      discount,
      total,
      currency: checkoutData.currency,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          productSlug: item.product.slug,
          productImage: item.product.images[0]?.url,
          variantId: item.variantId,
          variantName: item.variant?.name,
          price: item.price,
          quantity: item.quantity,
          selectedWeight: item.selectedWeight,
          subtotal: item.price * item.quantity
        }))
      }
    }
  });
  
  // 5. Clear cart
  await clearCart(cartId);
  
  // 6. Send confirmation email
  await sendOrderConfirmationEmail(order);
  
  return order;
}
```

---

## 🎨 UI/UX Best Practices

### 1. Progressive Disclosure
- Show only relevant information at each step
- Use collapsible sections for details
- Provide clear progress indicators

### 2. Error Handling
- Inline validation messages
- Clear error states
- Helpful error messages
- Retry mechanisms

### 3. Loading States
- Skeleton loaders for maps
- Progress indicators for API calls
- Optimistic UI updates
- Smooth transitions

### 4. Mobile-First Design
- Touch-friendly buttons (44x44px minimum)
- Large input fields
- Bottom sheet modals
- Sticky CTAs

### 5. Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

---

## 📈 Success Metrics

### Key Performance Indicators (KPIs)

1. **Checkout Completion Rate**
   - Target: >70%
   - Measure: Orders / Checkout starts

2. **Average Order Value (AOV)**
   - Track: Subtotal + delivery charge
   - Goal: Increase over time

3. **Delivery Zone Coverage**
   - Track: Orders by zone
   - Optimize: High-demand areas

4. **Payment Success Rate**
   - Target: >95%
   - Monitor: Failed payments

5. **Order Fulfillment Time**
   - Track: Order to delivery time
   - Goal: Meet estimated times

---

## 🚨 Edge Cases & Handling

### 1. GPS Not Available
- Fallback to manual address entry
- Show Google Places autocomplete
- Allow address selection from saved addresses

### 2. Out of Delivery Zone
- Show clear message
- Suggest nearby serviceable areas
- Collect email for future notifications

### 3. Stock Changes During Checkout
- Validate stock before order creation
- Show updated availability
- Allow cart modification

### 4. Payment Failures
- Retry mechanism
- Alternative payment methods
- Save order as pending

### 5. Duplicate Orders
- Prevent double submission
- Show confirmation before retry
- Idempotency keys for payments

---

## 📝 Next Steps

### Immediate Actions

1. **Setup Google Maps API**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```

2. **Create Database Migration**
   ```bash
   npx prisma migrate dev --name add_checkout_models
   ```

3. **Install Dependencies**
   ```bash
   npm install @googlemaps/js-api-loader @react-google-maps/api
   ```

4. **Create Base Components**
   - LocationSelector
   - DeliverySlotSelector
   - OrderSummary
   - OrderTracking

5. **Build API Routes**
   - Checkout validation
   - Order creation
   - Geocoding helpers

---

## 🎯 MVP Scope (Phase 1)

**Must Have:**
- ✅ GPS location detection
- ✅ Google Places autocomplete
- ✅ Manual address entry
- ✅ Delivery zone validation
- ✅ Order creation
- ✅ COD payment
- ✅ Order confirmation email
- ✅ Basic order tracking

**Can Wait:**
- ⏳ Multiple payment gateways
- ⏳ Advanced delivery slots
- ⏳ Live order tracking
- ⏳ SMS notifications
- ⏳ Coupon system
- ⏳ Order analytics

---

## 📖 References

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Razorpay Docs](https://razorpay.com/docs/)
- [Stripe Docs](https://stripe.com/docs)

---

**Last Updated:** 2025-01-27  
**Status:** Planning Phase  
**Next Review:** After Phase 1 completion
