import { Suspense } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import ModernProductsContent from '@/components/products/ModernProductsContent';

export const revalidate = 60; // Revalidate every 60 seconds

export default function ProductsPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ModernProductsContent />
      </Suspense>
    </PublicLayout>
  );
}