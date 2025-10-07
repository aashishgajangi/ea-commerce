'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  isPrimary: boolean;
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string | null;
  options: string;
  price: number | null;
  compareAtPrice: number | null;
  costPerItem: number | null;
  stockQuantity: number;
  weight: number | null;
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  weightBasedPricing: boolean;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  stockQuantity: number;
  lowStockThreshold: number | null;
  status: string;
  isActive: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  category: {
    id: string;
    name: string;
  } | null;
}

function ProductContent({ product: initialProduct }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState<number>(initialProduct.weight || 1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const product = initialProduct;

  if (!product || product.status !== 'published' || !product.isActive) {
    notFound();
  }

  const primaryImage = product.images.find((img: ProductImage) => img.isPrimary) || product.images[0];
  const otherImages = product.images.filter((img: ProductImage) => !img.isPrimary);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAt: number | null) => {
    if (!compareAt || compareAt <= price) return null;
    return Math.round(((compareAt - price) / compareAt) * 100);
  };

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = product.lowStockThreshold && product.stockQuantity <= product.lowStockThreshold;

  // Calculate price based on weight if weight-based pricing is enabled
  const calculatePrice = (basePrice: number, weight?: number | null) => {
    if (product.weightBasedPricing && weight && weight > 0) {
      return basePrice * weight;
    }
    return basePrice;
  };

  // Get the effective price (product or selected variant)
  const getEffectivePrice = () => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price;
    }
    return product.price;
  };

  const getEffectiveCompareAtPrice = () => {
    if (selectedVariant && selectedVariant.compareAtPrice) {
      return selectedVariant.compareAtPrice;
    }
    return product.compareAtPrice;
  };

  // Handle weight changes
  const handleWeightChange = (weight: number) => {
    if (weight >= 0.1) {
      setSelectedWeight(weight);
    }
  };

  // Handle quantity changes
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement actual wishlist functionality
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Handle share
  const handleShare = async () => {
    const url = window.location.href;
    const title = product.name;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-24 w-24 text-gray-300" />
              </div>
            )}
            {discount && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded">
                Save {discount}%
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {otherImages.map((image: ProductImage) => (
                <div key={image.id} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-75">
                  <Image
                    src={image.url}
                    alt={image.alt || product.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.category && (
            <div>
              <Link href={`/products?category=${product.category.id}`} className="text-sm text-blue-600 hover:underline">
                {product.category.name}
              </Link>
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.sku && (
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(calculatePrice(getEffectivePrice(), product.weightBasedPricing ? selectedWeight : null))}
            </span>
            {getEffectiveCompareAtPrice() && getEffectiveCompareAtPrice()! > getEffectivePrice() && (
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(calculatePrice(getEffectiveCompareAtPrice()!, product.weightBasedPricing ? selectedWeight : null))}
              </span>
            )}
            {product.weightBasedPricing && (
              <span className="text-sm text-gray-600">
                ({formatPrice(getEffectivePrice())} per kg)
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-lg text-gray-700">{product.shortDescription}</p>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-yellow-600 font-semibold">
                Only {product.stockQuantity} left in stock!
              </span>
            ) : (
              <span className="text-green-600 font-semibold">In Stock</span>
            )}
          </div>

          {/* Weight Selector for Weight-based Pricing */}
          {product.weightBasedPricing && (
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeightChange(Math.max(0.1, selectedWeight - 0.1))}
                  disabled={selectedWeight <= 0.1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={selectedWeight}
                  onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0.1)}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleWeightChange(selectedWeight + 0.1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">kg</span>
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <Label>Options</Label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant: ProductVariant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stockQuantity === 0}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'border-blue-600 bg-blue-50'
                        : variant.stockQuantity === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-blue-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{variant.name}</div>
                    {variant.price && (
                      <div className="text-xs text-gray-600">
                        {formatPrice(calculatePrice(variant.price, product.weightBasedPricing ? selectedWeight : null))}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {variant.stockQuantity === 0 ? 'Out of Stock' : `${variant.stockQuantity} left`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isOutOfStock ? 'Out of Stock' : `Add to Cart - ${formatPrice(calculatePrice(getEffectivePrice(), product.weightBasedPricing ? selectedWeight : null) * quantity)}`}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlistToggle}
              className={isWishlisted ? 'text-red-600' : ''}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-gray-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-gray-600" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </CardContent>
        </Card>
      )}

      {/* Specifications */}
      <Card className="mb-12">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.weight && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{product.weight} kg</span>
              </div>
            )}
            {product.length && product.width && product.height && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">
                  {product.length} × {product.width} × {product.height} cm
                </span>
              </div>
            )}
            {product.sku && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
            )}
            {product.category && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Category:</span>
                <Link href={`/products?category=${product.category.id}`} className="font-medium text-blue-600 hover:underline">
                  {product.category.name}
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductContent;