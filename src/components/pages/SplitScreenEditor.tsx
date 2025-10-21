'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
import GoogleSearchPreview from '@/components/seo/GoogleSearchPreview';
import FacebookSharePreview from '@/components/seo/FacebookSharePreview';
import TwitterCardPreview from '@/components/seo/TwitterCardPreview';
import SEOScorePanel from '@/components/seo/SEOScorePanel';

interface SplitScreenEditorProps {
  // Editor content
  children: React.ReactNode;
  
  // Preview data
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
  
  // Optional config
  siteName?: string;
  siteUrl?: string;
  showPreviewByDefault?: boolean;
}

export default function SplitScreenEditor({
  children,
  title,
  slug,
  content,
  metaTitle,
  metaDescription,
  metaKeywords,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  siteName = 'Your Store',
  siteUrl = 'yourstore.com',
  showPreviewByDefault = true,
}: SplitScreenEditorProps) {
  const [showPreview, setShowPreview] = useState(showPreviewByDefault);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  // Use metaTitle or fall back to title
  const displayMetaTitle = metaTitle || title;

  return (
    <div className="flex flex-col h-full">
      {/* Preview Toggle Bar */}
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
          
          {showPreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
            >
              {isPreviewExpanded ? (
                <>
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Normal
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Expand Preview
                </>
              )}
            </Button>
          )}
        </div>
        
        <p className="text-sm text-gray-600">
          {showPreview ? 'Real-time SEO preview' : 'Focus mode - preview hidden'}
        </p>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Section (Left) - 60% width */}
        <div
          className={`flex-1 overflow-y-auto p-6 transition-all ${
            showPreview
              ? isPreviewExpanded
                ? 'hidden md:block md:w-1/3'
                : 'w-full md:w-3/5'
              : 'w-full'
          }`}
        >
          {children}
        </div>

        {/* Preview Section (Right) - 40% width */}
        {showPreview && (
          <div
            className={`border-l bg-gray-50 overflow-y-auto transition-all ${
              isPreviewExpanded
                ? 'w-full md:w-2/3'
                : 'hidden md:block md:w-2/5'
            }`}
          >
            <div className="p-6 space-y-6">
              {/* SEO Score Panel - Always at top */}
              <div className="sticky top-0 bg-gray-50 pb-4 z-10">
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
                />
              </div>

              {/* Divider */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Social Media Previews</h3>
              </div>

              {/* Google Search Preview */}
              <GoogleSearchPreview
                title={displayMetaTitle}
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

              {/* Additional SEO Tips */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold text-indigo-900">🎯 Quick SEO Checklist:</p>
                <ul className="text-indigo-800 space-y-1 text-xs">
                  <li>✓ Unique, descriptive title (50-60 chars)</li>
                  <li>✓ Compelling meta description (150-160 chars)</li>
                  <li>✓ One H1 heading (contains main keyword)</li>
                  <li>✓ H2 and H3 subheadings for structure</li>
                  <li>✓ At least 300 words of quality content</li>
                  <li>✓ 2-3 internal links to related pages</li>
                  <li>✓ Images with descriptive alt text</li>
                  <li>✓ Mobile-responsive and fast-loading</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Preview Toggle (Bottom) */}
      {showPreview && (
        <div className="md:hidden fixed bottom-20 right-4 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg"
            onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
            style={{
              backgroundColor: 'var(--theme-primary, #0070f3)',
            }}
          >
            {isPreviewExpanded ? (
              <>
                <Minimize2 className="h-5 w-5 mr-2" />
                Editor
              </>
            ) : (
              <>
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
