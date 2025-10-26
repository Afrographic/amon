const CACHE_NAME = "djehouty";
const FILES_TO_CACHE  = [
    "/",
    "/index.html",
    "/assets/fonts/Raleway-Black.ttf",
    "/assets/fonts/Raleway-Bold.ttf",
    "/assets/fonts/Raleway-Regular.ttf",
]

// sw.js


// Install event: cache all files initially
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate new service worker immediately
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of all pages immediately
});

// Fetch event: network-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Successful response – update cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request);
      })
  );
});