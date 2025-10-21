'use client';

import Image from 'next/image';
import { Twitter } from 'lucide-react';

interface TwitterCardPreviewProps {
  title: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  siteUrl?: string;
}

export default function TwitterCardPreview({
  title,
  twitterTitle,
  twitterDescription,
  twitterImage,
  siteUrl = 'yourstore.com',
}: TwitterCardPreviewProps) {
  // Use Twitter title or fall back to page title
  const displayTitle = twitterTitle || title || 'Untitled Page';
  const truncatedTitle = displayTitle.length > 70 
    ? displayTitle.substring(0, 67) + '...' 
    : displayTitle;

  // Use Twitter description or provide default
  const displayDescription = twitterDescription || 'No description provided. Add Twitter Card description for better sharing!';
  const truncatedDescription = displayDescription.length > 200 
    ? displayDescription.substring(0, 197) + '...' 
    : displayDescription;

  // Clean site URL
  const cleanSiteUrl = siteUrl.replace(/^https?:\/\//, '').toLowerCase();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Twitter className="h-4 w-4 text-blue-400" />
        <h3 className="font-semibold text-sm">Twitter Card Preview</h3>
      </div>

      {/* Twitter Card - Summary Large Image */}
      <div className="bg-white border rounded-2xl overflow-hidden max-w-lg">
        {/* Image Section */}
        <div className="relative w-full aspect-[2/1] bg-gray-200 flex items-center justify-center">
          {twitterImage ? (
            <Image
              src={twitterImage}
              alt={displayTitle}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No Twitter Image</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: 1200x600px</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          {/* Title */}
          <h4 className="text-base font-semibold text-gray-900 leading-tight line-clamp-1">
            {truncatedTitle}
          </h4>

          {/* Description */}
          {displayDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {truncatedDescription}
            </p>
          )}

          {/* Site URL */}
          <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            <span>{cleanSiteUrl}</span>
          </div>
        </div>
      </div>

      {/* Character Count Status */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Twitter Title:</span>
          <span className={`font-medium ${
            displayTitle.length <= 70 ? 'text-green-600' : 'text-red-600'
          }`}>
            {displayTitle.length}/70 chars
            {displayTitle.length <= 70 ? ' ✓' : ' ⚠ Too Long'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Twitter Description:</span>
          <span className={`font-medium ${
            displayDescription.length <= 200 ? 'text-green-600' : 'text-red-600'
          }`}>
            {displayDescription.length}/200 chars
            {displayDescription.length <= 200 ? ' ✓' : ' ⚠ Too Long'}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="text-xs bg-blue-50 border border-blue-200 rounded p-3 space-y-1">
        <p className="font-semibold text-blue-900">💡 Twitter Tips:</p>
        <ul className="text-blue-800 space-y-1 ml-4 list-disc">
          <li>Image: 1200x600px (2:1 ratio for large cards)</li>
          <li>Alternative: 800x800px for summary cards</li>
          <li>Title: Max 70 characters</li>
          <li>Description: Max 200 characters</li>
          <li>Use engaging, visual content</li>
          <li>Test your cards with Twitter&apos;s validator</li>
        </ul>
      </div>
    </div>
  );
}
