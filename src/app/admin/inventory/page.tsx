'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, AlertTriangle, XCircle, History, ArrowLeft } from 'lucide-react';

interface InventorySummary {
  totalProducts: number;
  totalVariants: number;
  totalStock: number;
  lowStockCount: number;
  outOfStockCount: number;
}

interface StockItem {
  id: string;
  name: string;
  sku: string | null;
  stockQuantity: number;
  lowStockThreshold: number | null;
  type: 'product' | 'variant';
  productId?: string;
  productName?: string;
}

interface InventoryLog {
  id: string;
  type: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string | null;
  reference: string | null;
  createdAt: string;
  product?: { id: string; name: string };
  variant?: { id: string; name: string };
}

export default function InventoryPage() {
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [lowStockItems, setLowStockItems] = useState<StockItem[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<StockItem[]>([]);
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'low-stock' | 'out-of-stock' | 'logs'>(
    'overview'
  );

  // Adjustment modal state
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [adjustmentItem, setAdjustmentItem] = useState<StockItem | null>(null);
  const [adjustmentForm, setAdjustmentForm] = useState({
    type: 'add',
    quantity: '0',
    reason: '',
    reference: '',
  });

  const fetchInventoryData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch summary
      const summaryResponse = await fetch('/api/admin/inventory?view=summary');
      if (!summaryResponse.ok) throw new Error('Failed to fetch inventory summary');
      const summaryData = await summaryResponse.json();
      setSummary(summaryData);

      // Fetch low stock items
      const lowStockResponse = await fetch('/api/admin/inventory?view=low-stock');
      if (!lowStockResponse.ok) throw new Error('Failed to fetch low stock items');
      const lowStockData = await lowStockResponse.json();
      setLowStockItems(lowStockData.products || []);

      // Fetch out of stock items
      const outOfStockResponse = await fetch('/api/admin/inventory?view=out-of-stock');
      if (!outOfStockResponse.ok) throw new Error('Failed to fetch out of stock items');
      const outOfStockData = await outOfStockResponse.json();
      setOutOfStockItems(outOfStockData.products || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: '50' });
      const response = await fetch(`/api/admin/inventory/logs?${params}`);
      if (!response.ok) throw new Error('Failed to fetch logs');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }, []);

  useEffect(() => {
    fetchInventoryData();
    if (activeTab === 'logs') {
      fetchLogs();
    }
  }, [fetchInventoryData, activeTab, fetchLogs]);

  const handleAdjustStock = (item: StockItem) => {
    setAdjustmentItem(item);
    setAdjustmentForm({
      type: 'add',
      quantity: '0',
      reason: '',
      reference: '',
    });
    setShowAdjustment(true);
  };

  const handleSubmitAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustmentItem) return;

    try {
      const response = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: adjustmentItem.type === 'product' ? adjustmentItem.id : adjustmentItem.productId,
          variantId: adjustmentItem.type === 'variant' ? adjustmentItem.id : undefined,
          type: adjustmentForm.type,
          quantity: parseInt(adjustmentForm.quantity),
          reason: adjustmentForm.reason || undefined,
          reference: adjustmentForm.reference || undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to adjust stock');

      setShowAdjustment(false);
      setAdjustmentItem(null);
      fetchInventoryData();
      if (activeTab === 'logs') fetchLogs();
    } catch (error) {
      console.error('Error adjusting stock:', error);
      alert('Failed to adjust stock');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStockStatus = (item: StockItem) => {
    if (item.stockQuantity === 0) {
      return { label: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-50' };
    }
    if (item.lowStockThreshold && item.stockQuantity <= item.lowStockThreshold) {
      return { label: 'Low Stock', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    }
    return { label: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600">Track and manage product stock levels</p>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">{summary.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Variants</p>
                  <p className="text-2xl font-bold">{summary.totalVariants}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Stock</p>
                  <p className="text-2xl font-bold">{summary.totalStock}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{summary.lowStockCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{summary.outOfStockCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'low-stock'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('low-stock')}
          >
            Low Stock ({lowStockItems.length})
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'out-of-stock'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('out-of-stock')}
          >
            Out of Stock ({outOfStockItems.length})
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'logs'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            History
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {lowStockItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Low Stock Items
                </CardTitle>
                <CardDescription>Products and variants running low on stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockItems.slice(0, 5).map((item) => {
                    const status = getStockStatus(item);
                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.sku && `SKU: ${item.sku} • `}
                            {item.type === 'variant' && item.productName && `${item.productName} • `}
                            Stock: {item.stockQuantity}
                            {item.lowStockThreshold && ` / ${item.lowStockThreshold}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${status.bgColor} ${status.color}`}>
                            {status.label}
                          </span>
                          <Button size="sm" variant="outline" onClick={() => handleAdjustStock(item)}>
                            Adjust
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {lowStockItems.length > 5 && (
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => setActiveTab('low-stock')}
                  >
                    View all {lowStockItems.length} low stock items
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {outOfStockItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Out of Stock Items
                </CardTitle>
                <CardDescription>Products and variants that need restocking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outOfStockItems.slice(0, 5).map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-center justify-between p-3 border rounded-lg bg-red-50"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.sku && `SKU: ${item.sku} • `}
                          {item.type === 'variant' && item.productName && `${item.productName} • `}
                          Out of stock
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleAdjustStock(item)}>
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
                {outOfStockItems.length > 5 && (
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => setActiveTab('out-of-stock')}
                  >
                    View all {outOfStockItems.length} out of stock items
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {lowStockItems.length === 0 && outOfStockItems.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-green-600">All Stock Levels Good!</h3>
                <p className="text-gray-600">No low stock or out of stock items to report</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Low Stock Tab */}
      {activeTab === 'low-stock' && (
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>{lowStockItems.length} items running low on stock</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No low stock items</p>
              </div>
            ) : (
              <div className="space-y-2">
                {lowStockItems.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.sku && `SKU: ${item.sku} • `}
                          {item.type === 'variant' && item.productName && `${item.productName} • `}
                          Stock: {item.stockQuantity}
                          {item.lowStockThreshold && ` / ${item.lowStockThreshold}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${status.bgColor} ${status.color}`}>
                          {status.label}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => handleAdjustStock(item)}>
                          Adjust
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Out of Stock Tab */}
      {activeTab === 'out-of-stock' && (
        <Card>
          <CardHeader>
            <CardTitle>Out of Stock Items</CardTitle>
            <CardDescription>{outOfStockItems.length} items need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            {outOfStockItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">No out of stock items</p>
              </div>
            ) : (
              <div className="space-y-2">
                {outOfStockItems.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center justify-between p-3 border rounded-lg bg-red-50"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.sku && `SKU: ${item.sku} • `}
                        {item.type === 'variant' && item.productName && `${item.productName} • `}
                        Out of stock
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleAdjustStock(item)}>
                      Restock
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Inventory History
            </CardTitle>
            <CardDescription>Recent stock adjustments and changes</CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No inventory history yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">
                        {log.product?.name || log.variant?.name}
                        {log.variant && log.product && ` - ${log.variant.name}`}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold capitalize">{log.type}</span>
                        {': '}
                        {log.previousStock} → {log.newStock}
                        {' ('}
                        {log.quantity > 0 ? '+' : ''}
                        {log.quantity}
                        {')'}
                        {log.reason && ` • ${log.reason}`}
                        {log.reference && ` • Ref: ${log.reference}`}
                      </div>
                      <div className="text-xs text-gray-500">{formatDate(log.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Adjustment Modal */}
      {showAdjustment && adjustmentItem && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Adjust Stock</CardTitle>
              <CardDescription>
                {adjustmentItem.name}
                {adjustmentItem.type === 'variant' && adjustmentItem.productName && (
                  <span> ({adjustmentItem.productName})</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAdjustment} className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Stock</Label>
                  <div className="text-2xl font-bold">{adjustmentItem.stockQuantity}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adjustmentType">Adjustment Type</Label>
                  <select
                    id="adjustmentType"
                    value={adjustmentForm.type}
                    onChange={(e) => setAdjustmentForm({ ...adjustmentForm, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="add">Add Stock</option>
                    <option value="remove">Remove Stock</option>
                    <option value="set">Set Stock Level</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    {adjustmentForm.type === 'set' ? 'New Stock Level' : 'Quantity'}
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={adjustmentForm.quantity}
                    onChange={(e) => setAdjustmentForm({ ...adjustmentForm, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input
                    id="reason"
                    value={adjustmentForm.reason}
                    onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                    placeholder="e.g., Received shipment, Damaged goods"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={adjustmentForm.reference}
                    onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reference: e.target.value })}
                    placeholder="e.g., PO-12345"
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button type="submit" className="flex-1">
                    Confirm Adjustment
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAdjustment(false);
                      setAdjustmentItem(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}