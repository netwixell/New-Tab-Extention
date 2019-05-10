self.addEventListener('install',function(event){
	event.waitUntil(caches.open('my-site-cache-v1').then(function(cache){
		return cache.addAll([
			'/html/templater/popUpId.tpl',
			'/html/templater/bodyId.tpl',
			'/html/templater/topNavLog.tpl',
			'/html/templater/topNav.tpl',
			'/html/templater/bodyFailedAuth.tpl',
			'/html/templater/registration.tpl',
			'/html/templater/login.tpl',
			'/html/templater/syncToServ.tpl',
			'/html/templater/syncToPc.tpl',
			'/html/templater/emptySearch.tpl',
			'/html/templater/updateButton.tpl',
			'/html/templater/notification.tpl'
		]);
	}));
});