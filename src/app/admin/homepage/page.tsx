'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { HomepageSettings } from '@/lib/settings';

export default function HomepageSettingsPage() {
  const [settings, setSettings] = useState<HomepageSettings>({
    layout: 'sections', // Always use sections layout (modern homepage)
    showHero: true,
    heroTitle: 'Welcome to Our Store',
    heroSubtitle: 'Discover amazing products at great prices',
    heroImageId: null,
    heroButtonText: 'Shop Now',
    heroButtonUrl: '/products',
    showFeaturedProducts: true,
    featuredProductsTitle: 'Featured Products',
    featuredProductsCount: 8,
    showCategories: true,
    categoriesTitle: 'Shop by Category',
    categoriesCount: 6,
    showNewsletter: true,
    newsletterTitle: 'Stay Updated',
    newsletterSubtitle: 'Subscribe to get special offers and updates',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/homepage');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch homepage settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('Homepage settings saved successfully!');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save homepage settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading homepage settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Homepage Settings</h1>
          <p className="text-gray-600">Customize your homepage layout and content</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Layout Info */}
        <Card>
          <CardHeader>
            <CardTitle>Modern Homepage Layout</CardTitle>
            <CardDescription>Your homepage uses a modern sections-based layout with customizable components</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Configure the sections below to customize your homepage appearance. All sections use your theme colors from the Theme Settings page.
            </p>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>The main banner at the top of your homepage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="showHero"
                checked={settings.showHero}
                onCheckedChange={(checked) => setSettings({ ...settings, showHero: checked })}
              />
              <Label htmlFor="showHero">Show Hero Section</Label>
            </div>

            {settings.showHero && (
              <>
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    placeholder="Welcome to Our Store"
                  />
                </div>

                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    placeholder="Discover amazing products..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="heroButtonText">Button Text</Label>
                  <Input
                    id="heroButtonText"
                    value={settings.heroButtonText}
                    onChange={(e) => setSettings({ ...settings, heroButtonText: e.target.value })}
                    placeholder="Shop Now"
                  />
                </div>

                <div>
                  <Label htmlFor="heroButtonUrl">Button URL</Label>
                  <Input
                    id="heroButtonUrl"
                    value={settings.heroButtonUrl}
                    onChange={(e) => setSettings({ ...settings, heroButtonUrl: e.target.value })}
                    placeholder="/products"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Featured Products Section */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Products Section</CardTitle>
            <CardDescription>Showcase your best products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="showFeaturedProducts"
                checked={settings.showFeaturedProducts}
                onCheckedChange={(checked) => setSettings({ ...settings, showFeaturedProducts: checked })}
              />
              <Label htmlFor="showFeaturedProducts">Show Featured Products</Label>
            </div>

            {settings.showFeaturedProducts && (
              <>
                <div>
                  <Label htmlFor="featuredProductsTitle">Section Title</Label>
                  <Input
                    id="featuredProductsTitle"
                    value={settings.featuredProductsTitle}
                    onChange={(e) => setSettings({ ...settings, featuredProductsTitle: e.target.value })}
                    placeholder="Featured Products"
                  />
                </div>

                <div>
                  <Label htmlFor="featuredProductsCount">Number of Products</Label>
                  <Input
                    id="featuredProductsCount"
                    type="number"
                    min="1"
                    max="20"
                    value={settings.featuredProductsCount}
                    onChange={(e) => setSettings({ ...settings, featuredProductsCount: parseInt(e.target.value) || 8 })}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card>
          <CardHeader>
            <CardTitle>Categories Section</CardTitle>
            <CardDescription>Display product categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="showCategories"
                checked={settings.showCategories}
                onCheckedChange={(checked) => setSettings({ ...settings, showCategories: checked })}
              />
              <Label htmlFor="showCategories">Show Categories</Label>
            </div>

            {settings.showCategories && (
              <>
                <div>
                  <Label htmlFor="categoriesTitle">Section Title</Label>
                  <Input
                    id="categoriesTitle"
                    value={settings.categoriesTitle}
                    onChange={(e) => setSettings({ ...settings, categoriesTitle: e.target.value })}
                    placeholder="Shop by Category"
                  />
                </div>

                <div>
                  <Label htmlFor="categoriesCount">Number of Categories</Label>
                  <Input
                    id="categoriesCount"
                    type="number"
                    min="1"
                    max="12"
                    value={settings.categoriesCount}
                    onChange={(e) => setSettings({ ...settings, categoriesCount: parseInt(e.target.value) || 6 })}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Newsletter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Section</CardTitle>
            <CardDescription>Email subscription form</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="showNewsletter"
                checked={settings.showNewsletter}
                onCheckedChange={(checked) => setSettings({ ...settings, showNewsletter: checked })}
              />
              <Label htmlFor="showNewsletter">Show Newsletter Signup</Label>
            </div>

            {settings.showNewsletter && (
              <>
                <div>
                  <Label htmlFor="newsletterTitle">Section Title</Label>
                  <Input
                    id="newsletterTitle"
                    value={settings.newsletterTitle}
                    onChange={(e) => setSettings({ ...settings, newsletterTitle: e.target.value })}
                    placeholder="Stay Updated"
                  />
                </div>

                <div>
                  <Label htmlFor="newsletterSubtitle">Section Subtitle</Label>
                  <Textarea
                    id="newsletterSubtitle"
                    value={settings.newsletterSubtitle}
                    onChange={(e) => setSettings({ ...settings, newsletterSubtitle: e.target.value })}
                    placeholder="Subscribe to get special offers..."
                    rows={2}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
}