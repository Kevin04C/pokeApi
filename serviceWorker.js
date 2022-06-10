const CACHE_NAME = "pokeApi-v1";
const assets = [
  "./index.html",
  "./css/main.css",
  "./app.js",
  "./assets/icon.png",
  "./assets/loader.svg",
  "./assets/pokeball.png",
  "./assets/icon_144.png"
]

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assets)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log("ERROR AL REGISTAR CACHE", err))
  );
})

self.addEventListener("active", e => {
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME
          }).map(cacheName => {
            return caches.delete(cacheName)
          })
        )
      })
  );
})

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        return res || fetch(e.request)
      })
  )
})