'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  image: { url: string; alt: string } | null;
}

interface ProductsGridBlockProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  backgroundColor?: string;
  textColor?: string;
}

export default function ProductsGridBlock({
  title,
  subtitle,
  products,
  backgroundColor = 'var(--theme-background, #f9fafb)',
  textColor = 'var(--theme-text, #1a1a1a)',
}: ProductsGridBlockProps) {
  const [currency, setCurrency] = useState('USD');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Fetch currency from admin settings
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch('/api/admin/settings/general');
        const data = await response.json();
        setCurrency(data.currency || 'USD');
      } catch (error) {
        console.error('Failed to fetch currency:', error);
      }
    };
    fetchCurrency();
  }, []);

  // Format price with dynamic currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Add to cart handler
  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();

    if (product.stock <= 0) {
      alert('Product is out of stock');
      return;
    }

    setAddingToCart(product.id);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        // Show success (you can replace with toast notification)
        alert(`${product.name} added to cart!`);
        
        // Dispatch event to update cart count
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  // Quick view handler
  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Close quick view
  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      <section
        className="py-16"
        style={{
          backgroundColor,
        }}
      >
        <div className="container mx-auto px-4">
          {/* Title */}
          {title && (
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{ color: textColor }}
            >
              {title}
            </h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80"
              style={{ color: textColor }}
            >
              {subtitle}
            </p>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                >
                  {/* Out of Stock Badge */}
                  {product.stock <= 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      Out of Stock
                    </div>
                  )}

                  {/* Sale Badge */}
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      SALE
                    </div>
                  )}

                  <Link href={`/products/${product.slug}`}>
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {product.image ? (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      {/* Quick Action Buttons (Show on Hover) */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        {/* Quick View */}
                        <button
                          onClick={(e) => handleQuickView(product, e)}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-110"
                          title="Quick View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        {/* Add to Cart */}
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={product.stock <= 0 || addingToCart === product.id}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Add to Cart"
                        >
                          {addingToCart === product.id ? (
                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <ShoppingCart className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <p
                          className="text-lg font-bold"
                          style={{ color: 'var(--theme-primary, #0070f3)' }}
                        >
                          {formatPrice(product.price)}
                        </p>
                        
                        {/* Compare at Price */}
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </p>
                        )}
                      </div>

                      {/* Stock Status */}
                      <p className={`text-xs mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-8">No featured products available</p>
          )}

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--theme-primary, #0070f3)',
                color: '#ffffff',
              }}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex items-center justify-center p-4"
          onClick={closeQuickView}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                className="float-right text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  {quickViewProduct.image ? (
                    <Image
                      src={quickViewProduct.image.url}
                      alt={quickViewProduct.image.alt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">{quickViewProduct.name}</h2>
                  
                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <p
                      className="text-3xl font-bold"
                      style={{ color: 'var(--theme-primary, #0070f3)' }}
                    >
                      {formatPrice(quickViewProduct.price)}
                    </p>
                    {quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price && (
                      <p className="text-xl text-gray-500 line-through">
                        {formatPrice(quickViewProduct.compareAtPrice)}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <p className={`text-sm mb-6 ${quickViewProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : 'Out of stock'}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => handleAddToCart(quickViewProduct, e)}
                      disabled={quickViewProduct.stock <= 0 || addingToCart === quickViewProduct.id}
                      className="flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--theme-primary, #0070f3)',
                      }}
                    >
                      {addingToCart === quickViewProduct.id ? 'Adding...' : 'Add to Cart'}
                    </button>

                    <Link
                      href={`/products/${quickViewProduct.slug}`}
                      className="px-6 py-3 border-2 font-semibold rounded-lg transition-all text-center"
                      style={{
                        borderColor: 'var(--theme-primary, #0070f3)',
                        color: 'var(--theme-primary, #0070f3)',
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
