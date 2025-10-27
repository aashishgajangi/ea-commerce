import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import OrdersClient from './OrdersClient';

export const metadata: Metadata = {
  title: 'Orders Management - Admin',
  description: 'Manage all orders',
};

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login');
  }

  return <OrdersClient />;
}
