'use client';

import EnhancedLexicalEditor from '@/components/editor/EnhancedLexicalEditor';

interface ContentBlockData {
  html: string;
}

interface ContentBlockEditorProps {
  data: ContentBlockData;
  onChange: (data: ContentBlockData) => void;
}

export default function ContentBlockEditor({ data, onChange }: ContentBlockEditorProps) {
  return (
    <div>
      <EnhancedLexicalEditor
        content={data.html}
        onChange={(html) => onChange({ ...data, html })}
        placeholder="Start writing your content..."
      />
    </div>
  );
}
