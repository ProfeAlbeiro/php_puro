const CACHE_NAME = "v6_cache_php_limpio";

const urlsToCache = [
  "/",  
  "/index.php",
  "/assets/landing/css/bootstrap.min.css",
  "/assets/landing/css/templatemo.css",
  "/assets/landing/js/bootstrap.bundle.min.js",
  "/assets/landing/js/custom.js",
  "/assets/landing/js/templatemo.js"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// ACTIVACIÓN
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  const req = event.request;

  // 🔥 Manejo especial: rutas dinámicas tipo ?c=Login
  const isPHPRoute = req.url.includes("?");

  // Si es navegación (clic en enlace / recarga / back button):
  if (req.mode === "navigate" || isPHPRoute) {
    event.respondWith(
      fetch(req)
        .then(resp => resp)
        .catch(() => caches.match("/index.php"))
    );
    return;
  }

  // Para archivos estáticos:
  event.respondWith(
    caches.match(req)
      .then(cached => cached || fetch(req).then(resp => {

        // Guardar en cache lo nuevo
        let respClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, respClone));

        return resp;
      }))
  );
});