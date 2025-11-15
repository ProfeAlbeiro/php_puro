// asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_php_limpio';
const urlsToCache = [
  '/',  
  '/assets/landing/js/custom.js',
  '/assets/landing/js/templatemo.js',
  '/assets/landing/js/bootstrap.bundle.min.js',
  '/assets/landing/css/bootstrap.min.css',
  '/assets/landing/css/templatemo.css'
];

// instalar
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// activar
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        return caches.match('/'); // mostrar al menos la página principal offline
      });
    })
  );
});