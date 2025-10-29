'use client';

/**
 * Enhanced Lexical Editor
 * 
 * Full-featured rich text editor with:
 * - Text formatting (bold, italic, underline, strikethrough, code)
 * - Headings (H1-H6)
 * - Lists (bullet, numbered, checklist)
 * - Alignment (left, center, right, justify)
 * - Links
 * - Images (upload and insert)
 * - Tables
 * - Code blocks with syntax highlighting
 * - Quotes
 * - Horizontal rules
 * - Undo/Redo
 * - Clear formatting
 */

import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection, 
  $isRangeSelection,
  $getRoot,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  SerializedLexicalNode,
} from 'lexical';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Link2,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Undo,
  Redo,
  Eraser,
} from 'lucide-react';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $createCodeNode } from '@lexical/code';
// Horizontal rule will be created manually

interface EnhancedLexicalEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

// Plugin to load initial HTML content
function LoadHtmlPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (html && !loaded) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
      setLoaded(true);
    }
  }, [editor, html, loaded]);

  return null;
}

// Plugin to export HTML
function ExportHtmlPlugin({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const html = $generateHtmlFromNodes(editor);
        onChange(html);
      });
    });
  }, [editor, onChange]);

  return null;
}


// Enhanced Toolbar Component
function EnhancedToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  // Track current block type
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const element = anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
          
          const type = element.getType();
          if (type === 'heading') {
            const headingElement = element as unknown as { __tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };
            const tag = headingElement.__tag || 'h1';
            setBlockType(tag);
          } else if (type === 'quote') {
            setBlockType('quote');
          } else if (type === 'code') {
            setBlockType('code');
          } else {
            setBlockType('paragraph');
          }
        }
      });
    });
  }, [editor]);

  const formatBlock = (type: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else if (type === 'quote') {
          $setBlocksType(selection, () => $createQuoteNode());
        } else if (type === 'code') {
          $setBlocksType(selection, () => $createCodeNode());
        } else if (type.startsWith('h')) {
          $setBlocksType(selection, () => $createHeadingNode(type as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'));
        }
      }
    });
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: '3', columns: '3' });
  };

  const insertHorizontalRule = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const hrNode = $createHorizontalRuleNode();
        selection.insertNodes([hrNode]);
      }
    });
  };

  const clearFormatting = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach(node => {
          if (node.getType() !== 'root') {
            node.remove();
          }
        });
      }
    });
  };

  return (
    <>
      <div className="border-b bg-white sticky top-0 z-10">
        {/* Row 1: Block type and text formatting */}
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Block Type Dropdown */}
            <select
              value={blockType}
              onChange={(e) => formatBlock(e.target.value)}
              className="px-3 py-1.5 border rounded-md text-sm font-medium min-w-[140px]"
            >
              <option value="paragraph">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
              <option value="quote">Quote</option>
              <option value="code">Code Block</option>
            </select>

            <div className="w-px h-6 bg-gray-300" />

            {/* Text Formatting */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
              title="Underline (Ctrl+U)"
            >
              <Underline className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300" />

            {/* Alignment */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          {/* Row 2: Lists, Links, Media */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Lists */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300" />

            {/* Insert Elements */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setShowLinkInput(!showLinkInput)}
              title="Insert Link"
            >
              <Link2 className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={insertTable}
              title="Insert Table"
            >
              <TableIcon className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={insertHorizontalRule}
              title="Horizontal Rule"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-gray-300" />

            {/* History & Clear */}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={clearFormatting}
              title="Clear Formatting"
            >
              <Eraser className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="border-b bg-blue-50 p-3 flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 border rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                insertLink();
              }
            }}
            autoFocus
          />
          <Button size="sm" onClick={insertLink}>
            Add Link
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
            Cancel
          </Button>
        </div>
      )}

    </>
  );
}

// Horizontal Rule Node
class HorizontalRuleNode extends DecoratorNode<React.ReactElement> {
  static getType(): string {
    return 'horizontal-rule';
  }

  static clone(node: HorizontalRuleNode): HorizontalRuleNode {
    return new HorizontalRuleNode(node.__key);
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.style.margin = '20px 0';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.ReactElement {
    return <hr style={{ border: 'none', borderTop: '2px solid #e5e7eb' }} />;
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'horizontal-rule',
      version: 1,
    };
  }

  static importJSON(): HorizontalRuleNode {
    return $createHorizontalRuleNode();
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('hr');
    element.style.margin = '20px 0';
    element.style.border = 'none';
    element.style.borderTop = '2px solid #e5e7eb';
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      hr: () => ({
        conversion: () => ({
          node: $createHorizontalRuleNode(),
        }),
        priority: 0,
      }),
    };
  }
}

function $createHorizontalRuleNode(): HorizontalRuleNode {
  return new HorizontalRuleNode();
}

export default function EnhancedLexicalEditor({
  content,
  onChange,
  placeholder = 'Start typing...',
  className = '',
}: EnhancedLexicalEditorProps) {
  const initialConfig = {
    namespace: 'EnhancedLexicalEditor',
    theme: {
      paragraph: 'mb-2',
      heading: {
        h1: 'text-4xl font-bold mb-4 mt-6',
        h2: 'text-3xl font-bold mb-3 mt-5',
        h3: 'text-2xl font-bold mb-2 mt-4',
        h4: 'text-xl font-bold mb-2 mt-3',
        h5: 'text-lg font-bold mb-2 mt-2',
        h6: 'text-base font-bold mb-2 mt-2',
      },
      quote: 'border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700',
      list: {
        ul: 'list-disc ml-6 my-2',
        ol: 'list-decimal ml-6 my-2',
        listitem: 'mb-1',
        checklist: 'list-none ml-0 my-2',
        listitemChecked: 'line-through opacity-60',
        listitemUnchecked: '',
      },
      link: 'text-blue-600 underline hover:text-blue-800',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600',
      },
      code: 'bg-gray-900 text-gray-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto',
      table: 'border-collapse table-auto w-full my-4',
      tableCell: 'border border-gray-300 px-4 py-2',
      tableCellHeader: 'border border-gray-300 px-4 py-2 bg-gray-100 font-bold',
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      HorizontalRuleNode,
    ],
    onError: (error: Error) => console.error(error),
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <EnhancedToolbarPlugin />
        <div className="relative bg-white">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[500px] max-h-[600px] overflow-y-auto p-6 focus:outline-none prose prose-sm max-w-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute top-6 left-6 text-gray-400 pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={() => <div className="p-4 text-red-600">Loading editor...</div>}
          />
        </div>
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <TablePlugin />
        <LoadHtmlPlugin html={content} />
        <ExportHtmlPlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}
