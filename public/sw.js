// Service Worker for offline functionality and performance
const CACHE_NAME = "dodge-challenger-v1"
const ASSETS_CACHE = "dodge-challenger-assets-v1"

// Assets to cache immediately
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/assets/css/global/variables.css",
  "/assets/css/global/reset.css",
  "/assets/css/components/header.css",
  "/assets/css/components/lead-form.css",
  "/assets/css/components/hero.css",
  "/assets/js/performance-optimizations.js",
  "/assets/js/components/form-validation.js",
  "/assets/js/components/hero.js",
  "/assets/js/main.js",
  "/assets/files/images/challenger-side-mobile.webp",
  "/assets/files/images/challenger-side-thumb.webp",
  "/assets/files/images/logo-small.png",
]

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, ASSETS_CACHE]

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - network first for HTML, cache first for assets
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // Skip non-GET requests
  if (event.request.method !== "GET") return

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return

  // For HTML requests - network first, fallback to cache
  if (event.request.headers.get("accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseToCache = response.clone()

          // Update the cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }

            // If no cached HTML, return the offline page
            return caches.match("/index.html")
          })
        }),
    )
    return
  }

  // For image requests - cache first, network as fallback
  if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(event.request).then((response) => {
          // Clone the response
          const responseToCache = response.clone()

          // Cache the fetched image
          caches.open(ASSETS_CACHE).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      }),
    )
    return
  }

  // For CSS, JS, and other assets - stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response immediately
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update the cache
        caches.open(ASSETS_CACHE).then((cache) => {
          cache.put(event.request, networkResponse.clone())
        })

        return networkResponse
      })

      return cachedResponse || fetchPromise
    }),
  )
})

