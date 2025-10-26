'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Home, Package, Grid3x3, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export interface HomepageData {
  showHero: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageId?: string | null;
  heroButtonText?: string;
  heroButtonUrl?: string;
  showFeaturedProducts: boolean;
  featuredProductsTitle?: string;
  featuredProductsCount?: number;
  featuredProductsColumnsMobile?: number;
  featuredProductsColumnsDesktop?: number;
  showCategories: boolean;
  categoriesTitle?: string;
  categoriesCount?: number;
  showNewsletter: boolean;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
}

interface VisualHomepageEditorProps {
  data: HomepageData;
  onChange: (data: HomepageData) => void;
}

export default function VisualHomepageEditor({ data, onChange }: VisualHomepageEditorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  const updateField = (field: keyof HomepageData, value: string | number | boolean | null) => {
    onChange({ ...data, [field]: value });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {/* Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-2">🏠 Homepage Sections</h3>
        <p className="text-sm text-blue-700">
          Configure what appears on your homepage. Click any section to edit it.
        </p>
      </div>

      {/* SEO Structure Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
        <h3 className="text-sm font-bold text-green-900 mb-2">✨ SEO Structure</h3>
        <div className="text-xs text-green-800 space-y-1">
          <p>• <strong>Hero Title</strong> = H1 tag (Main heading - most important for SEO)</p>
          <p>• <strong>Section Titles</strong> = H2 tags (Organize content for search engines)</p>
          <p>• Each enabled section adds an H2, improving your SEO score</p>
          <p>• Recommended: Enable at least 2-3 sections for best SEO</p>
        </div>
      </div>

      {/* Hero Section */}
      <Card className={`border-2 transition-all ${data.showHero ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleSection('hero')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className={`h-6 w-6 ${data.showHero ? 'text-green-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-lg">Hero Section</h4>
                <p className="text-sm text-gray-600">Large banner at top of homepage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                data.showHero ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {data.showHero ? '✅ Enabled' : '❌ Disabled'}
              </span>
              {expandedSection === 'hero' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {expandedSection === 'hero' && (
          <CardContent className="border-t pt-4">
            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <Label htmlFor="showHero" className="font-semibold">Show Hero Section</Label>
                <Switch
                  id="showHero"
                  checked={data.showHero}
                  onCheckedChange={(checked) => updateField('showHero', checked)}
                />
              </div>

              {data.showHero && (
                <>
                  {/* Preview */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg text-white text-center">
                    <h2 className="text-3xl font-bold mb-3">{data.heroTitle || 'Welcome to Our Store'}</h2>
                    <p className="text-lg opacity-90 mb-4">{data.heroSubtitle || 'Discover amazing products'}</p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                      {data.heroButtonText || 'Shop Now'}
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div>
                      <Label>Main Heading (H1 - SEO Critical)</Label>
                      <Input
                        value={data.heroTitle || ''}
                        onChange={(e) => updateField('heroTitle', e.target.value)}
                        placeholder="Welcome to Our Store"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        ✨ SEO: This is your main H1 tag | Current: {(data.heroTitle || '').length} chars | Recommended: 40-60 chars
                      </p>
                    </div>

                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={data.heroSubtitle || ''}
                        onChange={(e) => updateField('heroSubtitle', e.target.value)}
                        placeholder="Discover amazing products"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Text below the main heading</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Button Text</Label>
                        <Input
                          value={data.heroButtonText || ''}
                          onChange={(e) => updateField('heroButtonText', e.target.value)}
                          placeholder="Shop Now"
                        />
                      </div>
                      <div>
                        <Label>Button Link</Label>
                        <Input
                          value={data.heroButtonUrl || ''}
                          onChange={(e) => updateField('heroButtonUrl', e.target.value)}
                          placeholder="/products"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Featured Products Section */}
      <Card className={`border-2 transition-all ${data.showFeaturedProducts ? 'border-pink-500 bg-pink-50' : 'border-gray-300 bg-gray-50'}`}>
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleSection('products')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className={`h-6 w-6 ${data.showFeaturedProducts ? 'text-pink-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-lg">Featured Products</h4>
                <p className="text-sm text-gray-600">Show your best products</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                data.showFeaturedProducts ? 'bg-pink-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {data.showFeaturedProducts ? '✅ Enabled' : '❌ Disabled'}
              </span>
              {expandedSection === 'products' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {expandedSection === 'products' && (
          <CardContent className="border-t pt-4">
            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <Label htmlFor="showFeaturedProducts" className="font-semibold">Show Featured Products</Label>
                <Switch
                  id="showFeaturedProducts"
                  checked={data.showFeaturedProducts}
                  onCheckedChange={(checked) => updateField('showFeaturedProducts', checked)}
                />
              </div>

              {data.showFeaturedProducts && (
                <>
                  {/* Preview */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-2xl font-bold mb-4 text-center">{data.featuredProductsTitle}</h3>
                    <div className={`grid gap-2 ${
                      data.featuredProductsColumnsMobile === 1 && data.featuredProductsColumnsDesktop === 4
                        ? 'grid-cols-1 md:grid-cols-4'
                        : data.featuredProductsColumnsMobile === 2 && data.featuredProductsColumnsDesktop === 4
                        ? 'grid-cols-2 md:grid-cols-4'
                        : data.featuredProductsColumnsMobile === 2 && data.featuredProductsColumnsDesktop === 3
                        ? 'grid-cols-2 md:grid-cols-3'
                        : 'grid-cols-2 md:grid-cols-4'
                    }`}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, data.featuredProductsCount).map((i) => (
                        <div key={i} className="bg-gray-100 aspect-square rounded flex items-center justify-center text-gray-400 text-xs">
                          Product {i}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Showing {data.featuredProductsCount} products • {data.featuredProductsColumnsMobile} cols mobile, {data.featuredProductsColumnsDesktop} cols desktop
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div>
                      <Label>Section Title (H2 - SEO Important)</Label>
                      <Input
                        value={data.featuredProductsTitle || ''}
                        onChange={(e) => updateField('featuredProductsTitle', e.target.value)}
                        placeholder="Featured Products"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🎯 SEO: This creates an H2 heading | Current: {(data.featuredProductsTitle || '').length} chars | Tip: Use descriptive keywords
                      </p>
                    </div>

                    <div>
                      <Label>Number of Products</Label>
                      <Input
                        type="number"
                        value={data.featuredProductsCount || 8}
                        onChange={(e) => updateField('featuredProductsCount', parseInt(e.target.value) || 8)}
                        min={1}
                        max={20}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">How many products to display (1-20)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Mobile Columns</Label>
                        <select
                          value={data.featuredProductsColumnsMobile || 2}
                          onChange={(e) => updateField('featuredProductsColumnsMobile', parseInt(e.target.value))}
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        >
                          <option value={1}>1 Column</option>
                          <option value={2}>2 Columns</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Mobile layout</p>
                      </div>
                      <div>
                        <Label>Desktop Columns</Label>
                        <select
                          value={data.featuredProductsColumnsDesktop || 4}
                          onChange={(e) => updateField('featuredProductsColumnsDesktop', parseInt(e.target.value))}
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        >
                          <option value={2}>2 Columns</option>
                          <option value={3}>3 Columns</option>
                          <option value={4}>4 Columns</option>
                          <option value={5}>5 Columns</option>
                          <option value={6}>6 Columns</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Desktop layout</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Categories Section */}
      <Card className={`border-2 transition-all ${data.showCategories ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'}`}>
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Grid3x3 className={`h-6 w-6 ${data.showCategories ? 'text-indigo-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-lg">Categories</h4>
                <p className="text-sm text-gray-600">Browse by product category</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                data.showCategories ? 'bg-indigo-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {data.showCategories ? '✅ Enabled' : '❌ Disabled'}
              </span>
              {expandedSection === 'categories' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {expandedSection === 'categories' && (
          <CardContent className="border-t pt-4">
            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <Label htmlFor="showCategories" className="font-semibold">Show Categories</Label>
                <Switch
                  id="showCategories"
                  checked={data.showCategories}
                  onCheckedChange={(checked) => updateField('showCategories', checked)}
                />
              </div>

              {data.showCategories && (
                <>
                  {/* Preview */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-2xl font-bold mb-4 text-center">{data.categoriesTitle}</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6].slice(0, data.categoriesCount).map((i) => (
                        <div key={i} className="bg-gray-100 aspect-square rounded flex items-center justify-center text-gray-400 text-xs">
                          Cat {i}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Showing {data.categoriesCount} category cards
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div>
                      <Label>Section Title (H2 - SEO Important)</Label>
                      <Input
                        value={data.categoriesTitle || ''}
                        onChange={(e) => updateField('categoriesTitle', e.target.value)}
                        placeholder="Shop by Category"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🎯 SEO: This creates an H2 heading | Current: {(data.categoriesTitle || '').length} chars | Tip: Use descriptive keywords
                      </p>
                    </div>

                    <div>
                      <Label>Number of Categories</Label>
                      <Input
                        type="number"
                        value={data.categoriesCount || 6}
                        onChange={(e) => updateField('categoriesCount', parseInt(e.target.value) || 6)}
                        min={1}
                        max={12}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">How many categories to display (1-12)</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Newsletter Section */}
      <Card className={`border-2 transition-all ${data.showNewsletter ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50'}`}>
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleSection('newsletter')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className={`h-6 w-6 ${data.showNewsletter ? 'text-purple-600' : 'text-gray-400'}`} />
              <div>
                <h4 className="font-bold text-lg">Newsletter</h4>
                <p className="text-sm text-gray-600">Email subscription form</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                data.showNewsletter ? 'bg-purple-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {data.showNewsletter ? '✅ Enabled' : '❌ Disabled'}
              </span>
              {expandedSection === 'newsletter' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {expandedSection === 'newsletter' && (
          <CardContent className="border-t pt-4">
            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <Label htmlFor="showNewsletter" className="font-semibold">Show Newsletter</Label>
                <Switch
                  id="showNewsletter"
                  checked={data.showNewsletter}
                  onCheckedChange={(checked) => updateField('showNewsletter', checked)}
                />
              </div>

              {data.showNewsletter && (
                <>
                  {/* Preview */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg text-white text-center">
                    <Mail className="h-12 w-12 mx-auto mb-3 opacity-90" />
                    <h3 className="text-2xl font-bold mb-2">{data.newsletterTitle}</h3>
                    <p className="mb-4 opacity-90">{data.newsletterSubtitle}</p>
                    <div className="flex gap-2 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded text-gray-900"
                        readOnly
                      />
                      <button className="bg-white text-purple-600 px-6 py-2 rounded font-semibold">
                        Subscribe
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div>
                      <Label>Main Heading (H2 - SEO Important)</Label>
                      <Input
                        value={data.newsletterTitle || ''}
                        onChange={(e) => updateField('newsletterTitle', e.target.value)}
                        placeholder="Stay Updated"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🎯 SEO: This creates an H2 heading | Current: {(data.newsletterTitle || '').length} chars | Tip: Use action words
                      </p>
                    </div>

                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={data.newsletterSubtitle || ''}
                        onChange={(e) => updateField('newsletterSubtitle', e.target.value)}
                        placeholder="Subscribe to get special offers"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Supporting text | Current: {(data.newsletterSubtitle || '').length} chars
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
