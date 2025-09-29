"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

// Type definitions
interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  parentId: string | null;
  children: CategoryType[];
}

// Temporary mock data until tRPC client is fully working
const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    isActive: true,
    sortOrder: 0,
    parentId: null,
    children: [
      {
        id: "2",
        name: "Smartphones",
        slug: "smartphones",
        description: "Mobile phones and accessories",
        isActive: true,
        sortOrder: 0,
        parentId: "1",
        children: [],
      },
    ],
  },
  {
    id: "3",
    name: "Clothing",
    slug: "clothing",
    description: "Apparel and fashion items",
    isActive: true,
    sortOrder: 1,
    parentId: null,
    children: [],
  },
];

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [isLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Button onClick={() => setShowCreateForm(true)}>Add Category</Button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">No categories found</p>
            <Button onClick={() => setShowCreateForm(true)}>
              Create your first category
            </Button>
          </Card>
        ) : (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} level={0} />
          ))
        )}
      </div>

      {/* Create Category Modal Placeholder */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create New Category</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Close
                </Button>
              </div>
              <CategoryForm onClose={() => setShowCreateForm(false)} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  level,
}: {
  category: CategoryType;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`${level > 0 ? "ml-8 border-l-2 border-gray-200 pl-4" : ""}`}
    >
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {category.children.length > 0 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isExpanded ? "▼" : "▶"}
                </button>
              )}
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <StatusBadge isActive={category.isActive} />
            </div>

            {category.description && (
              <p className="text-gray-600 mb-2">{category.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Slug</p>
                <p className="font-mono text-sm">{category.slug}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sort Order</p>
                <p className="text-sm">{category.sortOrder}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                /* TODO: Edit category */
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                /* TODO: Add subcategory */
              }}
            >
              Add Child
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                /* TODO: Delete category */
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Child Categories */}
      {isExpanded &&
        category.children.map((child: CategoryType) => (
          <CategoryCard key={child.id} category={child} level={level + 1} />
        ))}
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function CategoryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    sortOrder: "0",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement category creation via tRPC
    // TODO: Implement category creation via tRPC
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Parent Category
          </label>
          <select
            value={formData.parentId}
            onChange={(e) =>
              setFormData({ ...formData, parentId: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No parent (root category)</option>
            <option value="1">Electronics</option>
            <option value="3">Clothing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort Order</label>
          <input
            type="number"
            value={formData.sortOrder}
            onChange={(e) =>
              setFormData({ ...formData, sortOrder: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({ ...formData, isActive: e.target.checked })
          }
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="isActive" className="ml-2 text-sm font-medium">
          Active
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
}
