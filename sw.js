const CACHE_VERSION = "v15_full_offline";
const CACHE_NAME = `cache_${CACHE_VERSION}`;

// FALLBACK para imágenes
const FALLBACK_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zwAAAgMBgWHiYwAAAABJRU5ErkJggg==";

// INSTALL: precache del shell mínimo
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "/",
        "/index.php",
        "/manifest.json",
        "/assets/landing/css/bootstrap.min.css",
        "/assets/landing/css/templatemo.css",
        "/assets/landing/js/bootstrap.bundle.min.js",
        "/assets/landing/js/templatemo.js",
        "/assets/landing/js/custom.js",
      ])
    )
  );
  self.skipWaiting();
});

// ACTIVATE: limpiar versiones viejas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((n) => n !== CACHE_NAME && caches.delete(n)))
    )
  );
  self.clients.claim();
});

// FUNCIÓN: guardar respuesta válida en caché
async function cacheResponse(request, response) {
  if (!response || !response.ok) return response;
  const clone = response.clone();
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, clone);
  return response;
}

// FETCH: modo offline total
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 🔥 1. Navegación HTML o rutas dinámicas `?c=Algo`
  if (req.mode === "navigate" || req.url.includes("?c=")) {
    event.respondWith(
      fetch(req)
        .then((resp) => cacheResponse(req, resp))
        .catch(() => caches.match(req).then((c) => c || caches.match("/index.php")))
    );
    return;
  }

  const url = new URL(req.url);

  // 🔥 2. CACHE FIRST para todos los assets `/assets/...`
  if (url.pathname.startsWith("/assets")) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;

        return fetch(req)
          .then((resp) => cacheResponse(req, resp))
          .catch(() => {
            if (req.destination === "image") {
              return new Response(
                atob(FALLBACK_IMAGE.split(",")[1]),
                { headers: { "Content-Type": "image/png" } }
              );
            }
            return new Response(""); // fuente/CSS fallback
          });
      })
    );
    return;
  }

  // 🔥 3. DEFAULT: network first + cache fallback
  event.respondWith(
    fetch(req)
      .then((resp) => cacheResponse(req, resp))
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;

          if (req.destination === "image")
            return new Response(
              atob(FALLBACK_IMAGE.split(",")[1]),
              { headers: { "Content-Type": "image/png" } }
            );

          return new Response("");
        })
      )
  );
});