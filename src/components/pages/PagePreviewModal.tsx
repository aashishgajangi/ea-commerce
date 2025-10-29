'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { BlockInstance } from '@/lib/blocks/block-types';

interface PagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  blocks: BlockInstance[];
}

export default function PagePreviewModal({
  isOpen,
  onClose,
  title,
  blocks,
}: PagePreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-4 my-4 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Preview</h2>
            <p className="text-sm text-gray-600">{title || 'Untitled Page'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="min-h-full">
            {blocks.length > 0 ? (
              <div
                style={{
                  backgroundColor: 'var(--theme-background, #ffffff)',
                  color: 'var(--theme-text, #1a1a1a)',
                }}
              >
                <BlockRenderer blocks={blocks} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Content Yet
                  </h3>
                  <p className="text-gray-500">
                    Add some blocks to see the preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
