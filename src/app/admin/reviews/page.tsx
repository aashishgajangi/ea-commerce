'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star, Check, X, Trash2, Search, X as XIcon, MessageSquare, ArrowLeft } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  product: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ReviewsResponse {
  reviews: Review[];
  total: number;
  limit: number;
  offset: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rating, setRating] = useState<number | 'all'>('all');
  const [productId, setProductId] = useState('all');
  const [products, setProducts] = useState<Array<{ id: string; name: string }>>([]);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        limit: '20',
        offset: '0',
      });

      if (status !== 'all') params.append('status', status);
      if (rating !== 'all') params.append('rating', rating.toString());
      if (productId !== 'all') params.append('productId', productId);

      const response = await fetch(`/api/admin/reviews?${params}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');

      const data: ReviewsResponse = await response.json();
      setReviews(data.reviews);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [status, search, rating, productId]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/products?limit=1000');
      if (!response.ok) return;
      const data = await response.json();

      setProducts(data.products.map((p: { id: string; name: string }) => ({ id: p.id, name: p.name })));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, [fetchReviews, fetchProducts]);

  const handleStatusChange = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setProcessing(reviewId);
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update review');

      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setProcessing(reviewId);
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete review');

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    } finally {
      setProcessing(null);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setRating('all');
    setProductId('all');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Product Reviews</h1>
          <p className="text-gray-600">Manage customer reviews and ratings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Reviews</CardTitle>
              <CardDescription>
                {total} {total === 1 ? 'review' : 'reviews'} total
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 relative min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reviews..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="ghost" onClick={clearFilters} size="sm">
                <XIcon className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={status === 'all' ? 'default' : 'outline'}
                onClick={() => setStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={status === 'pending' ? 'default' : 'outline'}
                onClick={() => setStatus('pending')}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={status === 'approved' ? 'default' : 'outline'}
                onClick={() => setStatus('approved')}
                size="sm"
              >
                Approved
              </Button>
              <Button
                variant={status === 'rejected' ? 'default' : 'outline'}
                onClick={() => setStatus('rejected')}
                size="sm"
              >
                Rejected
              </Button>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Products</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reviews List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
              <p className="text-gray-600">
                {search || status !== 'all' || rating !== 'all' || productId !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No reviews have been submitted yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {renderStars(review.rating)}
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                        {review.isVerifiedPurchase && (
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                            Verified Purchase
                          </span>
                        )}
                      </div>

                      <div className="mb-3">
                        {review.title && (
                          <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                        )}
                        <p className="text-gray-700 whitespace-pre-wrap">{review.comment}</p>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Product:</strong>{' '}
                          <Link
                            href={`/admin/products/${review.product.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {review.product.name}
                          </Link>
                        </p>
                        {review.user && (
                          <p>
                            <strong>Customer:</strong> {review.user.name || review.user.email}
                          </p>
                        )}
                        <p>
                          <strong>Submitted:</strong> {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 shrink-0">
                      {review.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(review.id, 'approved')}
                            disabled={processing === review.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(review.id, 'rejected')}
                            disabled={processing === review.id}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        disabled={processing === review.id}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}