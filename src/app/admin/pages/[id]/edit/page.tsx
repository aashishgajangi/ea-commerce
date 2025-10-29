'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockManager from '@/components/blocks/BlockManager';
import SEOSidebar from '@/components/seo/SEOSidebar';
import { BlockInstance } from '@/lib/blocks/block-types';
import { SEOData } from '@/lib/seo/types';
import { ArrowLeft, Save, Eye, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import PagePreviewModal from '@/components/pages/PagePreviewModal';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: 'draft' | 'published';
  pageType: string | null;
  // SEO fields
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: string | null;
  featuredImageId: string | null;
  // Phase 3: Advanced SEO
  focusKeyphrase: string | null;
  focusKeyphrases: string | null;
  robots: string | null;
  schemaType: string | null;
  schemaData: string | null;
  // Phase 4: Blocks
  blocks: string | null;
}

interface PageEditorProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PageEditorNew({ params }: PageEditorProps) {
  const router = useRouter();
  const [pageId, setPageId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo'>('content');

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [pageType, setPageType] = useState<string>('custom');
  
  // Block-based content
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  
  // SEO data
  const [seoData, setSeoData] = useState<SEOData>({});

  useEffect(() => {
    async function loadPage() {
      const resolvedParams = await params;
      setPageId(resolvedParams.id);

      try {
        const response = await fetch(`/api/admin/pages/${resolvedParams.id}`);
        if (!response.ok) throw new Error('Failed to fetch page');

        const page: Page = await response.json();
        setTitle(page.title);
        setSlug(page.slug);
        setExcerpt(page.excerpt || '');
        setStatus(page.status);
        setPageType(page.pageType || 'custom');
        
        // Parse blocks if exists
        if (page.blocks) {
          try {
            setBlocks(JSON.parse(page.blocks));
          } catch (e) {
            console.error('Failed to parse blocks:', e);
          }
        }
        
        // Load SEO data
        const seo: SEOData = {
          metaTitle: page.metaTitle || undefined,
          metaDescription: page.metaDescription || undefined,
          metaKeywords: page.metaKeywords || undefined,
          canonicalUrl: page.canonicalUrl || undefined,
          ogTitle: page.ogTitle || undefined,
          ogDescription: page.ogDescription || undefined,
          ogImageId: page.ogImageId || undefined,
          twitterTitle: page.twitterTitle || undefined,
          twitterDescription: page.twitterDescription || undefined,
          twitterImageId: page.twitterImageId || undefined,
          focusKeyphrase: page.focusKeyphrase || undefined,
          focusKeyphrases: page.focusKeyphrases ? JSON.parse(page.focusKeyphrases) : undefined,
          robots: page.robots || undefined,
          schemaType: page.schemaType as SEOData['schemaType'],
          schemaData: page.schemaData ? JSON.parse(page.schemaData) : undefined,
        };
        setSeoData(seo);
      } catch (error) {
        console.error('Error loading page:', error);
        alert('Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [params]);

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

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'PATCH',
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
        throw new Error(error.error || 'Failed to save page');
      }

      alert('Page saved successfully!');
      router.push('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
      alert(error instanceof Error ? error.message : 'Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading page...</p>
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
                <h1 className="text-xl font-bold">{title || 'Edit Page'}</h1>
                <p className="text-sm text-gray-500">
                  {status === 'published' ? 'Published' : 'Draft'} • {blocks.length} blocks
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
              {status === 'published' && slug && (
                <Link href={`/${slug}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                </Link>
              )}
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
          {/* Left Column: Content & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <Card>
              <div className="flex border-b">
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
              </div>

              <CardContent className="p-6">
                {activeTab === 'content' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Page Blocks</h3>
                    <BlockManager blocks={blocks} onChange={setBlocks} />
                  </div>
                )}

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
                      <Label htmlFor="slug">URL Slug</Label>
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
