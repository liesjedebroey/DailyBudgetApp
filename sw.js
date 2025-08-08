const CACHE_NAME = 'budgetapp-cache-v1';
const urlsToCache = [
  '.',
  'budget.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Installatie - cache statische bestanden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activeren - oude caches verwijderen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch requests afhandelen: eerst cache, dan netwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
