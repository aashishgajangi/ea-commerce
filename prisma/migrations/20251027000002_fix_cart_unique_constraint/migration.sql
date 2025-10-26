-- =====================================================
-- FIX CART UNIQUE CONSTRAINT
-- =====================================================
-- This migration properly implements the unique constraint for cart items
-- to prevent duplicate items with the same cart, product, variant, and weight
--
-- Steps:
-- 1. Remove the incorrect index created by previous migration
-- 2. Clean up any duplicate cart items (keep most recent)
-- 3. Add proper unique constraint as defined in schema

-- Step 1: Remove the old index if it exists
DROP INDEX IF EXISTS "cart_items_cartId_productId_variantId_selectedWeight_key";

-- Step 2: Remove any duplicate cart items (keep most recent)
-- This ensures the unique constraint can be added without conflicts
DELETE FROM cart_items 
WHERE id NOT IN (
  SELECT MAX(id) 
  FROM cart_items 
  GROUP BY "cartId", "productId", "variantId", "selectedWeight"
);

-- Step 3: Add proper unique constraint
-- Note: Prisma generates this as a unique constraint, not just an index
-- The constraint name follows Prisma's naming convention
ALTER TABLE "cart_items" 
ADD CONSTRAINT "cart_items_cartId_productId_variantId_selectedWeight_key" 
UNIQUE ("cartId", "productId", "variantId", "selectedWeight");
