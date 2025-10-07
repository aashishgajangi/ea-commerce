'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Package, Eye, Copy } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  stockQuantity: number;
  status: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string | null;
  category: { id: string; name: string } | null;
  images: Array<{ id: string; url: string; isPrimary: boolean; alt: string | null }>;
  variants: Array<{ id: string; name: string; stockQuantity: number }>;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

interface CategoryData {
  id: string;
  name: string;
  children?: CategoryData[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleting, setDeleting] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        limit: '20',
        offset: '0',
      });

      if (status !== 'all') params.append('status', status);
      if (categoryFilter !== 'all') params.append('categoryId', categoryFilter);

      const response = await fetch(`/api/admin/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const data: ProductsResponse = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [status, search, categoryFilter]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) return;
      const data = await response.json();
      
      // Flatten categories
      const flattenCategories = (cats: CategoryData[]): Array<{ id: string; name: string }> => {
        let result: Array<{ id: string; name: string }> = [];
        cats.forEach((cat) => {
          result.push({ id: cat.id, name: cat.name });
          if (cat.children && cat.children.length > 0) {
            result = result.concat(flattenCategories(cat.children));
          }
        });
        return result;
      };
      
      setCategories(flattenCategories(data.categories));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    if (!confirm('Create a duplicate of this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');

      const product = await response.json();

      // Create duplicate with only the basic product fields (exclude nested objects)
      // The API will automatically generate a unique slug from the name
      const duplicateData = {
        name: `${product.name} (Copy)`,
        sku: product.sku ? `${product.sku}-COPY` : undefined,
        description: product.description || undefined,
        shortDescription: product.shortDescription || undefined,
        categoryId: product.categoryId || undefined,
        price: product.price,
        compareAtPrice: product.compareAtPrice || undefined,
        costPerItem: product.costPerItem || undefined,
        weightBasedPricing: product.weightBasedPricing || false,
        trackInventory: product.trackInventory !== undefined ? product.trackInventory : true,
        stockQuantity: product.stockQuantity || 0,
        lowStockThreshold: product.lowStockThreshold || undefined,
        isFeatured: false, // Don't copy featured status
        isActive: product.isActive !== undefined ? product.isActive : true,
        status: 'draft', // Always create as draft
        weight: product.weight || undefined,
        length: product.length || undefined,
        width: product.width || undefined,
        height: product.height || undefined,
        metaTitle: product.metaTitle || undefined,
        metaDescription: product.metaDescription || undefined,
        metaKeywords: product.metaKeywords || undefined,
      };

      const duplicateResponse = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData),
      });

      if (!duplicateResponse.ok) {
        const errorData = await duplicateResponse.json();
        throw new Error(errorData.error || 'Failed to duplicate product');
      }

      const newProduct = await duplicateResponse.json();

      // Copy images to the new product
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          try {
            await fetch(`/api/admin/products/${newProduct.id}/images`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                url: image.url,
                alt: image.alt || newProduct.name,
                order: image.order,
                isPrimary: image.isPrimary,
              }),
            });
          } catch (error) {
            console.error('Error copying image:', error);
            // Continue with other images even if one fails
          }
        }
      }

      fetchProducts();
      alert('Product duplicated successfully!');
    } catch (error) {
      console.error('Error duplicating product:', error);
      alert(`Failed to duplicate product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Products</CardTitle>
              <CardDescription>
                {total} {total === 1 ? 'product' : 'products'} total
              </CardDescription>
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Product
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
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
                variant={status === 'published' ? 'default' : 'outline'}
                onClick={() => setStatus('published')}
                size="sm"
              >
                Published
              </Button>
              <Button
                variant={status === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatus('draft')}
                size="sm"
              >
                Draft
              </Button>
              <Button
                variant={status === 'archived' ? 'default' : 'outline'}
                onClick={() => setStatus('archived')}
                size="sm"
              >
                Archived
              </Button>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {search || status !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first product'}
              </p>
              {!search && status === 'all' && categoryFilter === 'all' && (
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Product
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => {
                const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
                const stockStatus = getStockStatus(product.stockQuantity);

                return (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                        {primaryImage ? (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt || product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              product.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : product.status === 'archived'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {product.status}
                          </span>
                          {product.isFeatured && (
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                              Featured
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${stockStatus.color}`}>
                            {stockStatus.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          {product.sku && <span>SKU: {product.sku}</span>}
                          {product.category && <span>Category: {product.category.name}</span>}
                          {product.variants.length > 0 && (
                            <span>{product.variants.length} variant(s)</span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="font-semibold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-gray-500 line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                          <span className="text-gray-600">Stock: {product.stockQuantity}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        {product.status === 'published' && (
                          <Link href={`/products/${product.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicate(product.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}