'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
import GoogleSearchPreview from '@/components/seo/GoogleSearchPreview';
import FacebookSharePreview from '@/components/seo/FacebookSharePreview';
import TwitterCardPreview from '@/components/seo/TwitterCardPreview';
import SEOScorePanel from '@/components/seo/SEOScorePanel';

interface ThreeColumnEditorProps {
  // Content section (left)
  contentSection: React.ReactNode;
  
  // SEO section (middle)
  seoSection: React.ReactNode;
  
  // Preview data (right)
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Homepage specific
  isHomepage?: boolean;
  heroTitle?: string;
  
  // Optional config
  siteName?: string;
  siteUrl?: string;
  showPreviewByDefault?: boolean;
}

export default function ThreeColumnEditor({
  contentSection,
  seoSection,
  title,
  slug,
  content,
  metaDescription,
  metaKeywords,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  isHomepage = false,
  heroTitle = '',
  siteName = 'Your Store',
  siteUrl = 'yourstore.com',
  showPreviewByDefault = true,
}: ThreeColumnEditorProps) {
  const [showPreview, setShowPreview] = useState(showPreviewByDefault);
  const [expandedColumn, setExpandedColumn] = useState<'content' | 'seo' | 'preview' | null>(null);

  // Use title as primary for browser tab
  const displayTitle = title || 'Untitled';

  return (
    <div className="flex flex-col h-full">
      {/* Control Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            variant={showPreview ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview On
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Preview Off
              </>
            )}
          </Button>
        </div>
        
        <p className="text-sm text-gray-600">
          {showPreview ? '3-Column Editor: Content | SEO | Preview' : 'Focus mode'}
        </p>
      </div>

      {/* Three Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Content Section (40%) */}
        <div
          className={`border-r bg-white overflow-y-auto transition-all ${
            !showPreview
              ? 'w-full'
              : expandedColumn === 'content'
              ? 'w-3/4'
              : expandedColumn
              ? 'hidden md:block md:w-1/6'
              : 'w-full md:w-2/5'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📝 Content</h3>
              {showPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedColumn(expandedColumn === 'content' ? null : 'content')}
                >
                  {expandedColumn === 'content' ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            {contentSection}
          </div>
        </div>

        {/* MIDDLE: SEO Settings (20%) */}
        {showPreview && (
          <div
            className={`border-r bg-gray-50 overflow-y-auto transition-all ${
              expandedColumn === 'seo'
                ? 'w-3/4'
                : expandedColumn
                ? 'hidden md:block md:w-1/6'
                : 'hidden md:block md:w-1/5'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">🎯 SEO</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedColumn(expandedColumn === 'seo' ? null : 'seo')}
                >
                  {expandedColumn === 'seo' ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {seoSection}
            </div>
          </div>
        )}

        {/* RIGHT: Preview Section (40%) */}
        {showPreview && (
          <div
            className={`bg-white overflow-y-auto transition-all ${
              expandedColumn === 'preview'
                ? 'w-3/4'
                : expandedColumn
                ? 'hidden md:block md:w-1/6'
                : 'w-full md:w-2/5'
            }`}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">👁️ Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedColumn(expandedColumn === 'preview' ? null : 'preview')}
                >
                  {expandedColumn === 'preview' ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* SEO Score Panel - Always at top */}
              <div className="sticky top-0 bg-white pb-4 z-10">
                <SEOScorePanel
                  title={title}
                  metaDescription={metaDescription}
                  metaKeywords={metaKeywords}
                  content={content}
                  slug={slug}
                  ogTitle={ogTitle}
                  ogDescription={ogDescription}
                  twitterTitle={twitterTitle}
                  twitterDescription={twitterDescription}
                  isHomepage={isHomepage}
                  heroTitle={heroTitle}
                />
              </div>

              {/* Divider */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold mb-4 text-gray-700">Social Media Previews</h4>
              </div>

              {/* Google Search Preview */}
              <GoogleSearchPreview
                title={displayTitle}
                slug={slug}
                metaDescription={metaDescription}
                siteName={siteName}
                siteUrl={siteUrl}
              />

              {/* Facebook Preview */}
              <FacebookSharePreview
                title={title}
                ogTitle={ogTitle}
                ogDescription={ogDescription}
                ogImage={ogImage}
                siteUrl={siteUrl}
              />

              {/* Twitter Preview */}
              <TwitterCardPreview
                title={title}
                twitterTitle={twitterTitle}
                twitterDescription={twitterDescription}
                twitterImage={twitterImage}
                siteUrl={siteUrl}
              />

              {/* SEO Tips */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold text-indigo-900">🎯 Quick SEO Checklist:</p>
                <ul className="text-indigo-800 space-y-1 text-xs">
                  <li>✓ Title optimized (50-60 chars)</li>
                  <li>✓ Meta description compelling (150-160 chars)</li>
                  <li>✓ URL slug clean and descriptive</li>
                  <li>✓ Content quality (300+ words)</li>
                  <li>✓ Internal links (2-3 minimum)</li>
                  <li>✓ Images with alt text</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Toggle (Bottom) */}
      {showPreview && (
        <div className="md:hidden fixed bottom-20 right-4 z-50 flex gap-2">
          <Button
            size="sm"
            className="rounded-full shadow-lg"
            onClick={() => setExpandedColumn(expandedColumn === 'seo' ? null : 'seo')}
            style={{ backgroundColor: 'var(--theme-secondary, #6c757d)' }}
          >
            🎯 SEO
          </Button>
          <Button
            size="sm"
            className="rounded-full shadow-lg"
            onClick={() => setExpandedColumn(expandedColumn === 'preview' ? null : 'preview')}
            style={{ backgroundColor: 'var(--theme-primary, #0070f3)' }}
          >
            👁️ Preview
          </Button>
        </div>
      )}
    </div>
  );
}
