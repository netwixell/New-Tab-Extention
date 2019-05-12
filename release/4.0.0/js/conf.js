;'use strict';
var config={
	blankId:'#blank',
	bodyId:'#wrap',
	holder:'#holder',
	popUpId:'#window-popup',
	topNav:'#top-nav',
	controlId:'#control-panel',
	confirmId:'#window-confirm',
	windowMessage:'#window-message',
	domain:'http://f0287734.xsph.ru',
	html:{
		
		errorFavicon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEVHcExtdrBfaqmBiLpha6lSXaF5grZDT5lOWZ5eaahzfLNsda96grdye7J7g7euuNX////FzeK8xd3w8/rY3u3k6PSYpMj8/f+inH0FAAAAD3RSTlMAiOLs8f1RHwnWvYjsvVByJ79pAAAAkUlEQVQY02WPVxLDIAxEbdNMcVQQcP+bRsBkJpPs3z6VlY7jX3fwyTpnkw/39mc0vXcy8VwknFcHrg0bXzko8JFA1XAwR68gmTFBxQpSHgWW6vI4BMgqcIIs6hEZxE3QsPI3sKTdRNQQ6xpJRotzjRbWUo3dAAatWD1MiQAI7cPukGMh7r3E/HnGP/O557X9j94tfwnWf6UiBQAAAABJRU5ErkJggg==',
		closeIcon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAACpJREFUCNdjcOBgeCDDUGDBYFHAIPOAgf8AA3sDCAEZQC5QECgFVODAAQDM9AnNrYQqKQAAAABJRU5ErkJggg==',
		editName:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEygoKA+g8YwAAAAAXRSTlMAQObYZgAAADJJREFUCNdjYBBgYJBgYMhhYPjAwFjAwLyAgf0AA38DgzwDgx0DQw0DwwwGhgkMDA8YAH25BtC8Un8pAAAAAElFTkSuQmCC',
		openAll:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAHlBMVEX///////////////9HcEz///////////////////8nJIQvAAAACnRSTlPVwj2pAIp0WOYk2dH38QAAAGpJREFUCNdjcAEC5YYUBiDlLsHQBqILWdUZgLRncqYTB5BWC1WZ2szg4m7QkJQgxOBSyGgcyljC4C4Qaiwg7sKgyKrGwVziwmAR6RSa5OLC0KAyzWwKkGYoChAHmsWQwdBYAqLdOIxAVgEAjNkZb4egJwEAAAAASUVORK5CYII=',
		addLink:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEyzs7PFsttVAAAAAXRSTlMAQObYZgAAABNJREFUCNdjYG9gQEb//yAQqhQAEvwNM4vx7d0AAAAASUVORK5CYII=',
		errorFaviconDark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEVHcExtdrBfaqmBiLpha6lSXaF5grZDT5lOWZ5eaahzfLNsda96grdye7J7g7euuNX////FzeK8xd3w8/rY3u3k6PSYpMj8/f+inH0FAAAAD3RSTlMAiOLs8f1RHwnWvYjsvVByJ79pAAAAkUlEQVQY02WPVxLDIAxEbdNMcVQQcP+bRsBkJpPs3z6VlY7jX3fwyTpnkw/39mc0vXcy8VwknFcHrg0bXzko8JFA1XAwR68gmTFBxQpSHgWW6vI4BMgqcIIs6hEZxE3QsPI3sKTdRNQQ6xpJRotzjRbWUo3dAAatWD1MiQAI7cPukGMh7r3E/HnGP/O557X9j94tfwnWf6UiBQAAAABJRU5ErkJggg==',
		closeIconDark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAACpJREFUCNdjcOBgeCDDUGDBYFHAIPOAgf8AA3sDCAEZQC5QECgFVODAAQDM9AnNrYQqKQAAAABJRU5ErkJggg==',
		editNameDark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTP///5+UokMAAAABdFJOUwBA5thmAAAAMklEQVQI12NgEGBgkGBgyGFg+MDAWMDAvICB/QADfwODPAODHQNDDQPDDAaGCQwMDxgAfbkG0LxSfykAAAAASUVORK5CYII=',
		openAllDark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAHlBMVEX///////////////9HcEz///////////////////8nJIQvAAAACnRSTlPVwj2pAIp0WOYk2dH38QAAAGpJREFUCNdjcAEC5YYUBiDlLsHQBqILWdUZgLRncqYTB5BWC1WZ2szg4m7QkJQgxOBSyGgcyljC4C4Qaiwg7sKgyKrGwVziwmAR6RSa5OLC0KAyzWwKkGYoChAHmsWQwdBYAqLdOIxAVgEAjNkZb4egJwEAAAAASUVORK5CYII=',
		addLinkDark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTP///5+UokMAAAABdFJOUwBA5thmAAAAE0lEQVQI12Ngb2BARv//IBCqFAAS/A0zi/Ht3QAAAABJRU5ErkJggg==',
	},
	templaters:{
		popUpId:'popUpId.tpl',
		bodyId:'bodyId.tpl',
		topNavLog:'topNavLog.tpl',
		topNav:'topNav.tpl',
		bodyFailedAuth:'bodyFailedAuth.tpl',
		registration:'registration.tpl',
		login:'login.tpl',
		syncToServ:'syncToServ.tpl',
		syncToPc:'syncToPc.tpl',
		emptySearch:'emptySearch.tpl',
		updateButton:'updateButton.tpl',
		notification:'notification.tpl'
	}
};
for(var key in config.templaters){
	(function(key,value){
		var stor;
		if(chrome.storage){
			chrome.storage.sync.get([key],function(res){
				if(res[key]==undefined)
					fetch('templater/'+value,{
						cache:'force-cache'
					}).then(function(response){
						return response.text();
					}).then(function(response){
						var obj={};
						obj[key]=response;
						chrome.storage.sync.set(obj);
						config.html[key]=response;
					});
				else
					chrome.storage.sync.get([key],function(res){
						config.html[key]=res[key];
					});
			});
		}else{
			if(localStorage[value]==undefined)
				fetch('templater/'+value,{
					cache:'force-cache'
				}).then(function(response){
					return response.text();
				}).then(function(response){
					localStorage[value]=response;
					config.html[key]=response;
				});
			else
				config.html[key]=localStorage[value];
		}
	})(key,config.templaters[key]);
}