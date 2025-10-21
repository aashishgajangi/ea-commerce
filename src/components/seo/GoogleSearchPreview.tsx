'use client';

import { Globe } from 'lucide-react';

interface GoogleSearchPreviewProps {
  title: string;
  slug: string;
  metaDescription: string;
  siteName?: string;
  siteUrl?: string;
}

export default function GoogleSearchPreview({
  title,
  slug,
  metaDescription,
  siteName = 'Your Store',
  siteUrl = 'yourstore.com',
}: GoogleSearchPreviewProps) {
  // Clean site URL (remove protocol)
  const cleanSiteUrl = siteUrl.replace(/^https?:\/\//, '');
  
  // Create full URL display
  const fullUrl = slug === '' || slug === '/' 
    ? cleanSiteUrl 
    : `${cleanSiteUrl} › ${slug}`;
  
  // Use title or meta title (max 60 chars recommended)
  const displayTitle = title || 'Untitled Page';
  const truncatedTitle = displayTitle.length > 60 
    ? displayTitle.substring(0, 57) + '...' 
    : displayTitle;
  
  // Meta description (max 160 chars recommended)
  const displayDescription = metaDescription || 'No meta description provided. Add one to improve SEO!';
  const truncatedDescription = displayDescription.length > 160 
    ? displayDescription.substring(0, 157) + '...' 
    : displayDescription;
  
  // Character count status
  const titleStatus = displayTitle.length >= 50 && displayTitle.length <= 60 ? 'optimal' : 
                      displayTitle.length > 60 ? 'long' : 'short';
  const descStatus = displayDescription.length >= 150 && displayDescription.length <= 160 ? 'optimal' : 
                     displayDescription.length > 160 ? 'long' : 'short';

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Globe className="h-4 w-4 text-blue-600" />
        <h3 className="font-semibold text-sm">Google Search Preview</h3>
      </div>

      {/* Google Search Result Card */}
      <div className="bg-white border rounded-lg p-4 space-y-2">
        {/* Site URL */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {siteName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">{cleanSiteUrl}</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-blue-600 text-xl font-normal hover:underline cursor-pointer leading-tight">
            {truncatedTitle}
          </h3>
        </div>

        {/* Breadcrumb URL */}
        <div className="text-sm text-gray-700">
          {fullUrl}
        </div>

        {/* Meta Description */}
        <div className="text-sm text-gray-600 leading-relaxed">
          {truncatedDescription}
        </div>
      </div>

      {/* Character Count Status */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Title Length:</span>
          <span className={`font-medium ${
            titleStatus === 'optimal' ? 'text-green-600' :
            titleStatus === 'long' ? 'text-red-600' :
            'text-orange-600'
          }`}>
            {displayTitle.length} chars
            {titleStatus === 'optimal' && ' ✓ Optimal'}
            {titleStatus === 'long' && ' ⚠ Too Long'}
            {titleStatus === 'short' && ' ⚠ Too Short'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Description Length:</span>
          <span className={`font-medium ${
            descStatus === 'optimal' ? 'text-green-600' :
            descStatus === 'long' ? 'text-red-600' :
            'text-orange-600'
          }`}>
            {displayDescription.length} chars
            {descStatus === 'optimal' && ' ✓ Optimal'}
            {descStatus === 'long' && ' ⚠ Too Long'}
            {descStatus === 'short' && ' ⚠ Too Short'}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="text-xs bg-blue-50 border border-blue-200 rounded p-3 space-y-1">
        <p className="font-semibold text-blue-900">💡 SEO Tips:</p>
        <ul className="text-blue-800 space-y-1 ml-4 list-disc">
          <li>Title: 50-60 characters (currently {displayTitle.length})</li>
          <li>Description: 150-160 characters (currently {displayDescription.length})</li>
          <li>Include target keywords naturally</li>
          <li>Make it compelling - encourage clicks!</li>
        </ul>
      </div>
    </div>
  );
}
