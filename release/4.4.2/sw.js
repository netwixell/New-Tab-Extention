var config={
	mc:[
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
		'/templater/notification.tpl',
		'/js/library.js',
		'/js/script.js',
		'/js/sevice.js',
		'/css/style.css'
	],
	version:'v2',
	maxAge:20000
};
self.addEventListener('install',function(event){
	event.waitUntil(caches.open(config.version).then(function(cache){
		return cache.addAll(config.mc);
	}));
});
self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(cachedResponse){
		var lastModified,fetchRequest;
		if (cachedResponse){
			lastModified=new Date(cachedResponse.headers.get('last-modified'));
			if(lastModified&&(Date.now()-lastModified.getTime())>config.maxAge){
				fetchRequest=event.request.clone();
				return fetch(fetchRequest).then(function(response){
					if(!response||response.status!==200)
						return cachedResponse;
					caches.open(config.version).then(function(cache){
						cache.put(event.request,response.clone());
					});
					return response;
				}).catch(function(){
					return cachedResponse;
				});
			}
			return cachedResponse;
		}
		return fetch(event.request);
	}));
});