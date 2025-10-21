'use client';

import Image from 'next/image';
import { Facebook } from 'lucide-react';

interface FacebookSharePreviewProps {
  title: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  siteUrl?: string;
}

export default function FacebookSharePreview({
  title,
  ogTitle,
  ogDescription,
  ogImage,
  siteUrl = 'YOURSTORE.COM',
}: FacebookSharePreviewProps) {
  // Use OG title or fall back to page title
  const displayTitle = ogTitle || title || 'Untitled Page';
  const truncatedTitle = displayTitle.length > 88 
    ? displayTitle.substring(0, 85) + '...' 
    : displayTitle;

  // Use OG description or provide default
  const displayDescription = ogDescription || 'No description provided. Add Open Graph description for better social sharing!';
  const truncatedDescription = displayDescription.length > 300 
    ? displayDescription.substring(0, 297) + '...' 
    : displayDescription;

  // Clean site URL
  const cleanSiteUrl = siteUrl.replace(/^https?:\/\//, '').toUpperCase();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <Facebook className="h-4 w-4 text-blue-600" />
        <h3 className="font-semibold text-sm">Facebook Share Preview</h3>
      </div>

      {/* Facebook Card */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full aspect-[1.91/1] bg-gray-200 flex items-center justify-center">
          {ogImage ? (
            <Image
              src={ogImage}
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
              <p className="text-sm text-gray-500">No OG Image</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: 1200x630px</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3 bg-gray-50 border-t">
          <div className="space-y-1">
            {/* Site URL */}
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {cleanSiteUrl}
            </p>

            {/* Title */}
            <h4 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
              {truncatedTitle}
            </h4>

            {/* Description */}
            {displayDescription && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {truncatedDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Character Count Status */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">OG Title:</span>
          <span className={`font-medium ${
            displayTitle.length <= 88 ? 'text-green-600' : 'text-red-600'
          }`}>
            {displayTitle.length}/88 chars
            {displayTitle.length <= 88 ? ' ✓' : ' ⚠ Too Long'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">OG Description:</span>
          <span className={`font-medium ${
            displayDescription.length <= 300 ? 'text-green-600' : 'text-red-600'
          }`}>
            {displayDescription.length}/300 chars
            {displayDescription.length <= 300 ? ' ✓' : ' ⚠ Too Long'}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="text-xs bg-blue-50 border border-blue-200 rounded p-3 space-y-1">
        <p className="font-semibold text-blue-900">💡 Facebook Tips:</p>
        <ul className="text-blue-800 space-y-1 ml-4 list-disc">
          <li>Image: 1200x630px (optimal for all devices)</li>
          <li>Title: Max 88 characters</li>
          <li>Description: Max 300 characters</li>
          <li>Use high-quality, eye-catching images</li>
          <li>Make title compelling for social sharing</li>
        </ul>
      </div>
    </div>
  );
}
