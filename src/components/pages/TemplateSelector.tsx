'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getAllTemplates, type PageTemplate } from '@/lib/page-templates';
import { FileText, CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (template: PageTemplate | null) => void;
  onClose?: () => void;
}

export default function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null);
  const templates = getAllTemplates();

  const handleSelectTemplate = (template: PageTemplate) => {
    setSelectedTemplate(template);
  };

  const handleConfirm = () => {
    onSelectTemplate(selectedTemplate);
  };

  const handleBlankPage = () => {
    onSelectTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-gray-600">
          Start with a professional, SEO-optimized template or create a blank page
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-blue-600 shadow-lg'
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="p-6 space-y-3">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 text-4xl">
                {template.icon}
              </div>

              {/* Name */}
              <h3 className="text-center font-semibold text-lg">
                {template.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center line-clamp-2">
                {template.description}
              </p>

              {/* Essential Badge */}
              {template.isEssential && (
                <div className="flex justify-center">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Essential for SEO
                  </span>
                </div>
              )}

              {/* Selected Indicator */}
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Blank Page Option */}
      <div className="border-t pt-6">
        <Card
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedTemplate === null && selectedTemplate !== undefined
              ? 'ring-2 ring-blue-600 shadow-lg'
              : 'hover:ring-1 hover:ring-gray-300'
          }`}
          onClick={handleBlankPage}
        >
          <div className="p-6 flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Blank Page</h3>
              <p className="text-sm text-gray-600">
                Start from scratch with a completely empty page. You&apos;ll need to add all content and SEO settings manually.
              </p>
            </div>
            {selectedTemplate === null && selectedTemplate !== undefined && (
              <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
            )}
          </div>
        </Card>
      </div>

      {/* Template Preview (if selected) */}
      {selectedTemplate && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h4 className="font-semibold mb-3">Template Preview: {selectedTemplate.name}</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Page Type:</span> {selectedTemplate.pageType}
            </div>
            <div>
              <span className="font-medium">Slug:</span> /{selectedTemplate.slug || '(homepage)'}
            </div>
            <div>
              <span className="font-medium">Meta Title:</span> {selectedTemplate.metaTitle}
            </div>
            <div>
              <span className="font-medium">Word Count:</span> ~{selectedTemplate.content.split(' ').length} words
            </div>
            {selectedTemplate.structuredData && (
              <div>
                <span className="font-medium">Structured Data:</span> ✓ Included
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          disabled={selectedTemplate === undefined}
          size="lg"
        >
          {selectedTemplate ? `Use ${selectedTemplate.name} Template` : 'Create Blank Page'}
        </Button>
      </div>

      {/* SEO Benefits Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
        <p className="font-semibold text-green-900 mb-2">💡 SEO Benefits of Using Templates:</p>
        <ul className="text-green-800 space-y-1 ml-5 list-disc">
          <li>Pre-optimized meta tags and descriptions</li>
          <li>Proper heading structure (H1, H2, H3)</li>
          <li>Structured data for rich snippets</li>
          <li>Internal linking suggestions</li>
          <li>E-A-T (Expertise, Authority, Trust) focused content</li>
          <li>Mobile-responsive and fast-loading</li>
        </ul>
      </div>
    </div>
  );
}
