const CACHE_NAME = "djehouty";
const FILES_TO_CACHE = [
  "/",
  "/designer.html",
  "/style.css",
  //  libs
  "/libs/chart.js",
  "/libs/html2canvas.min.js",
  "/libs/jscolor.js",
  "/libs/jsstore.js",
  "/libs/jsstore.worker.js",
  "/libs/utils.js",
  "/libs/katex/katex.css",
  "/libs/katex/katex.min.js",
  "/libs/katex/katex_auto_render.js",
  // Fonts
  "/assets/fonts/Raleway-Black.ttf",
  "/assets/fonts/Raleway-Bold.ttf",
  "/assets/fonts/Raleway-Regular.ttf",
  // images
  "/assets/images/add_colone.svg",
  "/assets/images/add_ligne.svg",
  "/assets/images/add.svg",
  "/assets/images/afroSign.svg",
  "/assets/images/bw.svg",
  "/assets/images/conteneur.svg",
  "/assets/images/crop_1_1.svg",
  "/assets/images/crop_16_9.svg",
  "/assets/images/darken.svg",
  "/assets/images/delete_col.svg",
  "/assets/images/delete_new.svg",
  "/assets/images/delete.svg",
  "/assets/images/desc.svg",
  "/assets/images/djehouty_icon.svg",
  "/assets/images/duplicate.svg",
  "/assets/images/edit.svg",
  "/assets/images/export.svg",
  "/assets/images/flex.svg",
  "/assets/images/graph.svg",
  "/assets/images/grid.svg",
  "/assets/images/image.svg",
  "/assets/images/info.svg",
  "/assets/images/latex.svg",
  "/assets/images/load.svg",
  "/assets/images/love.svg",
  "/assets/images/mini_texte.svg",
  "/assets/images/new_projet.svg",
  "/assets/images/pattern.svg",
  "/assets/images/remove_white_bg.svg",
  "/assets/images/save.svg",
  "/assets/images/settings.svg",
  "/assets/images/sous_titre.svg",
  "/assets/images/tab.svg",
  "/assets/images/text.svg",
  "/assets/images/titre.svg",
  // Scripts
  "/scripts/chartEdit.js",
  "/scripts/conteneur_edit.js",
  "/scripts/create.js",
  "/scripts/db.js",
  "/scripts/edit.js",
  "/scripts/hide_btn_explains.js",
  "/scripts/image_edit.js",
  "/scripts/latex_edit.js",
  "/scripts/project.js",
  "/scripts/splash.js",
  "/scripts/tableau_edit.js",
  "/scripts/ui.js",
  // Models
  "/models/chart_D.js",
  "/models/conteneur.js",
  "/models/image.js",
  "/models/latex.js",
  "/models/mini_texte.js",
  "/models/sous_titre.js",
  "/models/tableau.js",
  "/models/texte.js",
  "/models/titre.js",

];

// sw.js

// Install event: cache all files initially
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate new service worker immediately
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim(); // take control of all pages immediately
});

// Fetch event: network-first strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Successful response – update cache
        const responseClone = response.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request);
      })
  );
});
