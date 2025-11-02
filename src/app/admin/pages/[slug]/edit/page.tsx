'use client';

export const dynamic = 'force-dynamic'; // Disable caching for admin pages

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import PagePreviewModal from '@/components/pages/PagePreviewModal';
import BlockManager from '@/components/blocks/BlockManager';
import SEOSidebar from '@/components/seo/SEOSidebar';
import { BlockInstance } from '@/lib/blocks/block-types';
import { SEOData } from '@/lib/seo/types';
import { ArrowLeft, Save, Eye, FileText, Settings } from 'lucide-react';

interface PageEditorProps {
  params: Promise<{ slug: string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const router = useRouter();
  const [pageId, setPageId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const originalSlugRef = useRef<string>(''); // Store original slug from DB (never changes)
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [pageType, setPageType] = useState<string>('custom');
  
  // Block-based content
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  
  // SEO data
  const [seoData, setSeoData] = useState<SEOData>({} as SEOData);
  
  useEffect(() => {
    async function loadPage() {
      const resolvedParams = await params;
      const isHomepage = resolvedParams.slug === 'home';
      const pageSlug = isHomepage ? 'home' : resolvedParams.slug;

      try {
        const response = await fetch(`/api/admin/pages/by-slug/${encodeURIComponent(pageSlug)}`);
        if (!response.ok) {
          // If homepage not found, try to create it
          if (isHomepage) {
            console.log('Homepage not found, creating...');
            const createResponse = await fetch('/api/admin/pages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: 'Home',
                slug: '',
                status: 'published',
                content: 'Welcome to our homepage!',
              }),
            });
            if (!createResponse.ok) {
              throw new Error('Failed to create homepage');
            }
            const retryResponse = await fetch(`/api/admin/pages/by-slug/${encodeURIComponent(pageSlug)}`);
            if (!retryResponse.ok) {
              throw new Error('Failed to load homepage after creation');
            }
            const page = await retryResponse.json();
            setPageId(page.id);
            setTitle(page.title);
            originalSlugRef.current = page.slug;
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
            
            // Parse SEO data
            if (page.seoData) {
              try {
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
              } catch (e) {
                console.error('Failed to parse SEO data:', e);
              }
            }
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || errorData.error || 'Failed to fetch page');
          }
        } else {
          const page = await response.json();
          setPageId(page.id);
          setTitle(page.title);
          originalSlugRef.current = page.slug;
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
          
          // Parse SEO data
          if (page.seoData) {
            try {
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
            } catch (e) {
              console.error('Failed to parse SEO data:', e);
            }
          }
        }
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading page:', error);
        }
        const message = error instanceof Error ? error.message : 'Failed to load page';
        if (message.toLowerCase().includes('not found') || message.toLowerCase().includes('no page exists')) {
          alert(message);
          router.push('/admin/pages');
        } else {
          alert(message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPage();
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
    const originalSlug = originalSlugRef.current; // Store for comparison
    
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

      const updatedPage = await response.json();
      
      // Check if slug changed
      if (updatedPage.slug !== originalSlug) {
        // Slug changed - redirect to new URL
        alert('Page saved! Redirecting to new URL...');
        setTimeout(() => {
          window.location.href = `/admin/pages/${updatedPage.slug || 'home'}/edit`;
        }, 500);
      } else {
        // Slug didn't change
        alert('Page saved successfully!');
      }
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
