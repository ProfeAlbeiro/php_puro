const CACHE_NAME = "v7_cache_php_limpio";

const urlsToCache = [
  "/",
  "/index.php",
  "/assets/landing/css/bootstrap.min.css",
  "/assets/landing/css/templatemo.css",
  "/assets/landing/js/bootstrap.bundle.min.js",
  "/assets/landing/js/custom.js",
  "/assets/landing/js/templatemo.js"
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
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {

  // 🔥 1. Si es navegación, siempre devolver index.php cuando falle
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => caches.match("/index.php"))
    );
    return;
  }

  // 🔥 2. Rutas PHP como ?c=Login
  if (event.request.url.includes("?")) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match("/index.php"))
    );
    return;
  }

  // 🔥 3. Estáticos
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(resp => {

        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));

        return resp;
      }).catch(() => { /* sin fallback */ }))
  );
});