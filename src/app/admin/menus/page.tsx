'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Menu as MenuIcon } from 'lucide-react';

interface Menu {
  id: string;
  name: string;
  slug: string;
  location: string;
  createdAt: string;
  items: unknown[];
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  
  // Create form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [location, setLocation] = useState<'header' | 'footer' | 'sidebar'>('header');

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/menus');
      if (!response.ok) throw new Error('Failed to fetch menus');
      
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(newName));
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      alert('Please enter a menu name');
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug: slug || generateSlug(name), location }),
      });

      if (!response.ok) throw new Error('Failed to create menu');

      setShowCreateModal(false);
      setName('');
      setSlug('');
      setLocation('header');
      fetchMenus();
    } catch (error) {
      console.error('Error creating menu:', error);
      alert('Failed to create menu');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, menuName: string) => {
    if (!confirm(`Are you sure you want to delete "${menuName}"? This will also delete all menu items.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/menus/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete menu');

      fetchMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
      alert('Failed to delete menu');
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Navigation Menus</h1>
          <p className="text-gray-600">Manage your site navigation menus</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Menu
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading menus...</p>
        </div>
      ) : menus.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MenuIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No menus found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first navigation menu</p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Menu
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <Card key={menu.id}>
              <CardHeader>
                <CardTitle>{menu.name}</CardTitle>
                <CardDescription>
                  Location: {menu.location} | {menu.items.length} item{menu.items.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href={`/admin/menus/${menu.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Items
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(menu.id, menu.name)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Menu Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Create New Menu</CardTitle>
              <CardDescription>Add a new navigation menu to your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="menuName">Menu Name *</Label>
                <Input
                  id="menuName"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Main Menu"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="menuSlug">Slug *</Label>
                <Input
                  id="menuSlug"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="main-menu"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="menuLocation">Location *</Label>
                <select
                  id="menuLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as 'header' | 'footer' | 'sidebar')}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="sidebar">Sidebar</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setName('');
                    setSlug('');
                    setLocation('header');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={creating}>
                  {creating ? 'Creating...' : 'Create Menu'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}