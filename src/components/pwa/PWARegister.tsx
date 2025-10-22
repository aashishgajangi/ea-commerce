'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    console.log('🔍 PWA Register: Checking environment...');
    console.log('  - Window defined:', typeof window !== 'undefined');
    console.log('  - Service Worker supported:', 'serviceWorker' in navigator);
    
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check if PWA is enabled
      console.log('🔍 PWA Register: Fetching settings...');
      fetch('/api/pwa/settings')
        .then((res) => res.json())
        .then((settings) => {
          console.log('🔍 PWA Register: Settings loaded:', settings);
          if (settings.enabled && settings.enableOfflineMode) {
            console.log('✅ PWA Register: PWA enabled, registering service worker...');
            registerServiceWorker();
          } else {
            console.log('⚠️ PWA Register: PWA disabled or offline mode off');
          }
        })
        .catch((error) => {
          console.error('❌ PWA Register: Failed to check PWA settings:', error);
          // Fallback: try to register service worker anyway
          console.log('🔄 PWA Register: Attempting fallback registration...');
          registerServiceWorker();
        });
    } else {
      console.log('❌ PWA Register: Service Worker not supported');
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('✅ Service Worker registered successfully!');
      console.log('  - Scope:', registration.scope);
      console.log('  - Active:', !!registration.active);
      console.log('  - Installing:', !!registration.installing);
      console.log('  - Waiting:', !!registration.waiting);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('🔄 Service Worker update found');
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            console.log('🔄 Service Worker state changed:', newWorker.state);
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('✅ New service worker available');
              
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
        console.log('✅ Service Worker controller changed (updated)');
      });

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      console.error('  - Error details:', error);
    }
  }

  return null; // This component doesn't render anything
}
