'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroBlockData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  imageId: string | null;
  imageUrl: string | null;
  alignment: 'left' | 'center' | 'right';
  height: 'small' | 'medium' | 'large' | 'full';
  overlay: boolean;
  overlayOpacity: number;
}

interface HeroBlockEditorProps {
  data: HeroBlockData;
  onChange: (data: HeroBlockData) => void;
}

export default function HeroBlockEditor({ data, onChange }: HeroBlockEditorProps) {
  const updateField = (field: keyof HeroBlockData, value: string | number | boolean | null) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Title (H1)</Label>
        <Input
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Welcome to Our Store"
        />
      </div>

      <div>
        <Label>Subtitle</Label>
        <Input
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Discover amazing products"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Button Text</Label>
          <Input
            value={data.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            placeholder="Shop Now"
          />
        </div>
        <div>
          <Label>Button URL</Label>
          <Input
            value={data.buttonUrl}
            onChange={(e) => updateField('buttonUrl', e.target.value)}
            placeholder="/products"
          />
        </div>
      </div>

      <div>
        <Label>Image URL (optional)</Label>
        <Input
          value={data.imageUrl || ''}
          onChange={(e) => updateField('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Alignment</Label>
          <select
            value={data.alignment}
            onChange={(e) => updateField('alignment', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <Label>Height</Label>
          <select
            value={data.height}
            onChange={(e) => updateField('height', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full Screen</option>
          </select>
        </div>

        <div>
          <Label>Overlay Opacity</Label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={data.overlayOpacity}
            onChange={(e) => updateField('overlayOpacity', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="overlay"
          checked={data.overlay}
          onChange={(e) => updateField('overlay', e.target.checked)}
          className="w-4 h-4"
        />
        <Label htmlFor="overlay">Enable dark overlay on image</Label>
      </div>
    </div>
  );
}
