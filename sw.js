const CACHE_NAME = 'dct-v13';
const ASSETS = [
  '/diamond-copper-liff/',
  '/diamond-copper-liff/index.html',
  '/diamond-copper-liff/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.url.includes('anthropic') ||
     e.request.url.includes('make.com') ||
     e.request.url.includes('workers.dev') ||
     e.request.url.includes('googleapis')) return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
