// Service Worker for PWA
const CACHE_NAME = 'pwa-cache-v1';
const DYNAMIC_CACHE = 'pwa-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for:
  // - Admin pages
  // - API calls (except some endpoints)
  // - External requests
  if (
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/api/admin') ||
    (url.pathname.startsWith('/api') && 
     !url.pathname.includes('/api/products') &&
     !url.pathname.includes('/api/pwa')) ||
    url.origin !== self.location.origin
  ) {
    return event.respondWith(fetch(request));
  }

  // Network first, fallback to cache strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone the response
        const responseClone = response.clone();
        
        // Cache the response for future offline use
        caches.open(DYNAMIC_CACHE)
          .then((cache) => {
            cache.put(request, responseClone);
          });
        
        return response;
      })
      .catch(async () => {
        // Try to get from cache
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // If requesting an HTML page and offline, return offline page
        if (request.headers.get('accept').includes('text/html')) {
          const offlinePage = await caches.match('/offline');
          if (offlinePage) {
            return offlinePage;
          }
        }
        
        // Return a generic offline response
        return new Response(
          'You are offline. Please check your internet connection.',
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          }
        );
      })
  );
});

// Message event - for cache clearing and updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Push notification event (future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification('Store Update', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});
