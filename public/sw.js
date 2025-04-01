// Service Worker for offline functionality
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('itech-store-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/global/fonts.css',
        '/assets/css/global/variables.css',
        '/assets/css/global/reset.css',
        '/assets/css/global/utilities.css',
        '/assets/css/components/header.css',
        '/assets/css/components/lead-form.css',
        '/assets/css/components/hero.css',
        '/assets/css/components/about.css',
        '/assets/css/components/gallery.css',
        '/assets/css/components/testimonials.css',
        '/assets/css/components/cta.css',
        '/assets/css/components/footer.css',
        '/assets/js/global/lazy-load.js',
        '/assets/js/components/form-validation.js',
        '/assets/js/components/header.js',
        '/assets/js/components/hero.js',
        '/assets/js/components/gallery.js',
        '/assets/js/components/testimonials.js',
        '/assets/js/components/countdown.js',
        '/assets/js/main.js',
        '/assets/files/images/itech-store-logo.webp',
        '/assets/files/favicons/favicon.ico',
        '/assets/files/favicons/apple-touch-icon.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          // For images and other assets, store in cache
          if (
            event.request.url.includes('/assets/files/images/') ||
            event.request.url.includes('/assets/files/fonts/')
          ) {
            return caches.open('itech-store-assets').then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          }
          return fetchResponse;
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['itech-store-v1', 'itech-store-assets'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
