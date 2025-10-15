const CACHE = 'spin-group-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=> k!==CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e)=>{
  const { request } = e;
  if(request.method !== 'GET') return;
  e.respondWith(
    caches.match(request).then(cached=>{
      return cached || fetch(request).then(resp=>{
        // Optional: runtime cache
        return resp;
      }).catch(()=> caches.match('./index.html'));
    })
  );
});
