self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('stundenplan').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.min.css',
        '/main.js'
      ]);
      self.addEventListener('fetch', function(event) {

        console.log(event.request.url);

        event.respondWith(

          caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

          })

        );

      });
    })
  );
});
