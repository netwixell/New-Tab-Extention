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
(function(w,d,s,l,i){
	w[l]=w[l]||[];
	w[l].push({
		'gtm.start':new Date().getTime(),
		event:'gtm.js'
	});
	var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),
		dl=l!='dataLayer'?'&l='+l:'';
	j.async=true;
	j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
	f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3MV5HH');

window.dataLayer=window.dataLayer||[];
function gtag(){
	dataLayer.push(arguments);
}
gtag('js',new Date());
gtag('config','UA-140200224-1');