import { Suspense } from 'react';
import { Metadata } from 'next';
import CartClient from './CartClient';
import PublicLayout from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage items in your shopping cart',
};

export default function CartPage() {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading cart...</div>
          </div>
        }
      >
        <CartClient />
      </Suspense>
    </PublicLayout>
  );
}
