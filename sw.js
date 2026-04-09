const CACHE_NAME = 'dct-v61';
const urlsToCache = [
  '/diamond-copper-liff/',
  '/diamond-copper-liff/index.html',
  '/diamond-copper-liff/manifest.json',
  '/diamond-copper-liff/icon-192.png',
  '/diamond-copper-liff/icon-512.png'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      if(res && res.status === 200 && e.request.method === 'GET'){
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
