const CACHE_NAME = 'riyadh-salihin-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/english-audio.html',
  '/arabic-audio.html',
  '/riyad-us-saliheen-sync.html',
  '/english-sync.html',
  '/arabic-sync.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap'
];

const API_CACHE_NAME = 'riyadh-api-v1';
const API_URLS = [
  '/api/riyad-al-salihin.json',
  '/api/riyad_us_saliheen_audios.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => {
          return new Request(url, { cache: 'reload' });
        }).filter(req => req.url.startsWith(self.location.origin)));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first for API, cache first for static
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(API_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Handle audio files from archive.org - network only (too large to cache)
  if (url.hostname.includes('archive.org')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Handle static assets - cache first, network fallback
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
  );
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // Cache specific audio file
  if (event.data.type === 'CACHE_AUDIO') {
    event.waitUntil(
      fetch(event.data.url)
        .then((response) => {
          return caches.open('audio-cache-v1').then((cache) => {
            return cache.put(event.data.url, response);
          });
        })
    );
  }
});
