-- Check if cart items are properly separated by weight
SELECT 
  id,
  "cartId",
  "productId",
  "variantId",
  quantity,
  price,
  "selectedWeight",
  "addedAt"
FROM cart_items
WHERE "cartId" IN (
  SELECT id FROM carts 
  ORDER BY "updatedAt" DESC 
  LIMIT 1
)
ORDER BY "productId", "selectedWeight";

-- Check for duplicate combinations (should return 0 rows)
SELECT 
  "cartId",
  "productId",
  "variantId",
  "selectedWeight",
  COUNT(*) as count
FROM cart_items
GROUP BY "cartId", "productId", "variantId", "selectedWeight"
HAVING COUNT(*) > 1;
