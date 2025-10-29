'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Settings, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface EditorHeaderProps {
  // Page info
  pageTitle: string;
  isNew?: boolean;
  
  // Status
  status: 'draft' | 'published';
  saving?: boolean;
  autoSaving?: boolean;
  lastSaved?: Date | null;
  
  // Actions
  onPreview: () => void;
  onToggleSEO: () => void;
  onSave: () => void;
  onSaveDraft?: () => void;
  
  // State
  showSEO?: boolean;
}

export default function EditorHeader({
  pageTitle,
  isNew = false,
  status,
  saving = false,
  autoSaving = false,
  lastSaved = null,
  onPreview,
  onToggleSEO,
  onSave,
  onSaveDraft,
  showSEO = false,
}: EditorHeaderProps) {
  const formatLastSaved = (date: Date | null) => {
    if (!date) return null;
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Back button + Title */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link href="/admin/pages">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Pages</span>
            </Button>
          </Link>
          
          <div className="border-l h-6" />
          
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {isNew ? 'Create New Page' : `Edit: ${pageTitle || 'Untitled'}`}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                status === 'published' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {status === 'published' ? '✓ Published' : '○ Draft'}
              </span>
              
              {autoSaving && (
                <span className="flex items-center gap-1 text-blue-600">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving...
                </span>
              )}
              
              {!autoSaving && lastSaved && (
                <span className="text-gray-400">
                  Saved {formatLastSaved(lastSaved)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Preview Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden md:inline">Preview</span>
          </Button>

          {/* SEO Button */}
          <Button
            variant={showSEO ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleSEO}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">SEO</span>
          </Button>

          {/* Save Draft (if not published) */}
          {status === 'draft' && onSaveDraft && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveDraft}
              disabled={saving}
              className="hidden lg:flex gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Draft
                </>
              )}
            </Button>
          )}

          {/* Primary Save/Publish Button */}
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
    </header>
  );
}
