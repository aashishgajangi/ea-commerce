import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import OrderDetailClient from './OrderDetailClient';

export const metadata: Metadata = {
  title: 'Order Details - Admin',
  description: 'View and manage order details',
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login');
  }

  const { id } = await params;

  return <OrderDetailClient orderId={id} />;
}
