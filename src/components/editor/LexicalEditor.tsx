'use client';

import { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection, 
  $isRangeSelection,
  $getRoot,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
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
  Undo,
  Redo,
} from 'lucide-react';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createParagraphNode } from 'lexical';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';

interface LexicalEditorProps {
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

// Toolbar Component
function ToolbarPlugin() {
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
            const headingElement = element as unknown as { __tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' };
            const tag = headingElement.__tag || 'h1';
            setBlockType(tag);
          } else if (type === 'quote') {
            setBlockType('quote');
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
        } else if (type.startsWith('h')) {
          $setBlocksType(selection, () => $createHeadingNode(type as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'));
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

  return (
    <>
      <div className="border-b bg-white p-3 space-y-2">
        {/* Row 1: Block type */}
        <div className="flex items-center gap-2">
          <select
            value={blockType}
            onChange={(e) => formatBlock(e.target.value)}
            className="px-3 py-1.5 border rounded-md text-sm font-medium"
          >
            <option value="paragraph">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="quote">Quote</option>
          </select>
        </div>

        {/* Row 2: Formatting tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            title="Underline"
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
            title="Code"
          >
            <Code className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

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

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Insert Link"
          >
            <Link2 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
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
            Add
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}

export default function LexicalEditor({
  content,
  onChange,
  placeholder = 'Start typing...',
  className = '',
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'LexicalEditor',
    theme: {
      paragraph: 'mb-2',
      heading: {
        h1: 'text-4xl font-bold mb-4',
        h2: 'text-3xl font-bold mb-3',
        h3: 'text-2xl font-bold mb-2',
        h4: 'text-xl font-bold mb-2',
        h5: 'text-lg font-bold mb-2',
      },
      quote: 'border-l-4 border-blue-500 pl-4 italic my-4',
      list: {
        ul: 'list-disc ml-6 my-2',
        ol: 'list-decimal ml-6 my-2',
        listitem: 'mb-1',
      },
      link: 'text-blue-600 underline',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono',
      },
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
    onError: (error: Error) => console.error(error),
  };

  return (
    <div className={`border rounded-lg ${className}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[400px] p-4 focus:outline-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={() => <div>Error</div>}
          />
        </div>
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <LoadHtmlPlugin html={content} />
        <ExportHtmlPlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}