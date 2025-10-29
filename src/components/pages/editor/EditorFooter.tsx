'use client';

import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface EditorFooterProps {
  // Status
  status: 'draft' | 'published';
  onStatusChange: (status: 'draft' | 'published') => void;
  
  // Stats
  characterCount?: number;
  wordCount?: number;
  
  // Actions
  onSave: () => void;
  onSaveDraft?: () => void;
  saving?: boolean;
}

export default function EditorFooter({
  status,
  onStatusChange,
  characterCount = 0,
  wordCount = 0,
  onSave,
  onSaveDraft,
  saving = false,
}: EditorFooterProps) {
  return (
    <footer className="sticky bottom-0 z-40 border-t bg-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Status Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => onStatusChange(e.target.value as 'draft' | 'published')}
              className="px-3 py-1.5 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                borderColor: status === 'published' ? 'var(--theme-primary, #0070f3)' : '#d1d5db',
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Center: Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Words:</span>
            <span className="tabular-nums">{wordCount.toLocaleString()}</span>
          </div>
          <div className="border-l h-4" />
          <div className="flex items-center gap-2">
            <span className="font-medium">Characters:</span>
            <span className="tabular-nums">{characterCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Right: Save Buttons */}
        <div className="flex items-center gap-2">
          {/* Save Draft (if draft) */}
          {status === 'draft' && onSaveDraft && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveDraft}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Save Draft</span>
                </>
              )}
            </Button>
          )}

          {/* Primary Save/Publish */}
          <Button
            size="sm"
            onClick={onSave}
            disabled={saving}
            className="gap-2"
            style={{
              backgroundColor: 'var(--theme-primary, #0070f3)',
              color: 'white',
            }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {status === 'published' ? 'Update' : 'Publish'}
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </footer>
  );
}
