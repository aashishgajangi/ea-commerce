-- AddCartItemUniqueConstraint
-- Ensures weight-based products are properly separated in cart

-- Step 1: Remove any duplicate cart items (keep most recent)
DELETE FROM cart_items 
WHERE id NOT IN (
  SELECT MAX(id) 
  FROM cart_items 
  GROUP BY "cartId", "productId", "variantId", "selectedWeight"
);

-- Step 2: Add unique constraint to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS "cart_items_cartId_productId_variantId_selectedWeight_key" 
ON "cart_items"("cartId", "productId", "variantId", "selectedWeight");
