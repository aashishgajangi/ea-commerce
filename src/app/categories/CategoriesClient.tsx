'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Package, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  parent?: { id: string; name: string } | null;
  children?: Array<{
    id: string;
    name: string;
    slug: string;
    _count?: {
      products: number;
      children: number;
    };
  }>;
  _count?: {
    products: number;
    children: number;
  };
}

interface CategoriesClientProps {
  categories: Category[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  const [search, setSearch] = useState('');

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Get top-level categories (no parent)
  const topLevelCategories = filteredCategories.filter(cat => !cat.parentId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Product Categories
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Browse our wide selection of products organized by category
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {topLevelCategories.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-600">
                {search ? 'Try adjusting your search terms' : 'Categories will appear here once added'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topLevelCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
        <CardContent className="p-0">
          {/* Category Image */}
          <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {/* Product Count Badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-900">
                {category._count?.products || 0} products
              </Badge>
            </div>
          </div>

          {/* Category Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            
            {category.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {category.description}
              </p>
            )}

            {/* Subcategories */}
            {category.children && category.children.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Subcategories ({category.children.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.children.slice(0, 3).map((child) => (
                    <Badge key={child.id} variant="outline" className="text-xs">
                      {child.name}
                    </Badge>
                  ))}
                  {category.children.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.children.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
