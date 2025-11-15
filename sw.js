const CACHE_NAME = "v4_cache_php_limpio";

const urlsToCache = [
  "/",
  "/index.php",
  "/assets/landing/css/bootstrap.min.css",
  "/assets/landing/css/templatemo.css",
  "/assets/landing/js/bootstrap.bundle.min.js",
  "/assets/landing/js/custom.js",
  "/assets/landing/js/templatemo.js",
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  const req = event.request;

  // SI ES NAVEGACIÓN → entregar index.php offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match("/index.php");
      })
    );
    return;
  }

  // PARA DEMÁS ARCHIVOS
  event.respondWith(
    caches.match(req).then(cached =>
      cached ||
      fetch(req).then(resp => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(req, resp.clone());
          return resp;
        });
      })
    )
  );
});