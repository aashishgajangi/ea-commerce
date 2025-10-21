'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check if PWA is enabled
      fetch('/api/pwa/settings')
        .then((res) => res.json())
        .then((settings) => {
          if (settings.enabled && settings.enableOfflineMode) {
            registerServiceWorker();
          }
        })
        .catch((error) => {
          console.error('Failed to check PWA settings:', error);
        });
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('Service Worker registered:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('New service worker available');
              
              // Optionally show update prompt
              if (confirm('New version available! Reload to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });

      // Handle controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker updated');
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  return null; // This component doesn't render anything
}
