'use client';

import { CheckCircle2, AlertCircle, XCircle, TrendingUp } from 'lucide-react';

interface SEOScorePanelProps {
  title: string;
  metaDescription: string;
  metaKeywords?: string;
  content: string;
  slug: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  isHomepage?: boolean;
  heroTitle?: string;
}

interface SEOCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  importance: 'critical' | 'high' | 'medium';
}

export default function SEOScorePanel({
  title,
  metaDescription,
  content,
  slug,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  isHomepage = false,
  heroTitle = '',
}: SEOScorePanelProps) {
  // Strip HTML tags from content for analysis
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const plainContent = stripHtml(content);
  const wordCount = plainContent.split(/\s+/).filter(word => word.length > 0).length;

  // Count headings (simplified - checks for H1-H6 tags)
  // For homepage, Hero title counts as H1 even if not in content
  let h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
  if (isHomepage && heroTitle) {
    h1Count += 1; // Hero section has H1
  }
  const h2Count = (content.match(/<h2[^>]*>/gi) || []).length;
  const totalHeadings = (content.match(/<h[1-6][^>]*>/gi) || []).length;

  // Count links
  const internalLinks = (content.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || []).filter(
    link => !link.includes('http://') && !link.includes('https://')
  ).length;
  const externalLinks = (content.match(/<a[^>]*href=["']https?:\/\/[^"']*["'][^>]*>/gi) || []).length;

  // Count images and check for alt text
  const images = (content.match(/<img[^>]*>/gi) || []);
  const imagesWithAlt = images.filter(img => img.includes('alt=')).length;

  // Perform SEO checks
  const checks: SEOCheck[] = [];

  // Title checks
  if (title.length === 0) {
    checks.push({
      name: 'Page Title',
      status: 'fail',
      message: 'Title is missing - Add a descriptive title',
      importance: 'critical',
    });
  } else if (title.length < 30) {
    checks.push({
      name: 'Page Title',
      status: 'warning',
      message: `Title is too short (${title.length} chars) - Aim for 50-60 characters`,
      importance: 'high',
    });
  } else if (title.length > 60) {
    checks.push({
      name: 'Page Title',
      status: 'warning',
      message: `Title is too long (${title.length} chars) - Keep it under 60 characters`,
      importance: 'high',
    });
  } else {
    checks.push({
      name: 'Page Title',
      status: 'pass',
      message: `Title length is optimal (${title.length} chars)`,
      importance: 'critical',
    });
  }

  // Meta description checks
  if (!metaDescription || metaDescription.length === 0) {
    checks.push({
      name: 'Meta Description',
      status: 'fail',
      message: 'Meta description is missing - Add one to improve click-through rate',
      importance: 'critical',
    });
  } else if (metaDescription.length < 120) {
    checks.push({
      name: 'Meta Description',
      status: 'warning',
      message: `Description is too short (${metaDescription.length} chars) - Aim for 150-160 characters`,
      importance: 'high',
    });
  } else if (metaDescription.length > 160) {
    checks.push({
      name: 'Meta Description',
      status: 'warning',
      message: `Description is too long (${metaDescription.length} chars) - Keep it under 160 characters`,
      importance: 'high',
    });
  } else {
    checks.push({
      name: 'Meta Description',
      status: 'pass',
      message: `Meta description length is optimal (${metaDescription.length} chars)`,
      importance: 'critical',
    });
  }

  // H1 checks
  if (h1Count === 0) {
    checks.push({
      name: 'H1 Heading',
      status: 'fail',
      message: 'No H1 heading found - Add exactly one H1 to your content',
      importance: 'critical',
    });
  } else if (h1Count > 1) {
    checks.push({
      name: 'H1 Heading',
      status: 'warning',
      message: `Multiple H1 headings found (${h1Count}) - Use only one H1 per page`,
      importance: 'high',
    });
  } else {
    checks.push({
      name: 'H1 Heading',
      status: 'pass',
      message: 'Exactly one H1 heading found',
      importance: 'critical',
    });
  }

  // Heading structure
  if (totalHeadings < 2) {
    checks.push({
      name: 'Heading Structure',
      status: 'warning',
      message: 'Add more headings (H2, H3) to organize content',
      importance: 'medium',
    });
  } else if (h2Count === 0) {
    checks.push({
      name: 'Heading Structure',
      status: 'warning',
      message: 'Add H2 headings to create clear content sections',
      importance: 'medium',
    });
  } else {
    checks.push({
      name: 'Heading Structure',
      status: 'pass',
      message: `Good heading structure (${totalHeadings} headings total)`,
      importance: 'medium',
    });
  }

  // Content length
  if (wordCount < 300) {
    checks.push({
      name: 'Content Length',
      status: 'warning',
      message: `Content is short (${wordCount} words) - Aim for at least 300 words`,
      importance: 'high',
    });
  } else {
    checks.push({
      name: 'Content Length',
      status: 'pass',
      message: `Good content length (${wordCount} words)`,
      importance: 'high',
    });
  }

  // Internal links
  if (internalLinks < 2) {
    checks.push({
      name: 'Internal Links',
      status: 'warning',
      message: `Add more internal links (currently ${internalLinks}) - Link to related pages`,
      importance: 'medium',
    });
  } else {
    checks.push({
      name: 'Internal Links',
      status: 'pass',
      message: `Good internal linking (${internalLinks} links)`,
      importance: 'medium',
    });
  }

  // Images and alt text
  if (images.length > 0 && imagesWithAlt < images.length) {
    checks.push({
      name: 'Image Alt Text',
      status: 'warning',
      message: `${images.length - imagesWithAlt} images missing alt text - Add for accessibility`,
      importance: 'medium',
    });
  } else if (images.length > 0) {
    checks.push({
      name: 'Image Alt Text',
      status: 'pass',
      message: 'All images have alt text',
      importance: 'medium',
    });
  }

  // URL/Slug check
  if (slug.length > 60) {
    checks.push({
      name: 'URL Slug',
      status: 'warning',
      message: 'URL slug is too long - Keep it short and descriptive',
      importance: 'medium',
    });
  } else if (slug.length > 0) {
    checks.push({
      name: 'URL Slug',
      status: 'pass',
      message: 'URL slug is clean and concise',
      importance: 'medium',
    });
  }

  // Open Graph checks
  if (!ogTitle && !ogDescription) {
    checks.push({
      name: 'Open Graph Tags',
      status: 'warning',
      message: 'Add Open Graph tags for better social sharing',
      importance: 'medium',
    });
  } else if (ogTitle && ogDescription) {
    checks.push({
      name: 'Open Graph Tags',
      status: 'pass',
      message: 'Open Graph tags are configured',
      importance: 'medium',
    });
  }

  // Twitter Card checks
  if (!twitterTitle && !twitterDescription) {
    checks.push({
      name: 'Twitter Card',
      status: 'warning',
      message: 'Add Twitter Card tags for better sharing on Twitter',
      importance: 'medium',
    });
  } else if (twitterTitle && twitterDescription) {
    checks.push({
      name: 'Twitter Card',
      status: 'pass',
      message: 'Twitter Card tags are configured',
      importance: 'medium',
    });
  }

  // Calculate overall score
  const totalChecks = checks.length;
  const passedChecks = checks.filter(c => c.status === 'pass').length;
  const warningChecks = checks.filter(c => c.status === 'warning').length;
  const failedChecks = checks.filter(c => c.status === 'fail').length;
  
  // Weighted scoring
  const criticalPassed = checks.filter(c => c.importance === 'critical' && c.status === 'pass').length;
  const criticalTotal = checks.filter(c => c.importance === 'critical').length;
  
  const score = Math.round((passedChecks / totalChecks) * 100);
  const criticalScore = criticalTotal > 0 ? Math.round((criticalPassed / criticalTotal) * 100) : 100;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🎉';
    if (score >= 80) return '🟢';
    if (score >= 60) return '🟡';
    return '🔴';
  };

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">SEO Score</h3>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}/100 {getScoreEmoji(score)}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-green-600 font-bold text-lg">{passedChecks}</div>
            <div className="text-gray-600">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-600 font-bold text-lg">{warningChecks}</div>
            <div className="text-gray-600">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-red-600 font-bold text-lg">{failedChecks}</div>
            <div className="text-gray-600">Failed</div>
          </div>
        </div>

        {criticalScore < 100 && (
          <div className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2">
            ⚠️ Critical SEO issues need attention!
          </div>
        )}
      </div>

      {/* SEO Checks List */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Detailed Analysis</h4>
        
        {checks.map((check, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
              check.status === 'pass'
                ? 'bg-green-50 border border-green-200'
                : check.status === 'warning'
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {check.status === 'pass' && (
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            {check.status === 'warning' && (
              <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            )}
            {check.status === 'fail' && (
              <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{check.name}</span>
                {check.importance === 'critical' && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Critical
                  </span>
                )}
              </div>
              <p className="text-gray-700 mt-1">{check.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 border rounded-lg p-4 space-y-2 text-xs">
        <h4 className="font-semibold text-gray-900 mb-2">Content Statistics</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Word Count:</span>
            <span className="font-medium">{wordCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Headings:</span>
            <span className="font-medium">{totalHeadings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Internal Links:</span>
            <span className="font-medium">{internalLinks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">External Links:</span>
            <span className="font-medium">{externalLinks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Images:</span>
            <span className="font-medium">{images.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">With Alt Text:</span>
            <span className="font-medium">{imagesWithAlt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
