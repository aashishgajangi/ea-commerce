'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, FolderTree, Save, X, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  order: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  parent: { id: string; name: string } | null;
  children: Category[];
}

interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  parentId: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: '',
    parentId: '',
    isActive: true,
    metaTitle: '',
    metaDescription: '',
  });
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        view: 'hierarchy',
        search
      });
      const response = await fetch(`/api/admin/categories?${params}`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete category');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      // Clean up form data - convert empty strings to undefined
      const payload = {
        name: formData.name,
        description: formData.description || undefined,
        image: formData.image || undefined,
        parentId: formData.parentId || undefined,
        isActive: formData.isActive,
        metaTitle: formData.metaTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save category');
      }

      setShowForm(false);
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        parentId: '',
        isActive: true,
        metaTitle: '',
        metaDescription: '',
      });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      parentId: '',
      isActive: true,
      metaTitle: '',
      metaDescription: '',
    });
  };

  const renderCategoryTree = (cats: Category[], level = 0) => {
    return cats.map((category) => (
      <div key={category.id} className={`${level > 0 ? 'ml-8' : ''}`}>
        <div className="border rounded-lg p-4 mb-2 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {level > 0 && <span className="text-gray-400">↳</span>}
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    category.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">/{category.slug}</p>
              {category.description && (
                <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/categories/${category.slug}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
        {category.children.length > 0 && renderCategoryTree(category.children, level + 1)}
      </div>
    ));
  };

  // Build flat list for parent selection
  const flatCategories = useCallback((cats: Category[], level = 0): Array<{ id: string; name: string; level: number }> => {
    let result: Array<{ id: string; name: string; level: number }> = [];
    cats.forEach((cat) => {
      result.push({ id: cat.id, name: cat.name, level });
      if (cat.children.length > 0) {
        result = result.concat(flatCategories(cat.children, level + 1));
      }
    });
    return result;
  }, []);

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
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-600">Manage product categories with hierarchy</p>
        </div>
      </div>

      {!showForm ? (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>All Categories</CardTitle>
                <CardDescription>{categories.length} categories total</CardDescription>
              </div>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-600">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12">
                <FolderTree className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first category</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              </div>
            ) : (
              <div className="space-y-2">{renderCategoryTree(categories)}</div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{editingCategory ? 'Edit Category' : 'New Category'}</CardTitle>
                <CardDescription>
                  {editingCategory ? 'Update category details' : 'Create a new product category'}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Electronics"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentId">Parent Category</Label>
                  <select
                    id="parentId"
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">None (Top Level)</option>
                    {flatCategories(categories)
                      .filter((c) => c.id !== editingCategory?.id)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {'—'.repeat(cat.level)} {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                    placeholder="Category description..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/uploads/category.jpg"
                  />
                </div>

                <div className="space-y-2 flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active (visible to customers)
                  </Label>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <h3 className="text-lg font-semibold">SEO Settings</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO title for search engines"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="SEO description for search engines"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button type="submit" disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}