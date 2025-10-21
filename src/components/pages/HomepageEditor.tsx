'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Home, Image as ImageIcon, Package, Grid3x3, Mail } from 'lucide-react';

export interface HomepageData {
  showHero: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroImageId: string | null;
  heroButtonText: string;
  heroButtonUrl: string;
  showFeaturedProducts: boolean;
  featuredProductsTitle: string;
  featuredProductsCount: number;
  showCategories: boolean;
  categoriesTitle: string;
  categoriesCount: number;
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

interface HomepageEditorProps {
  data: HomepageData;
  onChange: (data: HomepageData) => void;
}

export default function HomepageEditor({ data, onChange }: HomepageEditorProps) {
  const updateField = (field: keyof HomepageData, value: string | number | boolean | null) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main banner at the top of your homepage</CardDescription>
              </div>
            </div>
            <Switch
              checked={data.showHero}
              onCheckedChange={(checked) => updateField('showHero', checked)}
            />
          </div>
        </CardHeader>
        {data.showHero && (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Hero Title *</Label>
              <Input
                id="heroTitle"
                value={data.heroTitle}
                onChange={(e) => updateField('heroTitle', e.target.value)}
                placeholder="Welcome to Our Store"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Input
                id="heroSubtitle"
                value={data.heroSubtitle}
                onChange={(e) => updateField('heroSubtitle', e.target.value)}
                placeholder="Discover amazing products at great prices"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="heroButtonText">Button Text</Label>
              <Input
                id="heroButtonText"
                value={data.heroButtonText}
                onChange={(e) => updateField('heroButtonText', e.target.value)}
                placeholder="Shop Now"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="heroButtonUrl">Button URL</Label>
              <Input
                id="heroButtonUrl"
                value={data.heroButtonUrl}
                onChange={(e) => updateField('heroButtonUrl', e.target.value)}
                placeholder="/products"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use relative URLs like /products or /categories/electronics
              </p>
            </div>

            <div>
              <Label>Hero Background Image</Label>
              <div className="mt-1 p-4 border-2 border-dashed rounded-lg text-center">
                <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Image upload coming soon. Currently using gradient background.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Featured Products Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Featured Products</CardTitle>
                <CardDescription>Showcase your best products</CardDescription>
              </div>
            </div>
            <Switch
              checked={data.showFeaturedProducts}
              onCheckedChange={(checked) => updateField('showFeaturedProducts', checked)}
            />
          </div>
        </CardHeader>
        {data.showFeaturedProducts && (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="featuredProductsTitle">Section Title</Label>
              <Input
                id="featuredProductsTitle"
                value={data.featuredProductsTitle}
                onChange={(e) => updateField('featuredProductsTitle', e.target.value)}
                placeholder="Featured Products"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="featuredProductsCount">Number of Products</Label>
              <Input
                id="featuredProductsCount"
                type="number"
                min="4"
                max="12"
                value={data.featuredProductsCount}
                onChange={(e) => updateField('featuredProductsCount', parseInt(e.target.value) || 8)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 4, 6, 8, or 12 products
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                ℹ️ Products marked as &quot;Featured&quot; in the Products section will appear here
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Grid3x3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Categories Showcase</CardTitle>
                <CardDescription>Display product categories</CardDescription>
              </div>
            </div>
            <Switch
              checked={data.showCategories}
              onCheckedChange={(checked) => updateField('showCategories', checked)}
            />
          </div>
        </CardHeader>
        {data.showCategories && (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="categoriesTitle">Section Title</Label>
              <Input
                id="categoriesTitle"
                value={data.categoriesTitle}
                onChange={(e) => updateField('categoriesTitle', e.target.value)}
                placeholder="Shop by Category"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="categoriesCount">Number of Categories</Label>
              <Input
                id="categoriesCount"
                type="number"
                min="3"
                max="12"
                value={data.categoriesCount}
                onChange={(e) => updateField('categoriesCount', parseInt(e.target.value) || 6)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 4, 6, 8, or 12 categories
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                ℹ️ Active categories from the Categories section will appear here
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Newsletter Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>Newsletter Subscription</CardTitle>
                <CardDescription>Email collection form</CardDescription>
              </div>
            </div>
            <Switch
              checked={data.showNewsletter}
              onCheckedChange={(checked) => updateField('showNewsletter', checked)}
            />
          </div>
        </CardHeader>
        {data.showNewsletter && (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newsletterTitle">Section Title</Label>
              <Input
                id="newsletterTitle"
                value={data.newsletterTitle}
                onChange={(e) => updateField('newsletterTitle', e.target.value)}
                placeholder="Stay Updated"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="newsletterSubtitle">Subtitle</Label>
              <Textarea
                id="newsletterSubtitle"
                value={data.newsletterSubtitle}
                onChange={(e) => updateField('newsletterSubtitle', e.target.value)}
                placeholder="Subscribe to get special offers and updates"
                className="mt-1"
                rows={2}
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                ℹ️ Email submissions will be saved to your subscribers list
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Section Order Info */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base">Section Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Sections will appear on your homepage in this order:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li className={!data.showHero ? 'line-through text-gray-400' : ''}>Hero Section</li>
              <li className={!data.showCategories ? 'line-through text-gray-400' : ''}>Categories Showcase</li>
              <li className={!data.showFeaturedProducts ? 'line-through text-gray-400' : ''}>Featured Products</li>
              <li className={!data.showNewsletter ? 'line-through text-gray-400' : ''}>Newsletter</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
