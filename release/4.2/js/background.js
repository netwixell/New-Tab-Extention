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

!function(f,b,e,v,n,t,s){
if(f.fbq)return;
n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments);};
if(!f._fbq)f._fbq=n;
n.push=n;
n.loaded=!0;
n.version='2.0';
n.queue=[];
t=b.createElement(e);
t.async=!0;
t.src=v;
s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s);
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','260536824745880');
fbq('track','PageView');