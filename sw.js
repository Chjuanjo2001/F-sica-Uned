/* ==========================================================================
   Service worker — permite estudiar sin conexión (metro, avión, biblioteca)
   Estrategia: "stale-while-revalidate" para todo lo propio de la app.
   ========================================================================== */

const VERSION = "fisica-uned-v1";
const ESENCIALES = [
  "./", "./index.html", "./asignatura.html", "./repaso.html", "./perfil.html",
  "./login.html", "./admin.html", "./tema-am1-01-preliminares.html",
  "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(ESENCIALES).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (evento) => {
  const url = new URL(evento.request.url);

  // Solo gestionamos peticiones GET del propio origen; Supabase y fuentes van directas.
  if (evento.request.method !== "GET" || url.origin !== self.location.origin) return;

  evento.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cacheada = await cache.match(evento.request);
      const red = fetch(evento.request)
        .then((respuesta) => {
          if (respuesta && respuesta.status === 200) cache.put(evento.request, respuesta.clone());
          return respuesta;
        })
        .catch(() => cacheada);
      return cacheada || red;
    })
  );
});
