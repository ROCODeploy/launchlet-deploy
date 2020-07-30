const cacheName = 'OLSKServiceWorkerCache-1596114464720';

		self.addEventListener('activate', function (event) {
			console.log('activate', event);
			
			event.waitUntil(async function() {
				await Promise.all(
					(await caches.keys()).map(function (e) {
						return caches.delete(e);
					})
				);
			}());
		});

		self.addEventListener('fetch', function (event) {
			if (event.request.method !== 'GET') {
				return console.log('ignoring non-Get', event.request);
			}

			if (event.request.url.match('sw.js')) {
				return console.log('ignoring sw.js', event.request);
			}

			if (event.request.mode === 'cors') {
				return console.log('ignoring cors', event.request);
			}

			if (!(event.request.referrer.match(/\/compose/) && event.request.mode === 'no-cors') && !event.request.url.match(/\/compose/)) {
				return console.log('ignoring referrer', event.request);
			};

			event.respondWith(async function() {
				let cacheResponse = await caches.match(event.request);

				if (cacheResponse) {
					return cacheResponse;
				}

				let networkResponse = await fetch(event.request);

				if (networkResponse.status !== 200) {
					return networkResponse;
				}

				(await caches.open(cacheName)).put(event.request, networkResponse.clone());

				return networkResponse;
			}());
		});

		self.addEventListener('message', function (event) {
			console.log('message', event);

		  if (event.data.action === 'skipWaiting') {
		    self.skipWaiting();
		  }
		});
	
