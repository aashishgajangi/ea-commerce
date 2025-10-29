'use client';

import { ReactNode } from 'react';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';

interface PageEditorLayoutProps {
  // Header props
  pageTitle: string;
  isNew?: boolean;
  status: 'draft' | 'published';
  saving?: boolean;
  autoSaving?: boolean;
  lastSaved?: Date | null;
  
  // Header actions
  onPreview: () => void;
  onToggleSEO: () => void;
  onSave: () => void;
  onSaveDraft?: () => void;
  
  // Footer props
  onStatusChange: (status: 'draft' | 'published') => void;
  characterCount?: number;
  wordCount?: number;
  
  // Layout
  showSEO?: boolean;
  children: ReactNode;
  seoSidebar?: ReactNode;
}

export default function PageEditorLayout({
  // Header
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
  
  // Footer
  onStatusChange,
  characterCount = 0,
  wordCount = 0,
  
  // Layout
  showSEO = false,
  children,
  seoSidebar,
}: PageEditorLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <EditorHeader
        pageTitle={pageTitle}
        isNew={isNew}
        status={status}
        saving={saving}
        autoSaving={autoSaving}
        lastSaved={lastSaved}
        onPreview={onPreview}
        onToggleSEO={onToggleSEO}
        onSave={onSave}
        onSaveDraft={onSaveDraft}
        showSEO={showSEO}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content Section (100% or 70% if SEO open) */}
        <div
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            showSEO ? 'w-[70%]' : 'w-full'
          }`}
        >
          <div className="max-w-5xl mx-auto p-6">
            {children}
          </div>
        </div>

        {/* SEO Sidebar (30%, slides in from right) */}
        {showSEO && seoSidebar && (
          <div className="w-[30%] border-l bg-white overflow-y-auto animate-slide-in-right">
            {seoSidebar}
          </div>
        )}
      </div>

      {/* Footer */}
      <EditorFooter
        status={status}
        onStatusChange={onStatusChange}
        characterCount={characterCount}
        wordCount={wordCount}
        onSave={onSave}
        onSaveDraft={onSaveDraft}
        saving={saving}
      />

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
