'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  Upload,
  Package,
  Edit,
  Image as ImageIcon,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  categoryId: string | null;
  price: number;
  compareAtPrice: number | null;
  costPerItem: number | null;
  weightBasedPricing: boolean;
  weightSlotBase: number | null;
  weightSlotMin: number | null;
  weightSlotMax: number | null;
  trackInventory: boolean;
  stockQuantity: number;
  lowStockThreshold: number | null;
  isFeatured: boolean;
  isActive: boolean;
  status: string;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}

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

interface Category {
  id: string;
  name: string;
}

interface CategoryData {
  id: string;
  name: string;
  children?: CategoryData[];
}

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'images' | 'variants' | 'seo'>('details');

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  // Variant form state
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [variantForm, setVariantForm] = useState({
    name: '',
    sku: '',
    options: '{}',
    price: '',
    compareAtPrice: '',
    costPerItem: '',
    stockQuantity: '0',
    weight: '',
    isActive: true,
  });

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  }, [productId, router]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) return;
      const data = await response.json();

      const flattenCategories = (cats: CategoryData[]): Category[] => {
        let result: Category[] = [];
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
    fetchProduct();
    fetchCategories();
  }, [fetchProduct, fetchCategories]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showMediaLibrary) {
          setShowMediaLibrary(false);
        }
        if (showVariantForm) {
          setShowVariantForm(false);
          setEditingVariant(null);
        }
      }
    };

    if (showMediaLibrary || showVariantForm) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMediaLibrary, showVariantForm]);

  const handleSave = async () => {
    if (!product) return;

    setSaving(true);
    try {
      // Send only the product fields (not images or variants which are managed separately)
      // Ensure proper data types
      const updateData = {
        // Required fields
        name: product.name?.trim() || '',
        slug: product.slug?.trim() || '',
        price: Number(product.price) || 0,
        weightBasedPricing: Boolean(product.weightBasedPricing),
        trackInventory: Boolean(product.trackInventory),
        stockQuantity: Number(product.stockQuantity) || 0,
        isFeatured: Boolean(product.isFeatured),
        isActive: Boolean(product.isActive),
        status: product.status || 'draft',

        // Optional fields - send null values, validation will handle them
        sku: product.sku?.trim() || null,
        description: product.description?.trim() || null,
        shortDescription: product.shortDescription?.trim() || null,
        categoryId: product.categoryId || null,
        compareAtPrice: product.compareAtPrice !== null && product.compareAtPrice !== undefined ? Number(product.compareAtPrice) : null,
        costPerItem: product.costPerItem !== null && product.costPerItem !== undefined ? Number(product.costPerItem) : null,
        weightSlotBase: product.weightSlotBase !== null && product.weightSlotBase !== undefined ? Number(product.weightSlotBase) : null,
        weightSlotMin: product.weightSlotMin !== null && product.weightSlotMin !== undefined ? Number(product.weightSlotMin) : null,
        weightSlotMax: product.weightSlotMax !== null && product.weightSlotMax !== undefined ? Number(product.weightSlotMax) : null,
        lowStockThreshold: product.lowStockThreshold !== null && product.lowStockThreshold !== undefined ? Number(product.lowStockThreshold) : null,
        weight: product.weight !== null && product.weight !== undefined ? Number(product.weight) : null,
        length: product.length !== null && product.length !== undefined ? Number(product.length) : null,
        width: product.width !== null && product.width !== undefined ? Number(product.width) : null,
        height: product.height !== null && product.height !== undefined ? Number(product.height) : null,
        metaTitle: product.metaTitle?.trim() || null,
        metaDescription: product.metaDescription?.trim() || null,
        metaKeywords: product.metaKeywords?.trim() || null,
      };
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details) {
          // Show validation errors
          const validationErrors = errorData.details.map((issue: { path: string[]; message: string }) =>
            `${issue.path.join('.')}: ${issue.message}`
          ).join('\n');
          throw new Error(`Validation failed:\n${validationErrors}`);
        }
        throw new Error(errorData.error || 'Failed to save product');
      }
      
      alert('Product saved successfully');
      fetchProduct();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save product';
      alert(`Failed to save product: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt', product?.name || '');

        const response = await fetch(`/api/admin/products/${productId}/images`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload image');
      }
      fetchProduct();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSelectFromMedia = async (mediaUrl: string, alt?: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: mediaUrl,
          alt: alt || product?.name || '',
          order: 0,
          isPrimary: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to add image from media library');

      setShowMediaLibrary(false);
      fetchProduct();
    } catch (error) {
      console.error('Error adding image from media library:', error);
      alert('Failed to add image from media library');
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');
      fetchProduct();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSetPrimaryImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPrimary: true }),
      });

      if (!response.ok) throw new Error('Failed to set primary image');
      fetchProduct();
    } catch (error) {
      console.error('Error setting primary image:', error);
      alert('Failed to set primary image');
    }
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setVariantForm({
      name: variant.name,
      sku: variant.sku || '',
      options: variant.options,
      price: variant.price?.toString() || '',
      compareAtPrice: variant.compareAtPrice?.toString() || '',
      costPerItem: variant.costPerItem?.toString() || '',
      stockQuantity: variant.stockQuantity.toString(),
      weight: variant.weight?.toString() || '',
      isActive: variant.isActive,
    });
    setShowVariantForm(true);
  };

  const handleSaveVariant = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingVariant
        ? `/api/admin/products/${productId}/variants/${editingVariant.id}`
        : `/api/admin/products/${productId}/variants`;

      const method = editingVariant ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: variantForm.name,
          sku: variantForm.sku || undefined,
          options: variantForm.options || '{}',
          price: variantForm.price && variantForm.price.trim() ? parseFloat(variantForm.price) : undefined,
          compareAtPrice: variantForm.compareAtPrice && variantForm.compareAtPrice.trim() ? parseFloat(variantForm.compareAtPrice) : undefined,
          costPerItem: variantForm.costPerItem && variantForm.costPerItem.trim() ? parseFloat(variantForm.costPerItem) : undefined,
          stockQuantity: variantForm.stockQuantity && variantForm.stockQuantity.trim() ? parseInt(variantForm.stockQuantity) : 0,
          weight: variantForm.weight && variantForm.weight.trim() ? parseFloat(variantForm.weight) : undefined,
          isActive: variantForm.isActive,
        }),
      });

      if (!response.ok) throw new Error('Failed to save variant');

      setShowVariantForm(false);
      setEditingVariant(null);
      setVariantForm({
        name: '',
        sku: '',
        options: '{}',
        price: '',
        compareAtPrice: '',
        costPerItem: '',
        stockQuantity: '0',
        weight: '',
        isActive: true,
      });
      fetchProduct();
    } catch (error) {
      console.error('Error saving variant:', error);
      alert('Failed to save variant');
    }
  };

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm('Delete this variant?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}/variants/${variantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete variant');
      fetchProduct();
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert('Failed to delete variant');
    }
  };

  if (loading || !product) {
    return (
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/admin/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">Edit product details</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Product'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'details'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'images'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('images')}
          >
            Images ({product.images.length})
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'variants'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('variants')}
          >
            Variants ({product.variants.length})
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'seo'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('seo')}
          >
            SEO
          </button>
        </div>
      </div>

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      // Auto-generate slug from name
                      const autoSlug = newName
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');
                      
                      setProduct({
                        ...product,
                        name: newName,
                        slug: autoSlug || product.slug
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug * (auto-generated)</Label>
                  <Input
                    id="slug"
                    value={product.slug}
                    onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                    placeholder="product-slug"
                    required
                  />
                  <p className="text-xs text-gray-500">Automatically generated from product name, can be edited</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={product.sku || ''}
                    onChange={(e) => setProduct({ ...product, sku: e.target.value || null })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={product.categoryId || ''}
                    onChange={(e) =>
                      setProduct({ ...product, categoryId: e.target.value || null })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select a category (optional)</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <textarea
                  id="shortDescription"
                  value={product.shortDescription || ''}
                  onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={product.description || ''}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="weightBasedPricing"
                  checked={product.weightBasedPricing}
                  onChange={(e) => setProduct({ ...product, weightBasedPricing: e.target.checked })}
                />
                <Label htmlFor="weightBasedPricing">Weight-based pricing (price per kg)</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price * {product.weightBasedPricing ? '(per kg)' : ''}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare at Price</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    step="0.01"
                    value={product.compareAtPrice || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        compareAtPrice: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costPerItem">Cost per Item</Label>
                  <Input
                    id="costPerItem"
                    type="number"
                    step="0.01"
                    value={product.costPerItem || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        costPerItem: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>

              {product.weightBasedPricing && (
                <div className="space-y-2 md:col-span-2">
                  <Label>Weight Slot Configuration</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="weightSlotBase" className="text-sm">Slot Increment (kg)</Label>
                      <Input
                        id="weightSlotBase"
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={product.weightSlotBase || ''}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            weightSlotBase: e.target.value ? parseFloat(e.target.value) : null,
                          })
                        }
                        placeholder="0.5"
                      />
                      <p className="text-xs text-gray-500">e.g., 0.5 for 500g slots</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightSlotMin" className="text-sm">Minimum Weight (kg)</Label>
                      <Input
                        id="weightSlotMin"
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={product.weightSlotMin || ''}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            weightSlotMin: e.target.value ? parseFloat(e.target.value) : null,
                          })
                        }
                        placeholder="0.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightSlotMax" className="text-sm">Maximum Weight (kg)</Label>
                      <Input
                        id="weightSlotMax"
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={product.weightSlotMax || ''}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            weightSlotMax: e.target.value ? parseFloat(e.target.value) : null,
                          })
                        }
                        placeholder="5.0"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Configure weight slots for frontend selection. Leave empty for continuous weight selection.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="trackInventory"
                  checked={product.trackInventory}
                  onChange={(e) => setProduct({ ...product, trackInventory: e.target.checked })}
                />
                <Label htmlFor="trackInventory">Track inventory for this product</Label>
              </div>

              {product.trackInventory && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) =>
                        setProduct({ ...product, stockQuantity: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={product.lowStockThreshold || ''}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          lowStockThreshold: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={product.weight || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        weight: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.01"
                    value={product.length || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        length: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.01"
                    value={product.width || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        width: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    value={product.height || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        height: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={product.status}
                    onChange={(e) => setProduct({ ...product, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={product.isActive}
                    onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={product.isFeatured}
                    onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
                  />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === 'images' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload and manage product images</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button disabled={uploadingImage} asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload Images'}
                    </span>
                  </Button>
                </label>
                <Button
                  variant="outline"
                  onClick={() => setShowMediaLibrary(true)}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Select from Media Library
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {product.images.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No images yet</p>
                <label htmlFor="image-upload">
                  <Button asChild>
                    <span>Upload Images</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {product.images
                  .sort((a, b) => a.order - b.order)
                  .map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" unoptimized={true} />
                        {image.isPrimary && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Primary
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {!image.isPrimary && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleSetPrimaryImage(image.id)}
                            >
                              Set Primary
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image.id)}
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
      )}

      {/* Variants Tab */}
      {activeTab === 'variants' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Product Variants</CardTitle>
                <CardDescription>Manage product variations (size, color, etc.)</CardDescription>
              </div>
              {!showVariantForm && (
                <Button onClick={() => setShowVariantForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showVariantForm ? (
              <form onSubmit={handleSaveVariant} className="space-y-4 mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">
                    {editingVariant ? 'Edit Variant' : 'New Variant'}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowVariantForm(false);
                      setEditingVariant(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Variant Name *</Label>
                    <Input
                      value={variantForm.name}
                      onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
                      placeholder="e.g., Small / Red"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                      value={variantForm.sku}
                      onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variantForm.price}
                      onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Compare at Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variantForm.compareAtPrice}
                      onChange={(e) =>
                        setVariantForm({ ...variantForm, compareAtPrice: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Quantity *</Label>
                    <Input
                      type="number"
                      value={variantForm.stockQuantity}
                      onChange={(e) =>
                        setVariantForm({ ...variantForm, stockQuantity: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variantForm.weight}
                      onChange={(e) => setVariantForm({ ...variantForm, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Options (JSON)</Label>
                    <Input
                      value={variantForm.options}
                      onChange={(e) => setVariantForm({ ...variantForm, options: e.target.value })}
                      placeholder='{"size": "Small", "color": "Red"}'
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="variantActive"
                      checked={variantForm.isActive}
                      onChange={(e) =>
                        setVariantForm({ ...variantForm, isActive: e.target.checked })
                      }
                    />
                    <Label htmlFor="variantActive">Active</Label>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Variant
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowVariantForm(false);
                      setEditingVariant(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : null}

            {product.variants.length === 0 && !showVariantForm ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No variants yet</p>
                <Button onClick={() => setShowVariantForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Variant
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{variant.name}</span>
                        {!variant.isActive && (
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {variant.sku && <span>SKU: {variant.sku}</span>}
                        {variant.price && <span>Price: ${variant.price.toFixed(2)}</span>}
                        <span>Stock: {variant.stockQuantity}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditVariant(variant)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteVariant(variant.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Optimize product for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={product.metaTitle || ''}
                onChange={(e) => setProduct({ ...product, metaTitle: e.target.value })}
                placeholder="SEO title for search engines"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <textarea
                id="metaDescription"
                value={product.metaDescription || ''}
                onChange={(e) => setProduct({ ...product, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                placeholder="SEO description for search engines"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input
                id="metaKeywords"
                value={product.metaKeywords || ''}
                onChange={(e) => setProduct({ ...product, metaKeywords: e.target.value })}
                placeholder="Comma-separated keywords"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Select from Media Library</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMediaLibrary(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Choose an image from your media library to add to this product
              </p>
            </div>
            <div className="p-6">
              <MediaLibrarySelector onSelect={handleSelectFromMedia} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Media Library Selector Component
interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt: string | null;
  title: string | null;
  createdAt: string;
}

function MediaLibrarySelector({ onSelect }: { onSelect: (url: string, alt?: string) => void }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: '1',
        limit: '12',
        type: 'image',
      });

      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error('Failed to fetch media');

      const data = await response.json();
      setMedia(data.media || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No images found. Upload some images first.
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {media.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-2 cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => onSelect(item.path, item.alt || undefined)}
            >
              <div className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                <Image
                  src={item.path}
                  alt={item.alt || item.originalName}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>
              <p className="text-xs mt-2 truncate">{item.originalName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}