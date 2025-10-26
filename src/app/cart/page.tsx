import { Suspense } from 'react';
import { Metadata } from 'next';
import CartClient from './CartClient';
import PublicLayout from '@/components/layout/PublicLayout';
import CartSkeleton from '@/components/cart/CartSkeleton';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage items in your shopping cart',
};

export default function CartPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<CartSkeleton />}>
        <CartClient />
      </Suspense>
    </PublicLayout>
  );
}
