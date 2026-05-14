'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function ToastProvider() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1F2937',
          border: '1px solid #374151',
          color: '#F9FAFB',
        },
        classNames: {
          success: 'border-green-500/30 bg-green-500/10',
          error: 'border-red-500/30 bg-red-500/10',
          warning: 'border-yellow-500/30 bg-yellow-500/10',
          info: 'border-purple-500/30 bg-purple-500/10',
        },
      }}
      theme="dark"
    />
  );
}
