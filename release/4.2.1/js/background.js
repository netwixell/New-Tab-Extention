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
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window['GoogleAnalyticsObject'] = 'ga';
window['ga'] = window['ga'] || function() {
(window['ga'].q = window['ga'].q || []).push(arguments)
};
gtag('js',new Date());
gtag('config','UA-39942370-3');
gtag('set',{'user_id':'USER_ID'});
ga('set','userId','USER_ID');

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','260536824745880');
fbq('track','PageView');
