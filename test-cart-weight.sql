-- Check cart items with weight separation
SELECT 
  ci.id as cart_item_id,
  ci.productId,
  p.name as product_name,
  ci.selectedWeight,
  ci.quantity,
  ci.price,
  ci.cartId
FROM CartItem ci
JOIN Product p ON ci.productId = p.id
ORDER BY ci.productId, ci.selectedWeight;

-- Check if there are duplicate items that should be separate
SELECT 
  productId,
  selectedWeight,
  COUNT(*) as count,
  STRING_AGG(id, ', ') as cart_item_ids
FROM CartItem
GROUP BY productId, selectedWeight
HAVING COUNT(*) > 1;
