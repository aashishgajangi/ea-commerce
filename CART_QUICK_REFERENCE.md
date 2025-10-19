# Cart System - Quick Reference

## 🚀 Quick Start

### Add Cart to Product Page
```tsx
import { useCart } from '@/components/cart/CartContext';

const { addToCart } = useCart();
await addToCart(productId, variantId, quantity, selectedWeight);
```

### Show Cart Count
```tsx
import { useCart } from '@/components/cart/CartContext';

const { cartCount } = useCart();
return <span>Cart: {cartCount}</span>;
```

### Refresh Cart
```tsx
const { refreshCart } = useCart();
await refreshCart();
```

---

## 📋 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart` | Add item |
| DELETE | `/api/cart` | Clear cart |
| PUT | `/api/cart/items/[id]` | Update quantity |
| DELETE | `/api/cart/items/[id]` | Remove item |
| POST | `/api/cart/merge` | Merge carts |

---

## 🔑 Key Functions

### Cart Library (`src/lib/cart.ts`)

```typescript
// Get or create cart
const cart = await getOrCreateCart(userId, sessionId);

// Add item to cart
const result = await addToCart(cartId, {
  productId: 'prod_123',
  variantId: 'var_456', // optional
  quantity: 2,
  selectedWeight: 1.5 // optional
});

// Update item quantity
await updateCartItem(itemId, newQuantity);

// Remove item
await removeFromCart(itemId);

// Clear cart
await clearCart(cartId);

// Calculate totals
const summary = calculateCartSummary(cart);

// Merge guest cart after login
await mergeGuestCartWithUserCart(sessionId, userId);
```

---

## 🎨 Components

### CartIcon
```tsx
import CartIcon from '@/components/cart/CartIcon';

<CartIcon /> // Shows cart count badge
```

### CartContext
```tsx
import { CartProvider } from '@/components/cart/CartContext';

<CartProvider>
  {children}
</CartProvider>
```

---

## 🗂️ File Locations

### Backend
- `src/lib/cart.ts` - Core library
- `src/app/api/cart/route.ts` - Main API
- `src/app/api/cart/items/[itemId]/route.ts` - Item operations
- `src/app/api/cart/merge/route.ts` - Merge API

### Frontend
- `src/components/cart/CartContext.tsx` - State management
- `src/components/cart/CartIcon.tsx` - Header icon
- `src/app/cart/page.tsx` - Cart page
- `src/app/cart/CartClient.tsx` - Cart UI

---

## 💡 Common Patterns

### Add to Cart with Feedback
```tsx
const [loading, setLoading] = useState(false);
const { addToCart } = useCart();

const handleAdd = async () => {
  setLoading(true);
  try {
    const success = await addToCart(productId);
    if (success) {
      toast.success('Added to cart!');
    }
  } finally {
    setLoading(false);
  }
};
```

### Direct API Call (Guest User)
```typescript
const sessionId = localStorage.getItem('guestSessionId');

const response = await fetch('/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId,
    quantity: 1,
    sessionId
  })
});
```

---

## 🔧 Configuration

### Guest Session Expiry
File: `src/lib/cart.ts`
```typescript
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 30); // Change 30 to desired days
```

### Redis Cache TTL
File: `src/lib/cart.ts`
```typescript
await redis.del(`cart:${cartId}`); // Manual invalidation
```

---

## 🐛 Debugging

### Check Cart Data
```typescript
// In browser console
localStorage.getItem('guestSessionId')
```

### API Testing
```bash
# Get cart
curl http://localhost:3000/api/cart?sessionId=guest_123

# Add item
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"prod_123","quantity":1,"sessionId":"guest_123"}'
```

---

## ⚠️ Troubleshooting

### Cart not showing?
1. Check CartProvider is in layout
2. Verify useCart is called inside provider
3. Check browser console for errors

### Items not adding?
1. Verify product is active
2. Check stock availability
3. Ensure variant exists (if using variants)

### Count not updating?
1. Call refreshCart() manually
2. Check network tab for API errors
3. Verify sessionId in localStorage

---

## 📊 Response Formats

### Cart Object
```json
{
  "id": "cart_123",
  "userId": "user_456",
  "items": [
    {
      "id": "item_789",
      "productId": "prod_abc",
      "variantId": "var_def",
      "quantity": 2,
      "price": 29.99,
      "product": {
        "name": "Product Name",
        "slug": "product-slug",
        "images": [...]
      }
    }
  ]
}
```

### Cart Summary
```json
{
  "subtotal": 59.98,
  "itemCount": 1,
  "totalQuantity": 2
}
```

---

## 🎯 Next Steps

After cart is working, integrate:
1. Checkout flow
2. Payment processing
3. Order creation
4. Coupon codes
5. Shipping calculator

---

## 📚 Full Documentation

See `CART_IMPLEMENTATION.md` for complete details.
