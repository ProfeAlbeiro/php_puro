const CACHE_NAME = 'app-v1';
const URLS_TO_CACHE = [
    '/', 
    '/index.php',
    '/?c=Login',
    '/?c=Landing'
];

// Instalación: cachea todos los archivos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE).catch(err => {
                console.warn('Error cacheando:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activación
self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

// Fetch: estrategia network-first con fallback a cache
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, clone);
                });
                return res;
            })
            .catch(() => {
                // Intentar servir desde cache
                return caches.match(e.request).then(res => {
                    if (res) return res;

                    // Último fallback: regresar index.php
                    return caches.match('/index.php');
                });
            })
    );
});
