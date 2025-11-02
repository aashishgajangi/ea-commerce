'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

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
  currency?: string;
  showPrice?: boolean;
  showAddToCart?: boolean;
  columnsMobile?: number;
  columnsTablet?: number;
  columnsDesktop?: number;
}

export default function ProductsGridBlock({
  title,
  subtitle,
  products,
  backgroundColor = 'var(--theme-background, #f9fafb)',
  textColor = 'var(--theme-text, #1a1a1a)',
  currency: initialCurrency = 'USD',
  showPrice = true,
  showAddToCart = true,
  columnsMobile = 1,
  columnsTablet = 2,
  columnsDesktop = 4,
}: ProductsGridBlockProps) {
  const [currency] = useState(initialCurrency);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

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
              style={{
                color: textColor,
              }}
            >
              {title}
            </h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto opacity-80"
              style={{
                color: textColor,
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className={`grid grid-cols-${columnsMobile} sm:grid-cols-${columnsTablet} md:grid-cols-${columnsDesktop} gap-6 mb-8`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative"
                >
                  {/* Out of Stock Badge */}
                  {product.stock <= 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                      Out of Stock
                    </div>
                  )}

                  {/* Sale Badge */}
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                      SALE
                    </div>
                  )}

                  {/* Product Image */}
                  <Link href={`/products/${product.slug}`} className="relative">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {product.image ? (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          quality={85}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    {showPrice && (
                      <div className="flex items-center gap-2 mb-3">
                        <p
                          className="text-xl font-bold"
                          style={{ color: 'var(--theme-primary, #0070f3)' }}
                        >
                          {formatPrice(product.price)}
                        </p>
                        
                        {/* Compare at Price */}
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Stock Status */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <p className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </p>
                    </div>

                    {/* Add to Cart Button - Always Visible at Bottom */}
                    {showAddToCart && (
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={product.stock <= 0 || addingToCart === product.id}
                        className="w-full mt-auto py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: product.stock <= 0 ? '#e5e7eb' : 'var(--theme-primary, #0070f3)',
                          color: product.stock <= 0 ? '#9ca3af' : '#ffffff',
                        }}
                      >
                        {addingToCart === product.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
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

    </>
  );
}
