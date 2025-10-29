'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NewsletterBlockData {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  backgroundColor: string;
  textColor: string;
}

interface NewsletterBlockEditorProps {
  data: NewsletterBlockData;
  onChange: (data: NewsletterBlockData) => void;
}

export default function NewsletterBlockEditor({ data, onChange }: NewsletterBlockEditorProps) {
  const updateField = (field: keyof NewsletterBlockData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Stay Updated"
        />
      </div>

      <div>
        <Label>Subtitle</Label>
        <Textarea
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Subscribe to get special offers"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Input Placeholder</Label>
          <Input
            value={data.placeholder}
            onChange={(e) => updateField('placeholder', e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label>Button Text</Label>
          <Input
            value={data.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            placeholder="Subscribe"
          />
        </div>
      </div>

      <div>
        <Label>Success Message</Label>
        <Input
          value={data.successMessage}
          onChange={(e) => updateField('successMessage', e.target.value)}
          placeholder="Thanks for subscribing!"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={data.backgroundColor}
              onChange={(e) => updateField('backgroundColor', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={data.backgroundColor}
              onChange={(e) => updateField('backgroundColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label>Text Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={data.textColor}
              onChange={(e) => updateField('textColor', e.target.value)}
              className="w-20 h-10"
            />
            <Input
              value={data.textColor}
              onChange={(e) => updateField('textColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
