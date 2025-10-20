'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Minus, Plus, Star, MessageSquare } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';

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
  weightSlotBase: number | null;
  weightSlotMin: number | null;
  weightSlotMax: number | null;
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

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  status: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

interface ReviewsData {
  reviews: Review[];
  total: number;
  averageRating: number;
  ratingCounts: Record<number, number>;
}

function ProductContent({ product: initialProduct, initialCurrency }: { product: Product; initialCurrency: string }) {
  const { addToCart: addToCartContext } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<number>(initialProduct.weightSlotMin || initialProduct.weight || 1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [currency] = useState<string>(initialCurrency);
  const [addingToCart, setAddingToCart] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<ReviewsData | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  const product = initialProduct;

  if (!product || product.status !== 'published' || !product.isActive) {
    notFound();
  }

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/${product.slug}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [product.slug]);

  const primaryImage = product.images.find((img: ProductImage) => img.isPrimary) || product.images[0];
  const otherImages = product.images.filter((img: ProductImage) => !img.isPrimary);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
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

  // Generate weight options based on slots configuration
  const getWeightOptions = () => {
    if (!product.weightBasedPricing || !product.weightSlotBase || !product.weightSlotMin || !product.weightSlotMax) {
      return null; // No slots configured, use continuous input
    }

    const options = [];
    for (let w = product.weightSlotMin; w <= product.weightSlotMax; w += product.weightSlotBase) {
      options.push(w);
    }
    return options;
  };

  // Format weight display (kg or grams)
  const formatWeight = (weight: number) => {
    if (weight >= 1) {
      return `${weight}kg`;
    } else if (weight >= 0.1) {
      return `${(weight * 1000).toFixed(0)}g`;
    } else {
      return `${(weight * 1000).toFixed(1)}g`;
    }
  };

  // Handle weight changes
  const handleWeightChange = (weight: number) => {
    if (weight >= 0.1) {
      setSelectedWeight(weight);
    }
  };

  // Handle weight slot selection
  const handleWeightSlotSelect = (weight: number) => {
    setSelectedWeight(weight);
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

  // Handle add to cart
  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const success = await addToCartContext(
        product.id,
        selectedVariant?.id,
        quantity,
        product.weightBasedPricing ? selectedWeight : undefined
      );

      if (success) {
        alert(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      const response = await fetch(`/api/products/${product.slug}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewForm),
      });

      if (response.ok) {
        alert('Thank you for your review! It will be published after approval.');
        setReviewForm({ rating: 5, title: '', comment: '' });
        setShowReviewForm(false);
        // Refresh reviews
        const reviewsResponse = await fetch(`/api/products/${product.slug}/reviews`);
        if (reviewsResponse.ok) {
          const data = await reviewsResponse.json();
          setReviews(data);
        }
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Render star rating
  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
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

          {/* Rating Display */}
          {reviews && reviews.total > 0 && (
            <div className="flex items-center gap-3">
              {renderStars(reviews.averageRating)}
              <span className="text-sm text-gray-600">
                {reviews.averageRating.toFixed(1)} ({reviews.total} review{reviews.total !== 1 ? 's' : ''})
              </span>
            </div>
          )}

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
              <Label>Weight</Label>
              {(() => {
                const weightOptions = getWeightOptions();
                if (weightOptions && weightOptions.length > 0) {
                  // Show weight slots as buttons
                  return (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {weightOptions.map((weight) => (
                          <Button
                            key={weight}
                            type="button"
                            variant={selectedWeight === weight ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleWeightSlotSelect(weight)}
                            className="min-w-[60px]"
                          >
                            {formatWeight(weight)}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Select weight • Price: {formatPrice(calculatePrice(getEffectivePrice(), selectedWeight))}
                      </p>
                    </div>
                  );
                } else {
                  // Fallback to continuous input
                  return (
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
                  );
                }
              })()}
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
              disabled={isOutOfStock || addingToCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {addingToCart ? 'Adding...' : isOutOfStock ? 'Out of Stock' : `Add to Cart - ${formatPrice(calculatePrice(getEffectivePrice(), product.weightBasedPricing ? selectedWeight : null) * quantity)}`}
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

      {/* Reviews Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Customer Reviews
              {reviews && (
                <span className="text-sm font-normal text-gray-600">
                  ({reviews.total} review{reviews.total !== 1 ? 's' : ''})
                </span>
              )}
            </CardTitle>
            <Button
              variant="outline"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Write a Review
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="mt-1">
                    {renderStars(reviewForm.rating, true, (rating) =>
                      setReviewForm(prev => ({ ...prev, rating }))
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Review Title (Optional)</Label>
                  <Input
                    id="title"
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Summarize your experience"
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label htmlFor="comment">Your Review</Label>
                  <textarea
                    id="comment"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell others about your experience with this product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submittingReview}>
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {loadingReviews ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews && reviews.reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {(review.user?.name || review.user?.email || 'A')[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        {review.isVerifiedPurchase && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                      )}
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{review.comment}</p>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">
                          {review.user?.name || 'Anonymous'}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">
                Be the first to review this product!
              </p>
              <Button onClick={() => setShowReviewForm(true)}>
                Write the First Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductContent;