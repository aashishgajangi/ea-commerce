'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        style: {
          background: 'white',
          color: 'black',
          border: '1px solid #e5e7eb',
        },
        className: 'toast',
      }}
    />
  );
}
