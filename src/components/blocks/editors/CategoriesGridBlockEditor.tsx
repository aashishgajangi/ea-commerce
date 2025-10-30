'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoriesGridBlockData {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  showCount?: boolean;
  style?: 'card' | 'minimal' | 'overlay';
  columns?: number;
  shape?: 'square' | 'circle';
}

interface CategoriesGridBlockEditorProps {
  data: CategoriesGridBlockData;
  onChange: (data: CategoriesGridBlockData) => void;
}

export default function CategoriesGridBlockEditor({ data, onChange }: CategoriesGridBlockEditorProps) {
  const updateField = <K extends keyof CategoriesGridBlockData>(
    field: K,
    value: CategoriesGridBlockData[K]
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={data.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Layout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="columns">Columns</Label>
            <select
              id="columns"
              value={data.columns || 3}
              onChange={(e) => updateField('columns', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
              <option value={5}>5 Columns</option>
              <option value={6}>6 Columns</option>
            </select>
          </div>

          <div>
            <Label htmlFor="style">Style</Label>
            <select
              id="style"
              value={data.style || 'card'}
              onChange={(e) => updateField('style', e.target.value as 'card' | 'minimal' | 'overlay')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="card">Card Style</option>
              <option value="minimal">Minimal Style</option>
              <option value="overlay">Overlay Style</option>
            </select>
          </div>

          <div>
            <Label htmlFor="shape">Shape</Label>
            <select
              id="shape"
              value={data.shape || 'square'}
              onChange={(e) => updateField('shape', e.target.value as 'square' | 'circle')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showCount"
              checked={data.showCount !== false}
              onChange={(e) => updateField('showCount', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="showCount">Show product count</Label>
          </div>
        </CardContent>
      </Card>

      {/* Styling */}
      <Card>
        <CardHeader>
          <CardTitle>Styling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={data.backgroundColor || '#f9fafb'}
              onChange={(e) => updateField('backgroundColor', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              type="color"
              value={data.textColor || '#1a1a1a'}
              onChange={(e) => updateField('textColor', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}