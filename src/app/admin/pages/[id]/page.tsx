'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LexicalEditor from '@/components/editor/LexicalEditor';
import VisualHomepageEditor, { type HomepageData } from '@/components/pages/VisualHomepageEditor';
import ThreeColumnEditor from '@/components/pages/ThreeColumnEditor';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: 'draft' | 'published';
  pageType: string | null;
  homepageData: string | null;
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
}

interface PageEditorProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const router = useRouter();
  const [pageId, setPageId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [pageType, setPageType] = useState<string>('');
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);

  // SEO fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDescription, setTwitterDescription] = useState('');

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
        setContent(page.content);
        setExcerpt(page.excerpt || '');
        setStatus(page.status);
        setPageType(page.pageType || '');
        
        // Parse homepage data if exists
        if (page.homepageData) {
          try {
            setHomepageData(JSON.parse(page.homepageData));
          } catch (e) {
            console.error('Failed to parse homepage data:', e);
          }
        }
        
        setMetaTitle(page.metaTitle || '');
        setMetaDescription(page.metaDescription || '');
        setMetaKeywords(page.metaKeywords || '');
        setCanonicalUrl(page.canonicalUrl || '');
        setOgTitle(page.ogTitle || '');
        setOgDescription(page.ogDescription || '');
        setTwitterTitle(page.twitterTitle || '');
        setTwitterDescription(page.twitterDescription || '');
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
    // Auto-generate slug if it hasn't been manually edited (but not for homepage)
    if (pageType !== 'homepage' && (!slug || slug === generateSlug(title))) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    // For homepage, content can be minimal as sections are in homepageData
    if (!content.trim() && pageType !== 'homepage') {
      alert('Please enter some content');
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
          content,
          excerpt,
          status,
          homepageData: homepageData || undefined,
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
          metaKeywords: metaKeywords || undefined,
          canonicalUrl: canonicalUrl || undefined,
          ogTitle: ogTitle || undefined,
          ogDescription: ogDescription || undefined,
          twitterTitle: twitterTitle || undefined,
          twitterDescription: twitterDescription || undefined,
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
      <div className="container mx-auto max-w-[90%] py-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[90%] py-8 px-4">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Page</h1>
            <p className="text-gray-600">Update your page content and SEO settings</p>
          </div>
        </div>
        <div className="flex gap-2">
          {status === 'published' && (
            <Link href={`/${slug}`} target="_blank">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Three Column Editor: Content | SEO | Preview */}
      <ThreeColumnEditor
        title={title}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        content={content}
        slug={slug}
        metaKeywords={metaKeywords}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        twitterTitle={twitterTitle}
        twitterDescription={twitterDescription}
        isHomepage={pageType === 'homepage'}
        heroTitle={homepageData?.heroTitle || ''}
        contentSection={
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Page title, URL, and publishing status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Shows in browser tab and as page name
                </p>
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500">/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="page-url-slug (leave empty for homepage)"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {slug
                    ? `Full URL: ${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`
                    : 'Leave empty to make this the homepage (/)'}
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description (optional)"
                  className="w-full mt-1 px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Use the editor to create your page content</CardDescription>
            </CardHeader>
            <CardContent>
              <LexicalEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your page content..."
              />
            </CardContent>
          </Card>

          {/* Homepage Sections Editor - Only for Homepage */}
          {pageType === 'homepage' && homepageData && (
            <VisualHomepageEditor
              data={homepageData}
              onChange={setHomepageData}
            />
          )}
        </div>
        }
        seoSection={
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>Control how this page appears in search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title (Optional)</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Leave empty to use page title"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  SEO override for search engines. Leave empty to use Title field above.
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search results"
                  className="w-full mt-1 px-3 py-2 border rounded-md min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 150-160 characters | Current: {metaDescription.length}
                </p>
              </div>

              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Graph (Facebook)</CardTitle>
              <CardDescription>Control how this page appears when shared on Facebook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Leave empty to use page title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ogDescription">OG Description</Label>
                <textarea
                  id="ogDescription"
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Description for social sharing"
                  className="w-full mt-1 px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twitter Card</CardTitle>
              <CardDescription>Control how this page appears when shared on Twitter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twitterTitle">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  value={twitterTitle}
                  onChange={(e) => setTwitterTitle(e.target.value)}
                  placeholder="Leave empty to use page title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="twitterDescription">Twitter Description</Label>
                <textarea
                  id="twitterDescription"
                  value={twitterDescription}
                  onChange={(e) => setTwitterDescription(e.target.value)}
                  placeholder="Description for Twitter sharing"
                  className="w-full mt-1 px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        }
      />

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end gap-2">
        <Link href="/admin/pages">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}