'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertCircle, TrendingUp, Search, Eye } from 'lucide-react';
import Link from 'next/link';

interface PageSEO {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  pageType: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  content: string;
  score: number;
  issues: string[];
}

export default function SEODashboard() {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    loadPages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPages() {
    try {
      const response = await fetch('/api/admin/pages?status=all&limit=100');
      if (response.ok) {
        const data = await response.json();
        const pagesWithScores = data.pages.map((page: PageSEO) => ({
          ...page,
          score: calculateSEOScore(page),
          issues: getSEOIssues(page),
        }));
        setPages(pagesWithScores);
        
        // Calculate overall score
        const avgScore = pagesWithScores.length > 0
          ? Math.round(pagesWithScores.reduce((sum: number, p: PageSEO) => sum + p.score, 0) / pagesWithScores.length)
          : 0;
        setOverallScore(avgScore);
      }
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  }

  function calculateSEOScore(page: PageSEO): number {
    let score = 100;

    // Title checks
    if (!page.title || page.title.length < 30) score -= 15;
    else if (page.title.length > 60) score -= 5;

    // Meta description checks
    if (!page.metaDescription || page.metaDescription.length < 120) score -= 15;
    else if (page.metaDescription.length > 160) score -= 5;

    // Content checks
    const wordCount = page.content ? page.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    if (wordCount < 300) score -= 15;

    // OG tags
    if (!page.ogTitle && !page.ogDescription) score -= 10;

    // Twitter tags
    if (!page.twitterTitle && !page.twitterDescription) score -= 10;

    // Keywords
    if (!page.metaKeywords) score -= 5;

    return Math.max(0, score);
  }

  function getSEOIssues(page: PageSEO): string[] {
    const issues: string[] = [];

    if (!page.title) issues.push('Missing title');
    else if (page.title.length < 30) issues.push('Title too short');
    else if (page.title.length > 60) issues.push('Title too long');

    if (!page.metaDescription) issues.push('Missing meta description');
    else if (page.metaDescription.length < 120) issues.push('Meta description too short');
    else if (page.metaDescription.length > 160) issues.push('Meta description too long');

    const wordCount = page.content ? page.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    if (wordCount < 300) issues.push(`Content too short (${wordCount} words)`);

    if (!page.ogTitle && !page.ogDescription) issues.push('Missing Open Graph tags');
    if (!page.twitterTitle && !page.twitterDescription) issues.push('Missing Twitter Card tags');
    if (!page.metaKeywords) issues.push('No meta keywords');

    return issues;
  }

  function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const publishedPages = pages.filter(p => p.status === 'published');
  const avgPublishedScore = publishedPages.length > 0
    ? Math.round(publishedPages.reduce((sum, p) => sum + p.score, 0) / publishedPages.length)
    : 0;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">SEO Dashboard</h1>
        <p className="text-gray-600">
          Monitor and optimize SEO across all pages. See how your content will appear in Google search results.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Overall SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
              <TrendingUp className={`h-8 w-8 ${getScoreColor(overallScore)}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Published Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{publishedPages.length}</div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Avg Score: {avgPublishedScore}/100
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{pages.length}</div>
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Including drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Needs Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-red-600">
                {pages.filter(p => p.score < 70).length}
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Score below 70
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">🎯 Quick SEO Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/pages/cmh0wjl090000wsvxrt93nret">
              <Button className="w-full" variant="outline">
                🏠 Optimize Homepage
              </Button>
            </Link>
            <Link href="/admin/seo/guide">
              <Button className="w-full" variant="outline">
                📖 100% Score Guide
              </Button>
            </Link>
            <Button className="w-full" variant="outline" onClick={loadPages}>
              🔄 Refresh Scores
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages SEO Status</CardTitle>
          <CardDescription>
            Click any page to edit and improve its SEO score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pages.map((page) => (
              <div
                key={page.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{page.title || 'Untitled'}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        page.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {page.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {page.pageType}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      /{page.slug || ''}
                    </p>

                    {page.issues.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {page.issues.map((issue, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(page.score)}`}>
                        {page.score}
                      </div>
                      <div className="text-xs text-gray-500">SEO Score</div>
                    </div>

                    <Link href={`/admin/pages/${page.id}`}>
                      <Button size="sm">
                        Edit
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {pages.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No pages found. Create your first page to get started!</p>
                <Link href="/admin/pages/new">
                  <Button className="mt-4">Create Page</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
