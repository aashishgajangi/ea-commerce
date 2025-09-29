"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

// Temporary mock data until tRPC client is fully working
const mockProducts = [
  {
    id: "1",
    name: "Sample Product 1",
    slug: "sample-product-1",
    basePrice: 29.99,
    stockQuantity: 100,
    status: "ACTIVE",
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sample Product 2",
    slug: "sample-product-2",
    basePrice: 49.99,
    stockQuantity: 50,
    status: "DRAFT",
    isActive: false,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [products] = useState(mockProducts);
  const [isLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Product
        </Button>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">No products found</p>
            <Button onClick={() => setShowCreateForm(true)}>
              Create your first product
            </Button>
          </Card>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <StatusBadge status={product.status} />
                    {product.isFeatured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-medium">${product.basePrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="font-medium">{product.stockQuantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Slug</p>
                      <p className="font-mono text-sm">{product.slug}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created</p>
                      <p className="text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      /* TODO: Edit product */
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      /* TODO: Toggle featured */
                    }}
                  >
                    {product.isFeatured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => {
                      /* TODO: Delete product */
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Create Product Modal Placeholder */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create New Product</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Close
                </Button>
              </div>
              <ProductForm onClose={() => setShowCreateForm(false)} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    ACTIVE: "bg-green-100 text-green-800",
    DRAFT: "bg-gray-100 text-gray-800",
    INACTIVE: "bg-red-100 text-red-800",
    ARCHIVED: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${colors[status as keyof typeof colors]}`}
    >
      {status}
    </span>
  );
}

function ProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    basePrice: "",
    stockQuantity: "",
    status: "DRAFT",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product creation via tRPC
    // TODO: Implement product creation via tRPC
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

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.basePrice}
            onChange={(e) =>
              setFormData({ ...formData, basePrice: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={formData.stockQuantity}
            onChange={(e) =>
              setFormData({ ...formData, stockQuantity: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Product
        </Button>
      </div>
    </form>
  );
}
