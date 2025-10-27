import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import OrderHistoryClient from './OrderHistoryClient';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View your order history',
};

export default async function OrderHistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/account/orders');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">View and track your order history</p>
        </div>

        <OrderHistoryClient />
      </div>
    </div>
  );
}
