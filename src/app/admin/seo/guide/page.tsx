'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SEOGuide() {
  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/seo">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">🎯 100% SEO Score Guide</h1>
        <p className="text-gray-600">
          Follow this step-by-step guide to achieve a perfect 100/100 SEO score for any page.
        </p>
      </div>

      {/* Quick Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">✨ What You Need for 100/100</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-900 mb-2">Required Fields:</p>
              <ul className="space-y-1 text-green-800">
                <li>✅ Page Title (50-60 chars)</li>
                <li>✅ Meta Description (150-160 chars)</li>
                <li>✅ Content (300+ words)</li>
                <li>✅ Meta Keywords (5-10 keywords)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-900 mb-2">Social Media:</p>
              <ul className="space-y-1 text-green-800">
                <li>✅ Open Graph Title</li>
                <li>✅ Open Graph Description</li>
                <li>✅ Twitter Title</li>
                <li>✅ Twitter Description</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step by Step Guide */}
      <div className="space-y-6">
        {/* Step 1 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <CardTitle>Page Title (50-60 characters)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">Content Tab → Title field</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Formula:</p>
              <code className="bg-gray-100 p-2 rounded block text-sm">
                [Main Keyword] - [Secondary Keyword] | [Brand Name]
              </code>
            </div>

            <div>
              <p className="font-semibold mb-2">Examples:</p>
              <div className="space-y-2">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-800 mb-1">❌ Bad (too short):</p>
                  <p className="text-sm font-mono">&quot;Welcome&quot; (7 chars)</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800 mb-1">✅ Perfect:</p>
                  <p className="text-sm font-mono">&quot;Organic Products & Natural Foods | Nisarga Lahari&quot; (51 chars)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Include your main keyword at the beginning and your brand name at the end.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                2
              </div>
              <CardTitle>Meta Description (150-160 characters)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">SEO Tab → Meta Description</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Formula:</p>
              <code className="bg-gray-100 p-2 rounded block text-sm">
                [Action Word] + [What You Offer] + [Benefits] + [Call to Action]
              </code>
            </div>

            <div>
              <p className="font-semibold mb-2">Examples:</p>
              <div className="space-y-2">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-800 mb-1">❌ Bad (too short):</p>
                  <p className="text-sm font-mono">&quot;Buy organic products online.&quot; (28 chars)</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800 mb-1">✅ Perfect:</p>
                  <p className="text-sm font-mono">&quot;Shop organic products at Nisarga Lahari. Natural foods, supplements & eco-friendly items. Fast shipping across India. Quality guaranteed. Order today!&quot; (154 chars)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Use action words (Shop, Discover, Browse) and include your unique selling points.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                3
              </div>
              <CardTitle>Content (300+ words)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">Content Tab → Page Content (Rich Text Editor)</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Structure:</p>
              <div className="bg-gray-50 p-3 rounded space-y-2 text-sm">
                <p><strong>H2:</strong> Introduction (50-100 words)</p>
                <p><strong>H2:</strong> Main Section 1 (100-150 words)</p>
                <p className="ml-4"><strong>H3:</strong> Subsection 1</p>
                <p className="ml-4"><strong>H3:</strong> Subsection 2</p>
                <p><strong>H2:</strong> Main Section 2 (100-150 words)</p>
                <p><strong>H2:</strong> Conclusion (50 words)</p>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Use the heading buttons in the editor toolbar. Include 2-3 internal links to other pages.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                4
              </div>
              <CardTitle>Meta Keywords (5-10 keywords)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">SEO Tab → Meta Keywords</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Format:</p>
              <code className="bg-gray-100 p-2 rounded block text-sm">
                keyword1, keyword2, keyword3, keyword4, keyword5
              </code>
            </div>

            <div>
              <p className="font-semibold mb-2">Example:</p>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm font-mono">
                  organic products, natural foods, organic supplements, eco-friendly products, organic store india
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                5
              </div>
              <CardTitle>Open Graph Tags (Facebook)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">SEO Tab → Open Graph (Facebook)</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">OG Title:</p>
                <p className="text-sm text-gray-600">Use same as Page Title, or make it more social-friendly</p>
                <code className="bg-gray-100 p-2 rounded block text-sm mt-1">
                  Nisarga Lahari - Premium Organic Products in India
                </code>
              </div>

              <div>
                <p className="font-semibold text-sm">OG Description:</p>
                <p className="text-sm text-gray-600">Use same as Meta Description</p>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> You can copy-paste from Page Title and Meta Description fields!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 6 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                6
              </div>
              <CardTitle>Twitter Card Tags</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">SEO Tab → Twitter Card</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-sm">Twitter Title:</p>
                <p className="text-sm text-gray-600">Same as OG Title</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Twitter Description:</p>
                <p className="text-sm text-gray-600">Same as OG Description (can add hashtags)</p>
                <code className="bg-gray-100 p-2 rounded block text-sm mt-1">
                  Shop organic products... #Organic #Natural #HealthyLiving
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Homepage Specific */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                🏠
              </div>
              <CardTitle className="text-green-900">Homepage Special: SEO Sections</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Location:</p>
              <p className="text-sm text-gray-600">Homepage Sections (after Page Content)</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm mb-1">Hero Title (H1):</p>
                <p className="text-sm text-gray-600">40-60 characters, include main keyword</p>
                <code className="bg-gray-50 p-2 rounded block text-sm mt-1">
                  Welcome to Nisarga - Premium Organic Products
                </code>
              </div>

              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm mb-1">Section Titles (H2):</p>
                <p className="text-sm text-gray-600">Use descriptive keywords</p>
                <div className="space-y-1 mt-1 text-sm">
                  <p>✅ &quot;Our Best-Selling Organic Products&quot;</p>
                  <p>✅ &quot;Browse by Product Category&quot;</p>
                  <p>✅ &quot;Get Exclusive Organic Product Updates&quot;</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm mb-1">Enable 2-3 sections minimum:</p>
                <p className="text-sm text-gray-600">Each adds an H2, improving SEO score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">✅ Final Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                'Page Title: 50-60 characters with keywords',
                'Meta Description: 150-160 characters with benefits',
                'Content: 300+ words with H2/H3 headings',
                'Meta Keywords: 5-10 relevant keywords',
                'OG Title & Description: Filled (can copy from above)',
                'Twitter Title & Description: Filled (can copy from OG)',
                'Internal Links: 2-5 links to other pages',
                'Homepage: Enable 2-3 sections with good titles',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-purple-900">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Optimize?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link href="/admin/pages">
                <Button>
                  Go to Pages
                </Button>
              </Link>
              <Link href="/admin/seo">
                <Button variant="outline">
                  View SEO Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
