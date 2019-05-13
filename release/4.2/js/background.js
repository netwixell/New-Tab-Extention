chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId,function(tab){
		if(tab.extData==''){
			console.log('New Tab');
			/*chrome.tabs.update(tab.id,{
				url:chrome.extension.getURL('html/newpage.html')
			},function(){});*/
			return;
		}
		var asdasd=JSON.parse(tab.extData);
		if(asdasd.urlForThumbnail=='chrome://newtab/'){
			console.log('Extend Tab', tab);

			// не грузить проверить подгрузилось ли
			/* .update(tab.id,{
				url:chrome.extension.getURL('html/newpage.html')
			},function(){});*/
		}
	});
});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-39942370-3', 'auto');
ga('set', 'checkProtocolTask', function(){});
ga('require', 'displayfeatures');
ga('send', 'pageview', '/xtn-chrome/background');
ga('send', 'event', 'xtn-chrome', 'launch');