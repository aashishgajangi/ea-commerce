'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Globe, Twitter, Code, Eye, AlertCircle, CheckCircle, 
  XCircle, ChevronDown, ChevronUp, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOData } from '@/lib/seo/types';
import { calculateSEOScore, generateSchemaData } from '@/lib/seo/scoring';

interface SEOSidebarProps {
  data: SEOData;
  onChange: (data: SEOData) => void;
  pageTitle?: string;
  pageContent?: string;
  pageUrl?: string;
}

export default function SEOSidebar({ 
  data, 
  onChange, 
  pageTitle = '',
  pageContent = '',
  pageUrl = '',
}: SEOSidebarProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'advanced' | 'schema'>('basic');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['og', 'twitter']));
  const [seoAnalysis, setSeoAnalysis] = useState({ score: 0, issues: [] as string[], suggestions: [] as string[] });

  useEffect(() => {
    const analysis = calculateSEOScore(data);
    setSeoAnalysis(analysis);
  }, [data]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateData = (updates: Partial<SEOData>) => {
    onChange({ ...data, ...updates });
  };

  const autoFillBasic = () => {
    const updates: Partial<SEOData> = {};
    if (!data.metaTitle && pageTitle) {
      updates.metaTitle = pageTitle.slice(0, 60);
    }
    if (!data.metaDescription && pageContent) {
      const text = pageContent.replace(/<[^>]*>/g, ' ').trim();
      updates.metaDescription = text.slice(0, 160);
    }
    if (!data.canonicalUrl && pageUrl) {
      updates.canonicalUrl = pageUrl;
    }
    updateData(updates);
  };

  const autoFillSocial = () => {
    const updates: Partial<SEOData> = {};
    if (!data.ogTitle) updates.ogTitle = data.metaTitle || pageTitle;
    if (!data.ogDescription) updates.ogDescription = data.metaDescription;
    if (!data.ogType) updates.ogType = 'website';
    if (!data.twitterTitle) updates.twitterTitle = data.metaTitle || pageTitle;
    if (!data.twitterDescription) updates.twitterDescription = data.metaDescription;
    if (!data.twitterCard) updates.twitterCard = 'summary_large_image';
    updateData(updates);
  };

  const handleGenerateSchema = () => {
    if (!data.schemaType) return;
    const schemaData = generateSchemaData(data.schemaType, data, pageTitle, pageUrl);
    if (schemaData) {
      updateData({ schemaData });
    }
  };

  const getSeoScoreColor = () => {
    if (seoAnalysis.score >= 80) return 'text-green-600';
    if (seoAnalysis.score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeoScoreIcon = () => {
    if (seoAnalysis.score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (seoAnalysis.score >= 50) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow-sm border">
      {/* Header with SEO Score */}
      <div className="p-3 bg-white border-b rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">SEO Optimization</h2>
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">SEO Score</span>
            {getSeoScoreIcon()}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  seoAnalysis.score >= 80 ? 'bg-green-600' : seoAnalysis.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${seoAnalysis.score}%` }}
              />
            </div>
            <span className={`text-2xl font-bold ${getSeoScoreColor()}`}>
              {seoAnalysis.score}
            </span>
          </div>
          
          {/* Issues Preview */}
          {seoAnalysis.issues.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setActiveTab('advanced')}
                className="w-full text-left p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-yellow-900">
                    ⚠️ {seoAnalysis.issues.length} issue{seoAnalysis.issues.length !== 1 ? 's' : ''} found
                  </span>
                  <span className="text-xs text-yellow-700">Click to view →</span>
                </div>
              </button>
              
              {/* Show first 2 issues as preview */}
              <div className="mt-2 space-y-1">
                {seoAnalysis.issues.slice(0, 2).map((issue, index) => (
                  <div key={index} className="text-xs text-yellow-800 flex items-start gap-1 pl-2">
                    <span className="text-yellow-600">•</span>
                    <span className="line-clamp-1">{issue}</span>
                  </div>
                ))}
                {seoAnalysis.issues.length > 2 && (
                  <div className="text-xs text-yellow-700 pl-2">
                    +{seoAnalysis.issues.length - 2} more issue{seoAnalysis.issues.length - 2 !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Success Message */}
          {seoAnalysis.score >= 80 && seoAnalysis.issues.length === 0 && (
            <div className="mt-3 text-xs text-green-700 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Great! No issues found</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-3">
        <div className="flex gap-1">
          {[
            { id: 'basic', label: 'Basic', icon: Search },
            { id: 'social', label: 'Social', icon: Globe },
            { id: 'advanced', label: 'Advanced', icon: Eye },
            { id: 'schema', label: 'Schema', icon: Code },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'basic' | 'social' | 'advanced' | 'schema')}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 pb-6 space-y-3">
        {/* BASIC TAB */}
        {activeTab === 'basic' && (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Basic Meta Tags</h3>
              <Button size="sm" variant="outline" onClick={autoFillBasic}>
                Auto-fill
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.metaTitle || ''}
                onChange={(e) => updateData({ metaTitle: e.target.value })}
                placeholder="Enter meta title (50-60 characters)"
                className="w-full px-2 py-1.5 border rounded text-sm"
                maxLength={70}
              />
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs ${
                  (data.metaTitle?.length || 0) >= 50 && (data.metaTitle?.length || 0) <= 60
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                  {data.metaTitle?.length || 0} / 60 characters
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={data.metaDescription || ''}
                onChange={(e) => updateData({ metaDescription: e.target.value })}
                placeholder="Enter meta description (150-160 characters)"
                className="w-full px-2 py-1.5 border rounded text-sm"
                rows={2}
                maxLength={170}
              />
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs ${
                  (data.metaDescription?.length || 0) >= 150 && (data.metaDescription?.length || 0) <= 160
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                  {data.metaDescription?.length || 0} / 160 characters
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Focus Keyphrases
                <span className="text-xs text-gray-500 ml-2">(up to 5)</span>
              </label>
              {(() => {
                const currentKeyphrases = data.focusKeyphrases || (data.focusKeyphrase ? [data.focusKeyphrase] : ['']);
                return currentKeyphrases.map((kp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={kp || ''}
                      onChange={(e) => {
                        const newKeyphrases = [...currentKeyphrases];
                        newKeyphrases[index] = e.target.value;
                        const filtered = newKeyphrases.filter(Boolean) as string[];
                        updateData({ 
                          focusKeyphrases: filtered,
                          focusKeyphrase: filtered[0] || '' // Keep backward compatibility
                        });
                      }}
                      placeholder={index === 0 ? "Primary keyphrase (e.g., best running shoes)" : `Secondary keyphrase ${index + 1}`}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    {index > 0 && (
                      <button
                        onClick={() => {
                          const newKeyphrases = [...currentKeyphrases];
                          newKeyphrases.splice(index, 1);
                          const filtered = newKeyphrases.filter(Boolean) as string[];
                          updateData({ 
                            focusKeyphrases: filtered,
                            focusKeyphrase: filtered[0] || ''
                          });
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ));
              })()}
              {((data.focusKeyphrases || (data.focusKeyphrase ? [data.focusKeyphrase] : [])).length < 5) && (
                <button
                  onClick={() => {
                    const current = data.focusKeyphrases || (data.focusKeyphrase ? [data.focusKeyphrase] : []);
                    updateData({ 
                      focusKeyphrases: [...current, ''] as string[]
                    });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                >
                  + Add keyphrase
                </button>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Primary keyphrase is most important. Add up to 4 secondary keyphrases.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Keywords</label>
              <input
                type="text"
                value={data.metaKeywords || ''}
                onChange={(e) => updateData({ metaKeywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Canonical URL</label>
              <input
                type="url"
                value={data.canonicalUrl || ''}
                onChange={(e) => updateData({ canonicalUrl: e.target.value })}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Prevents duplicate content issues</p>
            </div>
          </>
        )}

        {/* SOCIAL TAB */}
        {activeTab === 'social' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Social Media</h3>
              <Button size="sm" variant="outline" onClick={autoFillSocial}>
                Auto-fill
              </Button>
            </div>

            {/* Open Graph */}
            <div className="border rounded-lg p-4 bg-white">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('og')}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <h4 className="font-medium">Open Graph (Facebook)</h4>
                </div>
                {expandedSections.has('og') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>

              {expandedSections.has('og') && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">OG Title</label>
                    <input
                      type="text"
                      value={data.ogTitle || ''}
                      onChange={(e) => updateData({ ogTitle: e.target.value })}
                      placeholder="Title for social media"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">OG Description</label>
                    <textarea
                      value={data.ogDescription || ''}
                      onChange={(e) => updateData({ ogDescription: e.target.value })}
                      placeholder="Description for social media"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">OG Type</label>
                    <select
                      value={data.ogType || 'website'}
                      onChange={(e) => updateData({ ogType: e.target.value as 'website' | 'article' | 'product' | 'blog' })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="website">Website</option>
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                      <option value="blog">Blog</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">OG Image URL</label>
                    <input
                      type="url"
                      value={data.ogImageUrl || ''}
                      onChange={(e) => updateData({ ogImageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                  </div>
                </div>
              )}
            </div>

            {/* Twitter Card */}
            <div className="border rounded-lg p-4 bg-white">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('twitter')}
              >
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <h4 className="font-medium">Twitter Card</h4>
                </div>
                {expandedSections.has('twitter') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>

              {expandedSections.has('twitter') && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter Title</label>
                    <input
                      type="text"
                      value={data.twitterTitle || ''}
                      onChange={(e) => updateData({ twitterTitle: e.target.value })}
                      placeholder="Title for Twitter"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter Description</label>
                    <textarea
                      value={data.twitterDescription || ''}
                      onChange={(e) => updateData({ twitterDescription: e.target.value })}
                      placeholder="Description for Twitter"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter Card Type</label>
                    <select
                      value={data.twitterCard || 'summary_large_image'}
                      onChange={(e) => updateData({ twitterCard: e.target.value as 'summary' | 'summary_large_image' | 'app' | 'player' })}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter Image URL</label>
                    <input
                      type="url"
                      value={data.twitterImageUrl || ''}
                      onChange={(e) => updateData({ twitterImageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 1200x675px</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ADVANCED TAB */}
        {activeTab === 'advanced' && (
          <>
            <h3 className="font-semibold mb-4">Advanced Settings</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Robots Meta Tag</label>
              <select
                value={data.robots || 'index,follow'}
                onChange={(e) => updateData({ robots: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="index,follow">Index, Follow (Default)</option>
                <option value="noindex,follow">No Index, Follow</option>
                <option value="index,nofollow">Index, No Follow</option>
                <option value="noindex,nofollow">No Index, No Follow</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Controls search engine crawling</p>
            </div>

            {seoAnalysis.issues.length > 0 && (
              <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  SEO Issues ({seoAnalysis.issues.length})
                </h4>
                <ul className="space-y-2">
                  {seoAnalysis.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {seoAnalysis.suggestions.length > 0 && (
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suggestions ({seoAnalysis.suggestions.length})
                </h4>
                <ul className="space-y-2">
                  {seoAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* SCHEMA TAB */}
        {activeTab === 'schema' && (
          <>
            <h3 className="text-sm font-semibold mb-2">Structured Data (JSON-LD)</h3>

            <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
              <p className="text-sm text-blue-800">
                <strong>JSON-LD</strong> helps search engines understand your content and enables rich results.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Schema Type</label>
              <select
                value={data.schemaType || ''}
                onChange={(e) => updateData({ schemaType: e.target.value as SEOData['schemaType'] })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select schema type...</option>
                <option value="Article">Article</option>
                <option value="WebPage">WebPage</option>
                <option value="Product">Product</option>
                <option value="FAQPage">FAQ Page</option>
                <option value="Organization">Organization</option>
                <option value="Person">Person</option>
                <option value="Event">Event</option>
                <option value="Recipe">Recipe</option>
                <option value="Review">Review</option>
              </select>
            </div>

            {data.schemaType && (
              <>
                <Button 
                  onClick={handleGenerateSchema}
                  className="w-full"
                  variant="outline"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Generate Schema
                </Button>

                {data.schemaData && (
                  <div>
                    <label className="block text-sm font-medium mb-2">JSON-LD Code</label>
                    <textarea
                      value={JSON.stringify(data.schemaData, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          updateData({ schemaData: parsed });
                        } catch {
                          // Invalid JSON
                        }
                      }}
                      className="w-full px-2 py-1.5 border rounded text-xs font-mono"
                      rows={5}
                    />
                    <p className="text-xs text-gray-500 mt-1 mb-2">
                      This will be added to your page&apos;s &lt;head&gt;
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
