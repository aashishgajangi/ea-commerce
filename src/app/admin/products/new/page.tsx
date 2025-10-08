'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface CategoryData {
  id: string;
  name: string;
  children?: CategoryData[];
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    description: '',
    shortDescription: '',
    categoryId: '',
    price: '',
    compareAtPrice: '',
    costPerItem: '',
    weightBasedPricing: false,
    trackInventory: true,
    stockQuantity: '0',
    lowStockThreshold: '',
    status: 'draft',
    isActive: true,
    isFeatured: false,
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
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
    };

    fetchCategories();
  }, []);

  const handleNameChange = (name: string) => {
    // Auto-generate slug from name
    const autoSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData({ 
      ...formData, 
      name,
      slug: autoSlug || formData.slug
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          sku: formData.sku || undefined,
          description: formData.description || undefined,
          shortDescription: formData.shortDescription || undefined,
          categoryId: formData.categoryId || undefined,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice.trim() ? parseFloat(formData.compareAtPrice) : undefined,
          costPerItem: formData.costPerItem.trim() ? parseFloat(formData.costPerItem) : undefined,
          weightBasedPricing: formData.weightBasedPricing,
          trackInventory: formData.trackInventory,
          stockQuantity: formData.stockQuantity.trim() ? parseInt(formData.stockQuantity) : '',
          lowStockThreshold: formData.lowStockThreshold.trim() ? parseInt(formData.lowStockThreshold) : undefined,
          status: formData.status,
          isActive: formData.isActive,
          isFeatured: formData.isFeatured,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      const product = await response.json();
      alert('Product created successfully');
      router.push(`/admin/products/${product.id}`);
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
      alert(`Failed to create product: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>Fill in the product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder="e.g., Wireless Headphones"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug * (auto-generated)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="wireless-headphones"
                />
                <p className="text-xs text-gray-500">Generated from name, can be edited</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="PROD-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
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

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price * {formData.weightBasedPricing ? '(per kg)' : ''}
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="weightBasedPricing"
                    checked={formData.weightBasedPricing}
                    onChange={(e) => setFormData({ ...formData, weightBasedPricing: e.target.checked })}
                  />
                  <Label htmlFor="weightBasedPricing" className="text-sm">Weight-based pricing (price per kg)</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Initial Stock</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  placeholder="Brief product description..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                  placeholder="Full product description..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="space-y-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Creating...' : 'Create Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/products')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}