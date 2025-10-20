# 💱 Currency Symbol Flash Fix

## Issue

After page refresh on product pages (e.g., `/products/sajuk-tup`), the currency symbol was flashing from **$ (USD)** → **₹ (INR)** briefly before showing the correct currency.

**Root Cause:** Same hydration mismatch issue as the theme - currency was being fetched **client-side** instead of **server-side**.

---

## Solution

### Changed: Server-Side Currency Loading

**Before:** ❌
```typescript
// ProductClient.tsx
const [currency, setCurrency] = useState<string>('USD'); // Default USD

useEffect(() => {
  const fetchCurrency = async () => {
    const response = await fetch('/api/admin/settings/general');
    const data = await response.json();
    setCurrency(data.currency || 'USD'); // Client-side fetch
  };
  fetchCurrency();
}, []);
```

**After:** ✅
```typescript
// page.tsx (Server Component)
const [product, generalSettings] = await Promise.all([
  getProductBySlug(slug),
  getGeneralSettings(), // ← Server-side fetch with Redis cache
]);

<ProductClient 
  product={product} 
  initialCurrency={generalSettings.currency || 'INR'} 
/>

// ProductClient.tsx (Client Component)
const [currency] = useState<string>(initialCurrency); // ← No fetch needed!
```

---

## Files Modified

### 1. `/src/app/products/[slug]/page.tsx`
- Added `getGeneralSettings()` import
- Fetch currency settings in parallel with product data
- Pass `initialCurrency` prop to ProductClient

### 2. `/src/app/products/[slug]/ProductClient.tsx`
- Updated `ProductContent` to accept `initialCurrency` prop
- Removed client-side `fetchCurrency()` function
- Removed `useEffect` hook for currency fetching
- Currency now initialized from server prop

---

## Benefits

✅ **No more currency flash** - Correct symbol from first render  
✅ **Uses Redis cache** - Already cached from settings optimization  
✅ **Faster page load** - One less API call  
✅ **Consistent pattern** - Same as theme/settings loading  

---

## Performance Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Currency API Call** | Every page load | None (server-side) | **100% reduction** |
| **Initial Render** | Shows USD | Shows correct currency | **Fixed!** |
| **Cache Hit** | N/A | Uses settings cache | **<2ms** |

---

## Testing

### Test Steps:
1. **Check currency setting**:
   ```bash
   npm run currency:check
   ```

2. **Set currency to INR** (if needed):
   ```bash
   npm run currency:inr
   ```

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

4. Visit product page: `http://localhost:3000/products/sajuk-tup`
5. Hard refresh (Ctrl+Shift+R or F5)
6. **Expected**: ₹ (rupee) symbol shows immediately
7. **Before fix**: Would flash $ then ₹

### Currency Settings:
- Set at: `/admin/setup` or via `npm run currency:inr`
- Cached for: 1 hour (Redis)
- Default: 'INR' (Indian Rupee)
- Check current: `npm run currency:check`

### Common Issue:
If still showing $ symbol, the currency in database is set to 'USD':
```bash
# Fix it with:
npm run currency:inr
```

---

## Related Fixes

This fix follows the same pattern as:
- **Theme Flash Fix** - ThemeProvider now server-side only
- **Settings Optimization** - 1-hour Redis caching
- **Menu Caching** - Eliminates DB queries

All these fixes eliminate hydration mismatches by loading data **server-side** and passing to client components as props.

---

## Pattern for Future Reference

**To avoid hydration flashes:**

1. ✅ **Load data server-side** (in page.tsx)
2. ✅ **Pass as props** to client components
3. ✅ **Use Redis cache** for performance
4. ❌ **Never fetch in useEffect** if needed for initial render

---

**Status:** ✅ Fixed  
**Build:** ✅ Passing  
**Date:** 2025-10-21
