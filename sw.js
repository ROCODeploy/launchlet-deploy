const mod = (function OLSKServiceWorkerModule (param1, param2, param3, param4) {
		if (typeof param1 !== 'object' || param1 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param1.addEventListener !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'object' || param2 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2.keys !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param3 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const mod = {

			// VALUE

			_ValueSelf: param1,
			_ValueCaches: param2,
			_ValueFetch: param3,

			// DATA

			_DataVersionCacheName: 'OLSKServiceWorkerVersionCache-1603555720962',
			_DataPersistenceCacheName: 'OLSKServiceWorkerPersistenceCache',
			_DataOriginPage: '/compose',

			// CONTROL

			async ControlClearCache () {
				return Promise.all(
					(await mod._ValueCaches.keys()).filter(function (e) {
						return e !== mod._DataPersistenceCacheName;
					}).map(function (e) {
						return mod._ValueCaches.delete(e);
					})
				);
			},

			// MESSAGE

			OLSKServiceWorkerDidActivate (event) {
				event.waitUntil(mod.ControlClearCache());
			},

			async OLSKServiceWorkerDidFetch (event) {
				if (event.request.method !== 'GET') {
					return;
				}

				if (event.request.url.match('sw.js')) {
					return;
				}

				if (event.request.mode === 'cors' && !event.request.url.match(/^https\:\/\/rosano\.ca\/api/)) {
					return;
				}

				if (event.request.mode === 'navigate' && !event.request.url.includes(mod._DataOriginPage)) {
					return;
				}

				if (event.request.mode !== 'navigate' && !event.request.referrer.includes(mod._DataOriginPage)) {
					return;
				}

				// if (!(event.request.referrer.match(//compose/) && event.request.mode === 'no-cors') && !event.request.url.match(//compose/)) {
				// 	return console.log('ignoring referrer', event.request);
				// };

				return event.respondWith(async function() {
					let cacheResponse = await mod._ValueCaches.match(event.request);

					if (cacheResponse) {
						return cacheResponse;
					}

					let networkResponse = param4 ? await fetch(event.request) : await mod._ValueFetch(event.request);

					if (networkResponse.status === 200) {
						(await mod._ValueCaches.open(event.request.url.match(/^https\:\/\/rosano\.ca\/api/) ? mod._DataPersistenceCacheName : mod._DataVersionCacheName)).put(event.request, networkResponse.clone());
					}

					return networkResponse;
				}());
			},

			OLSKServiceWorkerDidReceiveMessage (event) {
				if (event.data.action === 'skipWaiting') {
				  return mod._ValueSelf.skipWaiting();
				}

				if (event.data === 'OLSKServiceWorkerClearVersionCacheMessage') {
				  return mod.ControlClearCache();
				}
			},
		
		};
		
		return mod;
	})(self, caches, fetch, true);

(function OLSKServiceWorkerInitialization (param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param1.addEventListener !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'object' || param2 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2.OLSKServiceWorkerDidReceiveMessage !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		param1.addEventListener('activate', param2.OLSKServiceWorkerDidActivate);
		param1.addEventListener('fetch', param2.OLSKServiceWorkerDidFetch);
		param1.addEventListener('message', param2.OLSKServiceWorkerDidReceiveMessage);
	})(self, mod);
