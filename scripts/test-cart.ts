#!/usr/bin/env tsx
/**
 * Test Cart Functionality
 * Run with: npm run test:cart or npx tsx scripts/test-cart.ts
 */

async function testCart() {
  const baseUrl = 'http://localhost:3000';
  const sessionId = `test_${Date.now()}`;
  
  console.log('🧪 Testing Cart Functionality\n');
  console.log('='.repeat(50));
  
  try {
    // Test 1: Get empty cart
    console.log('\n✓ Test 1: Get empty cart...');
    const getResponse = await fetch(`${baseUrl}/api/cart?sessionId=${sessionId}`);
    const cartData = await getResponse.json();
    
    if (cartData.cart && cartData.summary.itemCount === 0) {
      console.log('  ✅ Empty cart retrieved successfully');
      console.log(`  Cart ID: ${cartData.cart.id}`);
    } else {
      throw new Error('Failed to get empty cart');
    }
    
    // Test 2: Get a product to add
    console.log('\n✓ Test 2: Fetching a product...');
    const productsResponse = await fetch(`${baseUrl}/api/products?limit=1`);
    const productsData = await productsResponse.json();
    
    if (!productsData.products || productsData.products.length === 0) {
      throw new Error('No products found. Please create products first.');
    }
    
    const product = productsData.products[0];
    console.log(`  ✅ Found product: ${product.name} (ID: ${product.id})`);
    
    // Test 3: Add item to cart
    console.log('\n✓ Test 3: Adding item to cart...');
    const addResponse = await fetch(`${baseUrl}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        quantity: 2,
        sessionId
      })
    });
    
    const addData = await addResponse.json();
    
    if (addResponse.ok && addData.cart && addData.summary.itemCount === 1) {
      console.log('  ✅ Item added successfully');
      console.log(`  Item count: ${addData.summary.itemCount}`);
      console.log(`  Total quantity: ${addData.summary.totalQuantity}`);
      console.log(`  Subtotal: $${addData.summary.subtotal}`);
    } else {
      throw new Error(`Failed to add item: ${addData.error || 'Unknown error'}`);
    }
    
    const itemId = addData.cart.items[0]?.id;
    
    // Test 4: Update item quantity
    if (itemId) {
      console.log('\n✓ Test 4: Updating item quantity...');
      const updateResponse = await fetch(`${baseUrl}/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 5 })
      });
      
      const updateData = await updateResponse.json();
      
      if (updateResponse.ok && updateData.cart.items[0].quantity === 5) {
        console.log('  ✅ Quantity updated successfully');
        console.log(`  New quantity: ${updateData.cart.items[0].quantity}`);
      } else {
        throw new Error('Failed to update quantity');
      }
    }
    
    // Test 5: Get cart with items
    console.log('\n✓ Test 5: Getting cart with items...');
    const getFullResponse = await fetch(`${baseUrl}/api/cart?sessionId=${sessionId}`);
    const fullCartData = await getFullResponse.json();
    
    if (fullCartData.cart.items.length > 0) {
      console.log('  ✅ Cart retrieved with items');
      console.log(`  Items: ${fullCartData.summary.itemCount}`);
      console.log(`  Total quantity: ${fullCartData.summary.totalQuantity}`);
    } else {
      throw new Error('Failed to retrieve cart with items');
    }
    
    // Test 6: Remove item
    if (itemId) {
      console.log('\n✓ Test 6: Removing item from cart...');
      const removeResponse = await fetch(`${baseUrl}/api/cart/items/${itemId}`, {
        method: 'DELETE'
      });
      
      const removeData = await removeResponse.json();
      
      if (removeResponse.ok && removeData.cart.items.length === 0) {
        console.log('  ✅ Item removed successfully');
        console.log(`  Cart is now empty`);
      } else {
        throw new Error('Failed to remove item');
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests passed! Cart is working correctly.\n');
    
  } catch (error) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ Test failed:', error);
    console.error('='.repeat(50) + '\n');
    process.exit(1);
  }
}

// Run tests
testCart();
