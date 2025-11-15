const CACHE_NAME = "v9_php_limpio_cache";

// Cache obligatorio para el shell
const CORE_ASSETS = [
  "/",
  "/index.php",
  "/assets/landing/css/bootstrap.min.css",
  "/assets/landing/css/templatemo.css",
  "/assets/landing/js/bootstrap.bundle.min.js",
  "/assets/landing/js/custom.js",
  "/assets/landing/js/templatemo.js",
];

// Placeholder si un archivo no existe offline
const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAABl0RVh0Q3JlYXRpb24gVGltZQAwNC8yMy8yNI7ki38AAACBSURBVHic7cExAQAAAMKg9U9tCF8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4G1kAAZlmAuUAAAAASUVORK5CYII=";

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 🔥 1. Navegación → fallback index.php
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.php"))
    );
    return;
  }

  // 🔥 2. Rutas PHP tipo ?c=Login
  if (req.url.includes("?")) {
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.php"))
    );
    return;
  }

  // 🔥 3. Archivos estáticos (CSS, JS, IMG, FONTS)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((resp) => {
          // Guardar en cache sólo si es un archivo válido
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return resp;
        })
        .catch(() => {
          // 🔥 Fallback para imágenes
          if (req.destination === "image") {
            return new Response(
              atob(PLACEHOLDER_IMAGE.split(",")[1]),
              {
                headers: { "Content-Type": "image/png" },
              }
            );
          }

          // 🔥 Fallback para fuentes → nada (pero no error)
          if (req.destination === "font") {
            return new Response("", {
              headers: { "Content-Type": "application/font-woff2" },
            });
          }

          // 🔥 Fallback general
          return new Response("");
        });
    })
  );
});