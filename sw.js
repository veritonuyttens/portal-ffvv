// Solo guarda la pantalla de inicio de la app (ícono y página de apertura).
// Los datos del portal NUNCA se guardan en el celular.
const CACHE = 'portal-ffvv-v1';
const ARCHIVOS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // el portal va siempre directo a Google
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
