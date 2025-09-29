"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { SearchAndFilter } from "@repo/ui/search";

// Mock data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    basePrice: 999.99,
    stockQuantity: 25,
    status: "ACTIVE",
    isFeatured: true,
    category: "Electronics",
    tags: ["phone", "apple", "premium"],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    slug: "samsung-galaxy-s24",
    basePrice: 899.99,
    stockQuantity: 18,
    status: "ACTIVE",
    isFeatured: false,
    category: "Electronics",
    tags: ["phone", "samsung", "android"],
  },
  {
    id: "3",
    name: "MacBook Air M3",
    slug: "macbook-air-m3",
    basePrice: 1299.99,
    stockQuantity: 12,
    status: "ACTIVE",
    isFeatured: true,
    category: "Computers",
    tags: ["laptop", "apple", "premium"],
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter products based on current filters
  const filteredProducts = mockProducts.filter((product) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !product.name.toLowerCase().includes(query) &&
        !product.tags.some((tag) => tag.toLowerCase().includes(query)) &&
        !product.category.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Category filter
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(product.category)) {
        return false;
      }
    }

    // Status filter
    if (selectedStatus.length > 0) {
      if (!selectedStatus.includes(product.status)) {
        return false;
      }
    }

    // Price range filter
    if (priceRange.length > 0) {
      const price = product.basePrice;
      const inRange = priceRange.some((range) => {
        switch (range) {
          case "under-500":
            return price < 500;
          case "500-1000":
            return price >= 500 && price <= 1000;
          case "1000-1500":
            return price >= 1000 && price <= 1500;
          case "over-1500":
            return price > 1500;
          default:
            return true;
        }
      });
      if (!inRange) return false;
    }

    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.basePrice - b.basePrice;
        break;
      case "stock":
        comparison = a.stockQuantity - b.stockQuantity;
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });

  const filterGroups = [
    {
      title: "Category",
      options: [
        { value: "Electronics", label: "Electronics", count: 2 },
        { value: "Computers", label: "Computers", count: 1 },
      ],
      selectedValues: selectedCategories,
      onSelectionChange: setSelectedCategories,
    },
    {
      title: "Status",
      options: [
        { value: "ACTIVE", label: "Active", count: 3 },
        { value: "DRAFT", label: "Draft", count: 0 },
        { value: "INACTIVE", label: "Inactive", count: 0 },
      ],
      selectedValues: selectedStatus,
      onSelectionChange: setSelectedStatus,
    },
    {
      title: "Price Range",
      options: [
        { value: "under-500", label: "Under $500", count: 0 },
        { value: "500-1000", label: "$500 - $1,000", count: 1 },
        { value: "1000-1500", label: "$1,000 - $1,500", count: 2 },
        { value: "over-1500", label: "Over $1,500", count: 0 },
      ],
      selectedValues: priceRange,
      onSelectionChange: setPriceRange,
    },
  ];

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "stock", label: "Stock" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Search</h1>

      <SearchAndFilter
        searchPlaceholder="Search products by name, category, or tags..."
        onSearch={setSearchQuery}
        filterGroups={filterGroups}
        sortOptions={sortOptions}
        sortValue={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      >
        {/* Results */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {mockProducts.length} products
            </p>

            {/* Clear filters button */}
            {(searchQuery ||
              selectedCategories.length > 0 ||
              selectedStatus.length > 0 ||
              priceRange.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setSelectedStatus([]);
                  setPriceRange([]);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600 mb-2">No products found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search criteria or filters
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-medium">
                          ${product.basePrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Stock:</span>
                        <span
                          className={
                            product.stockQuantity > 10
                              ? "text-green-600"
                              : "text-orange-600"
                          }
                        >
                          {product.stockQuantity} units
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="text-sm">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SearchAndFilter>
    </div>
  );
}
