'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import SEOSidebar from '@/components/seo/SEOSidebar';
import { SEOData } from '@/lib/seo/types';
import BlockManager from '@/components/blocks/BlockManager';
import { BlockInstance } from '@/lib/blocks/block-types';

interface CategoryEditorProps {
  params: Promise<{ slug: string }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  order: number;
  isActive: boolean;
  // SEO - Basic
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  // SEO - Open Graph
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: string | null;
  // SEO - Twitter Card
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: string | null;
  // SEO - Advanced
  focusKeyphrase: string | null;
  focusKeyphrases: string | null; // JSON string
  robots: string | null;
  schemaType: string | null;
  schemaData: string | null; // JSON string
  // Blocks
  blocks: string | null;
  parent: { id: string; name: string } | null;
  _count: {
    products: number;
    children: number;
  };
}

export default function CategoryEditor({ params }: CategoryEditorProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const originalSlugRef = useRef<string>('');

  // Form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [parentId, setParentId] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  // SEO data
  const [seoData, setSeoData] = useState<SEOData>({} as SEOData);

  // Blocks
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);

  // Available parent categories
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategory() {
      const resolvedParams = await params;
      const categorySlug = resolvedParams.slug;

      try {
        // Load category by slug
        const response = await fetch(`/api/admin/categories/by-slug/${encodeURIComponent(categorySlug)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch category');
        }

        const category: Category = await response.json();
        
        // Populate form fields
        setCategoryId(category.id);
        setName(category.name);
        setSlug(category.slug);
        originalSlugRef.current = category.slug;
        setDescription(category.description || '');
        setImage(category.image || '');
        setParentId(category.parentId || '');
        setOrder(category.order);
        setIsActive(category.isActive);
        
        // Parse SEO data (including advanced fields)
        const seo: SEOData = {
          metaTitle: category.metaTitle || undefined,
          metaDescription: category.metaDescription || undefined,
          metaKeywords: category.metaKeywords || undefined,
          canonicalUrl: category.canonicalUrl || undefined,
          ogTitle: category.ogTitle || undefined,
          ogDescription: category.ogDescription || undefined,
          ogImageId: category.ogImageId || undefined,
          twitterTitle: category.twitterTitle || undefined,
          twitterDescription: category.twitterDescription || undefined,
          twitterImageId: category.twitterImageId || undefined,
          focusKeyphrase: category.focusKeyphrase || undefined,
          focusKeyphrases: category.focusKeyphrases 
            ? (typeof category.focusKeyphrases === 'string' 
                ? JSON.parse(category.focusKeyphrases) 
                : category.focusKeyphrases)
            : undefined,
          robots: category.robots || undefined,
          schemaType: category.schemaType as SEOData['schemaType'],
          schemaData: category.schemaData 
            ? (typeof category.schemaData === 'string' 
                ? JSON.parse(category.schemaData) 
                : category.schemaData)
            : undefined,
        };
        console.log('📥 Loaded category SEO data:', seo);
        setSeoData(seo);

        // Parse blocks
        if (category.blocks) {
          try {
            const parsedBlocks = JSON.parse(category.blocks);
            setBlocks(parsedBlocks);
          } catch (e) {
            console.error('Error parsing blocks:', e);
            setBlocks([]);
          }
        }

        // Load parent categories (exclude current category and its children)
        const parentResponse = await fetch('/api/admin/categories');
        if (parentResponse.ok) {
          const { categories } = await parentResponse.json();
          setParentCategories(categories.filter((cat: Category) => cat.id !== category.id));
        }
      } catch (error) {
        console.error('Error loading category:', error);
        const message = error instanceof Error ? error.message : 'Failed to load category';
        alert(message);
        router.push('/admin/categories');
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [params, router]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    // Auto-generate slug if it hasn't been manually edited
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    setSaving(true);
    const originalSlug = originalSlugRef.current;

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          slug,
          description: description || undefined,
          image: image || undefined,
          parentId: parentId || undefined,
          order,
          isActive,
          // SEO - Basic
          metaTitle: seoData.metaTitle || undefined,
          metaDescription: seoData.metaDescription || undefined,
          metaKeywords: seoData.metaKeywords || undefined,
          canonicalUrl: seoData.canonicalUrl || undefined,
          // SEO - Open Graph
          ogTitle: seoData.ogTitle || undefined,
          ogDescription: seoData.ogDescription || undefined,
          ogImageId: seoData.ogImageId || undefined,
          // SEO - Twitter Card
          twitterTitle: seoData.twitterTitle || undefined,
          twitterDescription: seoData.twitterDescription || undefined,
          twitterImageId: seoData.twitterImageId || undefined,
          // SEO - Advanced
          focusKeyphrase: seoData.focusKeyphrase || undefined,
          focusKeyphrases: seoData.focusKeyphrases && seoData.focusKeyphrases.length > 0 ? seoData.focusKeyphrases : undefined,
          robots: seoData.robots || undefined,
          schemaType: seoData.schemaType || undefined,
          schemaData: seoData.schemaData || undefined,
          // Blocks
          blocks: blocks.length > 0 ? JSON.stringify(blocks) : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save category');
      }

      const updatedCategory = await response.json();

      // Check if slug changed
      if (updatedCategory.slug !== originalSlug) {
        alert('Category saved! Redirecting to new URL...');
        setTimeout(() => {
          window.location.href = `/admin/categories/${updatedCategory.slug}/edit`;
        }, 500);
      } else {
        alert('Category saved successfully!');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error instanceof Error ? error.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete category');
      }

      alert('Category deleted successfully!');
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete category');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/categories">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{name || 'Edit Category'}</h1>
                <p className="text-sm text-gray-500">
                  {isActive ? 'Active' : 'Inactive'} • Order: {order}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {slug && (
                <Link href={`/categories/${slug}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                </Link>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">/categories/</span>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      placeholder="category-url-slug"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {slug
                      ? `URL: ${typeof window !== 'undefined' ? window.location.origin : ''}/categories/${slug}`
                      : 'Enter a URL-friendly slug'}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category description (optional)"
                  rows={3}
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select value={parentId || 'none'} onValueChange={(val) => setParentId(val === 'none' ? '' : val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Parent</SelectItem>
                      {parentCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Block Manager */}
          <Card>
            <CardHeader>
              <CardTitle>Content Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              <BlockManager blocks={blocks} onChange={setBlocks} />
            </CardContent>
          </Card>
          </div>

          {/* Right Column - SEO Sidebar */}
          <div className="lg:col-span-1">
            <SEOSidebar
              data={seoData}
              onChange={setSeoData}
              pageTitle={name}
              pageContent={description}
              pageUrl={slug ? `/categories/${slug}` : ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
