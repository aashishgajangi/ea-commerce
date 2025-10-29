'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductsGridBlockData {
  title: string;
  filter: 'featured' | 'new' | 'sale' | 'category' | 'manual';
  categoryId: string | null;
  productIds: string[];
  count: number;
  columnsMobile: number;
  columnsTablet: number;
  columnsDesktop: number;
  showPrice: boolean;
  showAddToCart: boolean;
}

interface ProductsGridBlockEditorProps {
  data: ProductsGridBlockData;
  onChange: (data: ProductsGridBlockData) => void;
}

export default function ProductsGridBlockEditor({ data, onChange }: ProductsGridBlockEditorProps) {
  const updateField = (field: keyof ProductsGridBlockData, value: string | number | boolean | string[] | null) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Featured Products"
        />
      </div>

      <div>
        <Label>Filter</Label>
        <select
          value={data.filter}
          onChange={(e) => updateField('filter', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="featured">Featured Products</option>
          <option value="new">New Arrivals</option>
          <option value="sale">On Sale</option>
          <option value="category">By Category</option>
          <option value="manual">Manual Selection</option>
        </select>
      </div>

      <div>
        <Label>Number of Products</Label>
        <Input
          type="number"
          min="1"
          max="20"
          value={data.count}
          onChange={(e) => updateField('count', parseInt(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Mobile Columns</Label>
          <select
            value={data.columnsMobile}
            onChange={(e) => updateField('columnsMobile', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
          </select>
        </div>

        <div>
          <Label>Tablet Columns</Label>
          <select
            value={data.columnsTablet}
            onChange={(e) => updateField('columnsTablet', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
          </select>
        </div>

        <div>
          <Label>Desktop Columns</Label>
          <select
            value={data.columnsDesktop}
            onChange={(e) => updateField('columnsDesktop', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
            <option value="5">5 Columns</option>
            <option value="6">6 Columns</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showPrice"
            checked={data.showPrice}
            onChange={(e) => updateField('showPrice', e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="showPrice">Show Price</Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showAddToCart"
            checked={data.showAddToCart}
            onChange={(e) => updateField('showAddToCart', e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="showAddToCart">Show Add to Cart Button</Label>
        </div>
      </div>
    </div>
  );
}
