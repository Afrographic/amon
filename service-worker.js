const CACHE_NAME = "amon";
const ASSETS_TO_CACHE  = [
    "/",
    '/index.html',
    '/manifest.json',
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/images/add.svg",
    "/images/afro_svg.svg",
    "/images/amon.svg",
    "/images/close.svg",
    "/images/edit.svg",
    "/images/empty.svg",
    "/images/error_msg.svg",
    "/images/export.svg",
    "/images/facture.svg",
    "/images/history_vente.svg",
    "/images/import.svg",
    "/images/menu.svg",
    "/images/option.svg",
    "/images/reset.svg",
    "/images/search.svg",
    "/images/settings.svg",
    "/images/startup.svg",
    "/images/stock.svg",
    "/images/vente.svg",

    "/libs/afro.js",
    "/libs/chart.js",
    "/libs/jsstore.js",
    "/libs/jsstore.worker.js",

    "/scripts/bienvenue.js",
    "/scripts/history.js",
    "/scripts/mobileMenu.js",
    "/scripts/productStock.js",
    "/scripts/productVente.js",
    "/scripts/startUp.js",
    "/scripts/stat.js",
    "/scripts/totalMoneyToEarn.js",

    "/styles/ankh_notif.css",
    "/styles/buttons.css",
    "/styles/responsive.css",
    "/styles/style.css",

    // Kamto Assets

    "/modules/facture/kamto.html",
    "/modules/facture/assets/images/add_1.svg",
    "/modules/facture/assets/images/add.svg",
    "/modules/facture/assets/images/articles.svg",
    "/modules/facture/assets/images/clients.svg",
    "/modules/facture/assets/images/close.svg",
    "/modules/facture/assets/images/delete.svg",
    "/modules/facture/assets/images/edit.svg",
    "/modules/facture/assets/images/email.svg",
    "/modules/facture/assets/images/empty.svg",
    "/modules/facture/assets/images/error_msg.svg",
    "/modules/facture/assets/images/history.svg",
    "/modules/facture/assets/images/img.svg",
    "/modules/facture/assets/images/invoice_white.svg",
    "/modules/facture/assets/images/invoice.svg",
    "/modules/facture/assets/images/kamto.svg",
    "/modules/facture/assets/images/kamto.png",
    "/modules/facture/assets/images/location.svg",
    "/modules/facture/assets/images/logo_symbol.svg",
    "/modules/facture/assets/images/logo.svg",
    "/modules/facture/assets/images/menu.svg",
    "/modules/facture/assets/images/phone.svg",
    "/modules/facture/assets/images/settings.svg",
    "/modules/facture/assets/images/tempLogo.svg",

    "/modules/facture/assets/libs/chart.js",
    "/modules/facture/assets/libs/html2canvas.min.js",
    "/modules/facture/assets/libs/jspdf.umd.min.js",
    "/modules/facture/assets/libs/jsstore.js",
    "/modules/facture/assets/libs/jsstore.worker.js",

    "/modules/facture/scripts/articles.js",
    "/modules/facture/scripts/clients.js",
    "/modules/facture/scripts/color.js",
    "/modules/facture/scripts/factures.js",
    "/modules/facture/scripts/mobile.js",
    "/modules/facture/scripts/note.js",
    "/modules/facture/scripts/startUp.js",
    "/modules/facture/scripts/utils.js",

    "/modules/facture/styles/ankh_notif.css",
    "/modules/facture/styles/buttons.css",
    "/modules/facture/styles/responsive.css",
    "/modules/facture/styles/style.css",

]

// sw.js


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});


self.addEventListener('fetch', event => {
  // Handle top-level navigation requests (like clicking <a href>)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // If cached, return it
        return cachedResponse || fetch(event.request).catch(() => caches.match('/index.html'));
      })
    );
    return;
  }

  // For other requests (CSS, JS, images), do cache-first
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});





