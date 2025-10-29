'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { BlockInstance, BLOCK_TYPES, createBlockInstance, getAllBlockTypes, getBlockCategories } from '@/lib/blocks/block-types';
import HeroBlockEditor from './editors/HeroBlockEditor';
import ContentBlockEditor from './editors/ContentBlockEditor';
import ProductsGridBlockEditor from './editors/ProductsGridBlockEditor';
import NewsletterBlockEditor from './editors/NewsletterBlockEditor';
import MediaHeroBlockEditor from './editors/MediaHeroBlockEditor';

interface BlockManagerProps {
  blocks: BlockInstance[];
  onChange: (blocks: BlockInstance[]) => void;
}

export default function BlockManager({ blocks, onChange }: BlockManagerProps) {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addBlock = (type: string) => {
    const newBlock = createBlockInstance(type, blocks.length);
    onChange([...blocks, newBlock]);
    setExpandedBlock(newBlock.id);
    setShowAddMenu(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBlock = (id: string, data: any) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, data } : block
      )
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter((block) => block.id !== id));
  };

  const toggleBlockEnabled = (id: string) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, enabled: !block.enabled } : block
      )
    );
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      // Update order
      newBlocks.forEach((block, i) => {
        block.order = i;
      });
      onChange(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      // Update order
      newBlocks.forEach((block, i) => {
        block.order = i;
      });
      onChange(newBlocks);
    }
  };

  const renderBlockEditor = (block: BlockInstance) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockData = block.data as any;
    
    switch (block.type) {
      case 'hero':
        return <HeroBlockEditor data={blockData} onChange={(data) => updateBlock(block.id, data)} />;
      case 'media_hero':
        return <MediaHeroBlockEditor data={blockData} onChange={(data) => updateBlock(block.id, data)} />;
      case 'content':
        return <ContentBlockEditor data={blockData} onChange={(data) => updateBlock(block.id, data)} />;
      case 'products_grid':
        return <ProductsGridBlockEditor data={blockData} onChange={(data) => updateBlock(block.id, data)} />;
      case 'newsletter':
        return <NewsletterBlockEditor data={blockData} onChange={(data) => updateBlock(block.id, data)} />;
      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
            Editor for &quot;{block.type}&quot; block coming soon...
          </div>
        );
    }
  };

  const categories = getBlockCategories();

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-2">📦 Content Blocks</h3>
        <p className="text-sm text-blue-700">
          Build your page by adding and arranging blocks. Click a block to edit it.
        </p>
      </div>

      {/* Blocks List */}
      {blocks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-600 mb-4">No blocks yet. Add your first block to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map((block, index) => {
            const blockType = BLOCK_TYPES[block.type];
            const isExpanded = expandedBlock === block.id;

            return (
              <Card
                key={block.id}
                className={`transition-all ${
                  block.enabled ? 'border-2 border-blue-200' : 'border-2 border-gray-200 opacity-60'
                }`}
              >
                {/* Block Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                      <span className="text-2xl">{blockType?.icon}</span>
                      <div>
                        <h4 className="font-semibold">{blockType?.name}</h4>
                        <p className="text-xs text-gray-500">{blockType?.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Move Up/Down */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(block.id, 'up');
                        }}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(block.id, 'down');
                        }}
                        disabled={index === blocks.length - 1}
                      >
                        ↓
                      </Button>

                      {/* Enable/Disable */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBlockEnabled(block.id);
                        }}
                        title={block.enabled ? 'Disable' : 'Enable'}
                      >
                        {block.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>

                      {/* Delete */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this block?')) {
                            deleteBlock(block.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>

                      {/* Expand/Collapse */}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Block Editor (Expanded) */}
                {isExpanded && (
                  <div className="border-t p-4 bg-gray-50">
                    {renderBlockEditor(block)}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Block Button */}
      <div className="relative">
        <Button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>

        {/* Add Block Menu */}
        {showAddMenu && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto z-10">
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryBlocks = getAllBlockTypes().filter(
                  (b) => b.category === category.id
                );

                return (
                  <div key={category.id}>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      {category.icon} {category.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryBlocks.map((blockType) => (
                        <button
                          key={blockType.id}
                          onClick={() => addBlock(blockType.id)}
                          className="flex items-center gap-2 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
                        >
                          <span className="text-xl">{blockType.icon}</span>
                          <div>
                            <div className="font-medium text-sm">{blockType.name}</div>
                            <div className="text-xs text-gray-500">{blockType.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
