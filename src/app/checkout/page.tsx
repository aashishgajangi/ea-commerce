import { Suspense } from 'react';
import { auth } from '@/auth';
import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Checkout | Your Store',
  description: 'Complete your order',
};

export default async function CheckoutPage() {
  const session = await auth();

  // Optional: Redirect to login if not authenticated
  // Uncomment if you want to require login for checkout
  // if (!session) {
  //   redirect('/login?callbackUrl=/checkout');
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutClient session={session} />
      </Suspense>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
