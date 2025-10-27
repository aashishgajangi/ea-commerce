'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  MapPin,
  Phone,
  Mail,
  CreditCard,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  productImage: string | null;
  productSlug: string;
  variantName: string | null;
  quantity: number;
  price: number;
  selectedWeight: number | null;
  subtotal: number;
}

interface StatusHistory {
  id: string;
  status: string;
  comment: string | null;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  paymentId: string | null;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  tax: number;
  currency: string;
  createdAt: string;
  confirmedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  contactPhone: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  statusHistory: StatusHistory[];
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
  preparing: { label: 'Preparing', icon: Package, color: 'text-purple-600 bg-purple-50' },
  out_for_delivery: { label: 'Out for Delivery', icon: Truck, color: 'text-indigo-600 bg-indigo-50' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50' },
};

export default function OrderDetailClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');

  useEffect(() => {
    fetchOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/orders/${orderId}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data);
        setNewStatus(data.status);
      } else {
        alert('Order not found');
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
      alert('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    if (!newStatus || newStatus === order?.status) return;

    try {
      setUpdating(true);
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, comment: statusComment }),
      });

      if (response.ok) {
        await fetchOrder();
        setStatusComment('');
        alert('Order status updated successfully');
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const syncPaymentStatus = async () => {
    try {
      setSyncing(true);
      const response = await fetch(`/api/admin/orders/${orderId}/sync-payment`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        await fetchOrder();
        alert('Payment status synced successfully');
      } else {
        alert(data.error || 'Failed to sync payment status');
      }
    } catch (error) {
      console.error('Failed to sync payment:', error);
      alert('Failed to sync payment status');
    } finally {
      setSyncing(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Not Found</h2>
          <Link href="/admin/orders" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
  const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
              <p className="text-gray-600 mt-1">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.color}`}>
              <StatusIcon className="w-5 h-5" />
              <span className="font-medium">{statusInfo.label}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {item.productImage && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      {item.variantName && (
                        <p className="text-sm text-gray-500">Variant: {item.variantName}</p>
                      )}
                      {item.selectedWeight && (
                        <p className="text-sm text-gray-500">Weight: {item.selectedWeight}kg</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × {formatPrice(item.price, order.currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.subtotal, order.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal, order.currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>{formatPrice(order.deliveryCharge, order.currency)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax, order.currency)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(order.total, order.currency)}</span>
                </div>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status History</h2>
              <div className="space-y-4">
                {order.statusHistory.map((history, index) => (
                  <div key={history.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                      {index < order.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-gray-900 capitalize">
                        {history.status.replace('_', ' ')}
                      </p>
                      {history.comment && (
                        <p className="text-sm text-gray-600 mt-1">{history.comment}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(history.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Update Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment (Optional)
                  </label>
                  <textarea
                    value={statusComment}
                    onChange={(e) => setStatusComment(e.target.value)}
                    rows={3}
                    placeholder="Add a note about this status change..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={updateStatus}
                  disabled={updating || newStatus === order.status}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {order.paymentMethod || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <p className={`font-medium capitalize ${
                      order.paymentStatus === 'paid' ? 'text-green-600' :
                      order.paymentStatus === 'failed' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {order.paymentId && (
                  <div>
                    <p className="text-sm text-gray-500">Payment ID</p>
                    <p className="text-xs font-mono text-gray-900 break-all">
                      {order.paymentId}
                    </p>
                  </div>
                )}

                {order.paymentMethod === 'razorpay' && order.paymentId && (
                  <button
                    onClick={syncPaymentStatus}
                    disabled={syncing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                    {syncing ? 'Syncing...' : 'Sync Razorpay Status'}
                  </button>
                )}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{order.deliveryAddress.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.deliveryAddress.addressLine1}
                      {order.deliveryAddress.addressLine2 && `, ${order.deliveryAddress.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-900">{order.deliveryAddress.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-900">{order.deliveryAddress.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
