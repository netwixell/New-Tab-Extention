self.addEventListener('install',function(event){
	event.waitUntil(caches.open('my-site-cache-v1').then(function(cache){
		return cache.addAll([
			'/templater/popUpId.tpl',
			'/templater/bodyId.tpl',
			'/templater/topNavLog.tpl',
			'/templater/topNav.tpl',
			'/templater/bodyFailedAuth.tpl',
			'/templater/registration.tpl',
			'/templater/login.tpl',
			'/templater/syncToServ.tpl',
			'/templater/syncToPc.tpl',
			'/templater/emptySearch.tpl',
			'/templater/updateButton.tpl',
			'/templater/notification.tpl'
		]);
	}));
});
self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response){
		if (response)
			return response;
		return fetch(event.request);
	}));
});