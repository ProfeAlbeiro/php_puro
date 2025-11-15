const CACHE_NAME = "app-cache-v1";

const urlsToCache = [
  "/", // home
  "/offline.html",

  // CSS
  "/assets/landing/css/bootstrap.min.css",
  "/assets/landing/css/templatemo.css",

  // JS
  "/assets/landing/js/bootstrap.bundle.min.js",
  "/assets/landing/js/templatemo.js",
  "/assets/landing/js/custom.js",

  // IMAGES
  "/assets/landing/img/banner_img_01.jpg",
  "/assets/landing/img/banner_img_02.jpg",
  "/assets/landing/img/banner_img_03.jpg",
  "/assets/landing/img/category_img_01.jpg",
  "/assets/landing/img/category_img_02.jpg",
  "/assets/landing/img/category_img_03.jpg",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // --- 1. NAVIGATION FALLBACK ---
  // Si el usuario visita ?c=Login o cualquier ruta PHP
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // --- 2. CACHE-FIRST PARA ARCHIVOS ESTÁTICOS ---
  event.respondWith(
    caches.match(req).then(cacheRes => {
      return cacheRes || fetch(req);
    })
  );
});