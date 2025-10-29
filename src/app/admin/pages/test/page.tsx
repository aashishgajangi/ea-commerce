'use client';

import { useState } from 'react';
import PageEditorLayout from '@/components/pages/editor/PageEditorLayout';
import BlockManager from '@/components/blocks/BlockManager';
import { BlockInstance } from '@/lib/blocks/block-types';
import SEOSidebar from '@/components/seo/SEOSidebar';
import { SEOData } from '@/lib/seo/types';

export default function TestPageEditor() {
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [title, setTitle] = useState('Test Page');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [showSEO, setShowSEO] = useState(false);
  const [, setShowPreview] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>({});

  const handleSave = () => {
    setSaving(true);
    console.log('Saving page:', { title, status, blocks, seoData });
    setTimeout(() => {
      setSaving(false);
      alert('Page saved! (This is a test page)');
    }, 1000);
  };

  const handlePreview = () => {
    setShowPreview(true);
    console.log('Preview:', { title, blocks });
    alert('Preview modal would open here');
  };

  // Calculate stats
  const characterCount = blocks.reduce((acc, block) => {
    if (block.type === 'content') {
      const html = (block.data as { html?: string }).html;
      return acc + (html?.length || 0);
    }
    return acc;
  }, 0);

  const wordCount = blocks.reduce((acc, block) => {
    if (block.type === 'content') {
      const html = (block.data as { html?: string }).html;
      const text = html?.replace(/<[^>]*>/g, ' ') || '';
      return acc + text.split(/\s+/).filter(Boolean).length;
    }
    return acc;
  }, 0);

  return (
    <PageEditorLayout
      pageTitle={title}
      isNew={true}
      status={status}
      saving={saving}
      onPreview={handlePreview}
      onToggleSEO={() => setShowSEO(!showSEO)}
      onSave={handleSave}
      onStatusChange={setStatus}
      characterCount={characterCount}
      wordCount={wordCount}
      showSEO={showSEO}
      seoSidebar={
        showSEO ? (
          <SEOSidebar
            data={seoData}
            onChange={setSeoData}
            pageTitle={title}
            pageContent={blocks.map(b => b.data.html || '').join(' ')}
            pageUrl={`/pages/test`}
          />
        ) : undefined
      }
    >
      {/* Page Basics */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Page Basics</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter page title"
            />
          </div>
        </div>
      </div>

      {/* Block Manager */}
      <div className="bg-white rounded-lg border p-6">
        <BlockManager blocks={blocks} onChange={setBlocks} />
      </div>

      {/* Debug Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-bold mb-2">Debug Info</h3>
        <div className="text-sm space-y-1">
          <p>Total Blocks: {blocks.length}</p>
          <p>Enabled Blocks: {blocks.filter(b => b.enabled).length}</p>
          <p>Word Count: {wordCount}</p>
          <p>Character Count: {characterCount}</p>
        </div>
      </div>
    </PageEditorLayout>
  );
}
