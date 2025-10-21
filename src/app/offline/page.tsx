'use client';

import { WifiOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <WifiOff className="w-24 h-24 mx-auto text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          You&apos;re Offline
        </h1>
        
        <p className="text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. 
          Please check your network and try again.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Try Again
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Some pages may still be available from your cache
        </p>
      </div>
    </div>
  );
}
