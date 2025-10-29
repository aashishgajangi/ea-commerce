'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LexicalEditor from '@/components/editor/LexicalEditor';
import TemplateSelector from '@/components/pages/TemplateSelector';
import ThreeColumnEditor from '@/components/pages/ThreeColumnEditor';
import VisualHomepageEditor, { type HomepageData } from '@/components/pages/VisualHomepageEditor';
import { type PageTemplate } from '@/lib/page-templates';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState<'template' | 'edit'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  // Template fields
  const [pageType, setPageType] = useState<string>('');
  const [template, setTemplate] = useState<string>('');
  const [isEssential, setIsEssential] = useState(false);

  // Homepage data
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

  const handleTemplateSelect = (template: PageTemplate | null) => {
    if (template) {
      // Apply template
      setTitle(template.title);
      setSlug(template.slug);
      setContent(template.content);
      setExcerpt(template.excerpt || '');
      setMetaTitle(template.metaTitle);
      setMetaDescription(template.metaDescription);
      setMetaKeywords(template.metaKeywords);
      setOgTitle(template.ogTitle || '');
      setOgDescription(template.ogDescription || '');
      setTwitterTitle(template.twitterTitle || '');
      setTwitterDescription(template.twitterDescription || '');
      setPageType(template.pageType);
      setTemplate(template.id);
      setIsEssential(template.isEssential);
      setHomepageData(template.homepageData || null);
      setStatus('draft'); // Start as draft
    }
    setSelectedTemplate(template);
    setStep('edit');
  };

  const handleBack = () => {
    if (step === 'edit') {
      // Ask for confirmation if there's content
      if (title || content) {
        if (confirm('You have unsaved changes. Are you sure you want to go back?')) {
          setStep('template');
        }
      } else {
        setStep('template');
      }
    } else {
      router.push('/admin/pages');
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
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug: pageType === 'homepage' ? '' : (slug || undefined),
          content,
          excerpt: excerpt || undefined,
          status,
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
          metaKeywords: metaKeywords || undefined,
          canonicalUrl: canonicalUrl || undefined,
          ogTitle: ogTitle || undefined,
          ogDescription: ogDescription || undefined,
          twitterTitle: twitterTitle || undefined,
          twitterDescription: twitterDescription || undefined,
          pageType: pageType || undefined,
          template: template || undefined,
          isEssential: isEssential || undefined,
          homepageData: homepageData || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      alert('Page created successfully!');
      router.push('/admin/pages');
    } catch (error) {
      console.error('Error creating page:', error);
      alert(error instanceof Error ? error.message : 'Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  // Show template selector first
  if (step === 'template') {
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                Create New Page
              </h1>
              <p className="text-gray-600">Choose a template or start from scratch</p>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <TemplateSelector
          onSelectTemplate={handleTemplateSelect}
          onClose={() => router.push('/admin/pages')}
        />
      </div>
    );
  }

  // Show editor with split-screen preview
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 'edit' && selectedTemplate ? 'Choose Different Template' : 'Back'}
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{title || 'New Page'}</h1>
            {selectedTemplate && (
              <p className="text-sm text-gray-600">
                Using template: {selectedTemplate.icon} {selectedTemplate.name}
              </p>
            )}
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Creating...' : 'Create Page'}
        </Button>
      </div>

      {/* Three Column Editor: Content | SEO | Preview */}
      <ThreeColumnEditor
        title={title}
        slug={slug}
        content={content}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        metaKeywords={metaKeywords}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        twitterTitle={twitterTitle}
        twitterDescription={twitterDescription}
        isHomepage={pageType === 'homepage'}
        heroTitle={homepageData?.heroTitle || ''}
        showPreviewByDefault={true}
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
    </div>
  );
}