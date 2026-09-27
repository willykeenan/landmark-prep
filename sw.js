/* Offline cache for NY Real Estate Prep. Bump VERSION when files change. */
var VERSION = "nyre-v1";
var FILES = [
  "./", "index.html", "styles.css", "app.js", "manifest.webmanifest",
  "data/units-a.js", "data/units-b.js", "data/units-c.js",
  "data/questions-a.js", "data/questions-b.js", "data/questions-c.js",
  "data/glossary.js", "data/roadmap.js", "data/math.js", "data/exam-plan.js"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // Network first so updates arrive; fall back to cache offline.
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone();
    caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
    return res;
  }).catch(function () { return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); }); }));
});
