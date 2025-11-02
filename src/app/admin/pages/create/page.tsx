'use client';

export const dynamic = 'force-dynamic'; // Disable caching for admin pages

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockManager from '@/components/blocks/BlockManager';
import SEOSidebar from '@/components/seo/SEOSidebar';
import { BlockInstance } from '@/lib/blocks/block-types';
import { SEOData } from '@/lib/seo/types';
import { getTemplateBlocks } from '@/lib/blocks/template-blocks';
import { ArrowLeft, Save, FileText, Settings, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';
import PagePreviewModal from '@/components/pages/PagePreviewModal';

export default function CreatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('settings');
  const [showTemplates, setShowTemplates] = useState(true);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [pageType, setPageType] = useState<string>('custom');
  
  // Block-based content
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  
  // SEO data
  const [seoData, setSeoData] = useState<SEOData>({
    robots: 'index,follow',
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Auto-generate slug if it hasn't been manually edited
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleTemplateSelect = (templateType: string) => {
    // Set page type
    setPageType(templateType);
    
    // Set default title based on template
    const titles: Record<string, string> = {
      about: 'About Us',
      contact: 'Contact Us',
      faq: 'Frequently Asked Questions',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
    };
    
    if (titles[templateType]) {
      handleTitleChange(titles[templateType]);
    }
    
    // Load template blocks
    const templateBlocks = getTemplateBlocks(templateType);
    setBlocks(templateBlocks);
    
    // Hide template selector and go to content tab if blocks were added
    setShowTemplates(false);
    setActiveTab(templateBlocks.length > 0 ? 'content' : 'settings');
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!slug.trim()) {
      alert('Please enter a URL slug');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          content: ' ', // Legacy field - single space to pass validation
          excerpt: excerpt || undefined,
          status,
          pageType: pageType || undefined,
          blocks: blocks.length > 0 ? blocks : undefined,
          // SEO fields
          metaTitle: seoData.metaTitle || undefined,
          metaDescription: seoData.metaDescription || undefined,
          metaKeywords: seoData.metaKeywords || undefined,
          canonicalUrl: seoData.canonicalUrl || undefined,
          ogTitle: seoData.ogTitle || undefined,
          ogDescription: seoData.ogDescription || undefined,
          ogImageId: seoData.ogImageId || undefined,
          twitterTitle: seoData.twitterTitle || undefined,
          twitterDescription: seoData.twitterDescription || undefined,
          twitterImageId: seoData.twitterImageId || undefined,
          focusKeyphrase: seoData.focusKeyphrase || undefined,
          focusKeyphrases: seoData.focusKeyphrases && seoData.focusKeyphrases.length > 0 ? seoData.focusKeyphrases : undefined,
          robots: seoData.robots || undefined,
          schemaType: seoData.schemaType || undefined,
          schemaData: seoData.schemaData || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      const page = await response.json();
      alert('Page created successfully!');
      router.push(`/admin/pages/${page.slug || 'home'}/edit`);
    } catch (error) {
      console.error('Error creating page:', error);
      alert(error instanceof Error ? error.message : 'Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  if (showTemplates) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/pages">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Create New Page</h1>
                <p className="text-sm text-gray-500">Choose a template to get started</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Blank Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('custom')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Blank Page</CardTitle>
                    <p className="text-xs text-gray-500">Start from scratch</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Create a custom page with blocks. Perfect for unique content.
                </p>
              </CardContent>
            </Card>

            {/* About Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('about')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">About Us</CardTitle>
                    <p className="text-xs text-gray-500">Company info</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Tell your story with pre-built sections for team, mission, and values.
                </p>
              </CardContent>
            </Card>

            {/* Contact Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('contact')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Contact Us</CardTitle>
                    <p className="text-xs text-gray-500">Get in touch</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Contact form, address, and social links ready to customize.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('faq')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">FAQ</CardTitle>
                    <p className="text-xs text-gray-500">Help center</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Accordion-style FAQ section for common questions.
                </p>
              </CardContent>
            </Card>

            {/* Terms Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('terms')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Terms & Conditions</CardTitle>
                    <p className="text-xs text-gray-500">Legal</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Legal terms template with standard sections.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Template */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTemplateSelect('privacy')}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Privacy Policy</CardTitle>
                    <p className="text-xs text-gray-500">Data protection</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Privacy policy template with GDPR-ready sections.
                </p>
              </CardContent>
            </Card>
          </div>
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
              <Link href="/admin/pages">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{title || 'New Page'}</h1>
                <p className="text-sm text-gray-500">
                  {status === 'published' ? 'Will be published' : 'Draft'} • {blocks.length} blocks
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Creating...' : 'Create Page'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Content & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <Card>
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'settings'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'content'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Content
                </button>
              </div>

              <CardContent className="p-6">
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title">Page Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter page title"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-500 text-sm">/</span>
                        <Input
                          id="slug"
                          value={slug}
                          onChange={(e) => setSlug(generateSlug(e.target.value))}
                          placeholder="page-url-slug"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {slug
                          ? `URL: ${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`
                          : 'Enter a URL-friendly slug'}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief description (optional)"
                        className="w-full mt-2 px-3 py-2 border rounded-md min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="pageType">Page Type</Label>
                      <select
                        id="pageType"
                        value={pageType}
                        onChange={(e) => setPageType(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                      >
                        <option value="custom">Custom</option>
                        <option value="about">About</option>
                        <option value="contact">Contact</option>
                        <option value="faq">FAQ</option>
                        <option value="terms">Terms & Conditions</option>
                        <option value="privacy">Privacy Policy</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Page Blocks</h3>
                    <BlockManager blocks={blocks} onChange={setBlocks} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: SEO Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <SEOSidebar
                data={seoData}
                onChange={setSeoData}
                pageTitle={title}
                pageContent={blocks.map(b => JSON.stringify(b.data)).join(' ')}
                pageUrl={slug}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PagePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        blocks={blocks}
      />
    </div>
  );
}
