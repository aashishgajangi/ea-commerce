'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye, FileText, ArrowLeft } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

interface PagesResponse {
  pages: Page[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [deleting, setDeleting] = useState(false);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status,
        search,
        limit: '20',
        offset: '0',
      });

      const response = await fetch(`/api/admin/pages?${params}`);
      if (!response.ok) throw new Error('Failed to fetch pages');

      const data: PagesResponse = await response.json();
      setPages(data.pages);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete page');

      // Refresh the list
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Failed to delete page');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-gray-600">Manage your static pages with full SEO control</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Pages</CardTitle>
              <CardDescription>
                {total} {total === 1 ? 'page' : 'pages'} total
              </CardDescription>
            </div>
            <Link href="/admin/pages/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search pages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={status === 'all' ? 'default' : 'outline'}
                onClick={() => setStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={status === 'published' ? 'default' : 'outline'}
                onClick={() => setStatus('published')}
                size="sm"
              >
                Published
              </Button>
              <Button
                variant={status === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatus('draft')}
                size="sm"
              >
                Draft
              </Button>
            </div>
          </div>

          {/* Pages List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading pages...</p>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pages found</h3>
              <p className="text-gray-600 mb-4">
                {search || status !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first page'}
              </p>
              {!search && status === 'all' && (
                <Link href="/admin/pages/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Page
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold truncate">{page.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            page.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {page.status}
                        </span>
                        {page.slug === '' && (
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                            Homepage
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {page.slug === '' ? '/ (Homepage)' : `/${page.slug}`}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Created {formatDate(page.createdAt)}</span>
                        <span>Updated {formatDate(page.updatedAt)}</span>
                        {page.publishedAt && (
                          <span>Published {formatDate(page.publishedAt)}</span>
                        )}
                        {page.author && (
                          <span>by {page.author.name || page.author.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {page.status === 'published' && (
                        <Link href={page.slug === '' ? '/' : `/${page.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/pages/${page.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                        disabled={deleting}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}