'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { BlockInstance } from '@/lib/blocks/block-types';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Home, 
  Package, 
  Grid3X3, 
  List, 
  Star,
  ShoppingCart
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  blocks: string | null;
  children: Array<{
    id: string;
    name: string;
    slug: string;
    _count: {
      products: number;
      children: number;
    };
  }>;
  _count: {
    products: number;
    children: number;
  };
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  image?: string | null;
  images?: Array<{
    url: string;
    alt?: string | null;
  }>;
  isFeatured: boolean;
  stockQuantity: number | null;
  category: {
    name: string;
    slug: string;
  } | null;
}

interface BreadcrumbItem {
  id: string;
  name: string;
  slug: string;
}

interface CategoryClientProps {
  category: Category;
  products: Product[];
  total: number;
  breadcrumb: BreadcrumbItem[];
  blocks?: BlockInstance[];
}

export default function CategoryClient({ 
  category, 
  products, 
  total, 
  breadcrumb,
  blocks = []
}: CategoryClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumb.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumb.length - 1 ? (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/categories/${item.slug}`}>
                        {item.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Image */}
            {category.image && (
              <div className="flex-shrink-0">
                <div className="relative w-full lg:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 256px"
                  />
                </div>
              </div>
            )}

            {/* Category Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.name}
                </h1>
                <Badge variant="secondary">
                  {total} products
                </Badge>
              </div>

              {category.description && (
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
              )}

              {/* Subcategories */}
              {category.children.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Subcategories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.children.map((child) => (
                      <Link key={child.id} href={`/categories/${child.slug}`}>
                        <Badge 
                          variant="outline" 
                          className="hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          {child.name} ({child._count?.products || 0})
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      {blocks.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <BlockRenderer blocks={blocks} />
        </div>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing {products.length} of {total} products
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found in this category
            </h3>
              <p className="text-gray-600">
                This category doesn&apos;t have any products yet.
              </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {products.length < total && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ 
  product, 
  viewMode 
}: { 
  product: Product; 
  viewMode: 'grid' | 'list';
}) {
  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.slug}`}>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                {(product.image || (product.images && product.images.length > 0)) ? (
                  <Image
                    src={product.image || product.images![0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.compareAtPrice.toLocaleString()}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                  
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 h-full">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
            {(product.image || (product.images && product.images.length > 0)) ? (
              <Image
                src={product.image || product.images![0].url}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-16 w-16 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            )}
            
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isFeatured && (
                <Badge className="bg-blue-600">Featured</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">{discountPercentage}% OFF</Badge>
              )}
            </div>

            {/* Stock Status */}
            {product.stockQuantity !== null && product.stockQuantity <= 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">4.5</span>
              </div>
              
              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
