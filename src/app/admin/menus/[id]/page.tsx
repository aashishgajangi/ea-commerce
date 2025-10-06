'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Trash2, GripVertical, Menu as MenuIcon } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Page {
  id: string;
  title: string;
  slug: string;
}

interface MenuItem {
  id: string;
  label: string;
  url: string | null;
  type: string;
  pageId: string | null;
  target: string;
  cssClass: string | null;
  order: number;
  page?: Page | null;
  children: MenuItem[];
}

interface Menu {
  id: string;
  name: string;
  slug: string;
  location: string;
  items: MenuItem[];
}

interface MenuEditorProps {
  params: Promise<{
    id: string;
  }>;
}

function SortableItem({ item, onDelete }: { item: MenuItem; onDelete: (id: string, label: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getItemUrl = () => {
    if (item.type === 'page' && item.page) {
      return item.page.slug === '' ? '/' : `/${item.page.slug}`;
    }
    return item.url || '#';
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{item.label}</h4>
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {item.type}
                </span>
                {item.target === '_blank' && (
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                    New Tab
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {item.type === 'page' && item.page
                  ? `Page: ${item.page.title} (${getItemUrl()})`
                  : getItemUrl()}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(item.id, item.label)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MenuEditor({ params }: MenuEditorProps) {
  const [menuId, setMenuId] = useState<string>('');
  const [menu, setMenu] = useState<Menu | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Add item form
  const [itemType, setItemType] = useState<'page' | 'custom' | 'external'>('page');
  const [itemLabel, setItemLabel] = useState('');
  const [itemUrl, setItemUrl] = useState('');
  const [itemPageId, setItemPageId] = useState('');
  const [itemTarget, setItemTarget] = useState<'_self' | '_blank'>('_self');

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      setMenuId(resolvedParams.id);

      try {
        // Fetch menu
        const menuResponse = await fetch(`/api/admin/menus/${resolvedParams.id}`);
        if (!menuResponse.ok) throw new Error('Failed to fetch menu');
        const menuData = await menuResponse.json();
        setMenu(menuData);

        // Fetch all pages (including drafts so they can be added to menus)
        const pagesResponse = await fetch('/api/admin/pages?status=all&limit=100');
        if (pagesResponse.ok) {
          const pagesData = await pagesResponse.json();
          setPages(pagesData.pages);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load menu');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !menu) return;

    if (active.id !== over.id) {
      const oldIndex = menu.items.findIndex((item) => item.id === active.id);
      const newIndex = menu.items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(menu.items, oldIndex, newIndex);
      setMenu({ ...menu, items: newItems });

      // Update order on server
      try {
        await fetch(`/api/admin/menus/${menuId}/items`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: newItems.map((item, index) => ({
              id: item.id,
              order: index,
            })),
          }),
        });
      } catch (error) {
        console.error('Error reordering items:', error);
        // Reload menu on error
        const menuResponse = await fetch(`/api/admin/menus/${menuId}`);
        if (menuResponse.ok) {
          const menuData = await menuResponse.json();
          setMenu(menuData);
        }
      }
    }
  };

  const handleAddItem = async () => {
    if (!itemLabel.trim()) {
      alert('Please enter a label');
      return;
    }

    if (itemType === 'custom' && !itemUrl.trim()) {
      alert('Please enter a URL for custom link');
      return;
    }

    if (itemType === 'page' && !itemPageId) {
      alert('Please select a page');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/menus/${menuId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: itemLabel,
          type: itemType,
          url: itemType !== 'page' ? itemUrl : undefined,
          pageId: itemType === 'page' ? itemPageId : undefined,
          target: itemTarget,
        }),
      });

      if (!response.ok) throw new Error('Failed to add menu item');

      // Refresh menu
      const menuResponse = await fetch(`/api/admin/menus/${menuId}`);
      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        setMenu(menuData);
      }

      // Reset form
      setShowAddModal(false);
      setItemLabel('');
      setItemUrl('');
      setItemPageId('');
      setItemType('page');
      setItemTarget('_self');
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (itemId: string, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/menus/${menuId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete menu item');

      // Refresh menu
      const menuResponse = await fetch(`/api/admin/menus/${menuId}`);
      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        setMenu(menuData);
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <p>Menu not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/menus">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{menu.name}</h1>
            <p className="text-gray-600">
              Location: {menu.location} | {menu.items.length} item{menu.items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>
            Drag and drop to reorder menu items
          </CardDescription>
        </CardHeader>
        <CardContent>
          {menu.items.length === 0 ? (
            <div className="text-center py-12">
              <MenuIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No menu items</h3>
              <p className="text-gray-600 mb-4">Add your first menu item to get started</p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={menu.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {menu.items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Add Menu Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Add Menu Item</CardTitle>
              <CardDescription>Add a new item to your navigation menu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemType">Link Type *</Label>
                <select
                  id="itemType"
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value as 'page' | 'custom' | 'external')}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="page">Page</option>
                  <option value="custom">Custom Link</option>
                  <option value="external">External Link</option>
                </select>
              </div>

              <div>
                <Label htmlFor="itemLabel">Label *</Label>
                <Input
                  id="itemLabel"
                  value={itemLabel}
                  onChange={(e) => setItemLabel(e.target.value)}
                  placeholder="e.g., Home, About, Contact"
                  className="mt-1"
                />
              </div>

              {itemType === 'page' ? (
                <div>
                  <Label htmlFor="itemPage">Select Page *</Label>
                  <select
                    id="itemPage"
                    value={itemPageId}
                    onChange={(e) => setItemPageId(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="">Select a page...</option>
                    {pages.map((page) => (
                      <option key={page.id} value={page.id}>
                        {page.title} ({page.slug === '' ? '/' : `/${page.slug}`})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="itemUrl">URL *</Label>
                  <Input
                    id="itemUrl"
                    value={itemUrl}
                    onChange={(e) => setItemUrl(e.target.value)}
                    placeholder={itemType === 'external' ? 'https://example.com' : '/custom-url'}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="itemTarget">Open In</Label>
                <select
                  id="itemTarget"
                  value={itemTarget}
                  onChange={(e) => setItemTarget(e.target.value as '_self' | '_blank')}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="_self">Same Tab</option>
                  <option value="_blank">New Tab</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setItemLabel('');
                    setItemUrl('');
                    setItemPageId('');
                    setItemType('page');
                    setItemTarget('_self');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddItem} disabled={saving}>
                  {saving ? 'Adding...' : 'Add Item'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}