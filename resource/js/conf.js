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
		editName:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTP///5+UokMAAAABdFJOUwBA5thmAAAAMklEQVQI12NgEGBgkGBgyGFg+MDAWMDAvICB/QADfwODPAODHQNDDQPDDAaGCQwMDxgAfbkG0LxSfykAAAAASUVORK5CYII=',
		openAll:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAHlBMVEX///////////////9HcEz///////////////////8nJIQvAAAACnRSTlPVwj2pAIp0WOYk2dH38QAAAGpJREFUCNdjcAEC5YYUBiDlLsHQBqILWdUZgLRncqYTB5BWC1WZ2szg4m7QkJQgxOBSyGgcyljC4C4Qaiwg7sKgyKrGwVziwmAR6RSa5OLC0KAyzWwKkGYoChAHmsWQwdBYAqLdOIxAVgEAjNkZb4egJwEAAAAASUVORK5CYII=',
		addLink:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTP///5+UokMAAAABdFJOUwBA5thmAAAAE0lEQVQI12Ngb2BARv//IBCqFAAS/A0zi/Ht3QAAAABJRU5ErkJggg==',
		topNav:'<form autocomplete=""><input name="login" type="text" placeholder="Input login" tabindex="1" maxlength="255" autocomplete="off" autofocus><input name="password" type="password" placeholder="Input password" tabindex="2" autocomplete="off" maxlength="255"><input name="submit" type="submit" value="Submit" tabindex="3"><input name="acept" type="checkbox"></form><b>or</b><span class="social"><input class="fb" name="fb" type="button" value="fb" title="Login with Facebook"><input class="go" name="go" type="button" value="go" title="Login with google"></span><hr><a href="https://chrome.google.com/webstore/detail/ffmnhagkabopbjedijdbhhaabdnibpji" style="margin:10px;" title="Download extension in Google Store"><img alt="Download extension in Google Store" height="43" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAtCAMAAADWf7iKAAAAulBMVEVHcEzg2Nebm5ubm5sXmlr1xz/k5ORDg+va2tqCgoLOzs7h4eGPserr3r3FzMHk5OTj4+Ph4eH1x0HdTkHdSz7/zkPx8fHl5eXv7+/k5OQYoV9IifTVTUFGiPTq6en9zVDlz83YXVHggnnu3tzfamF+qvPa4/Lfm5by69j147JGh/TnrKf71nP335tRj/SWz7MhoGDL3eWevvOqZEpjmfSDdlG02sc0lFpfu49mf1PxwpdIjFYqp2pVt4eK7P/rAAAAE3RSTlMA/AWu09PO07uTaknT0tKmOy/TlwVxGwAAAeFJREFUSMfV0tlymzAUBmCRhTZ7UhxZEquEMZtD8JI4mbbv/1qVWMwRchsmF53JP1zy8R8dgeafCPpyiNrfQWw6BdHLEwRzSScgWzfoxP4Y0TFC9pTxrnRzNWE8Sq3TC5BTa8qZqJHPoGmX+wH5iv/e/0XUimQsOhVRGqWCc0+Gc5FG5mVTA0XpwtPCTTdCVso9I1xYIxTAlEdIw0rtNUSGBMIBmTkzEBGAFwGKF84oUC1i+dXuQf808vF6xWOz6S9GxRu6mqoeYf08ndHmkyoggdZUHu/xNJW2++rRemusYFSj4kTamd723tgc2eBMgDPh15q9aJOJMoqzLF+Fo+Sg6Y2x2htuVcS4S7Z61LIaEK0ZY++HmhLj5SbZ7ZLNEuM8hCjM1HwNepaG1dv2ANKQTeU2qTYE51rV06HpN1NVPz25MccRmCRuF79ICH4y5lNo/os1eWn/FnwwrlsUCQ7ggGG/vXVr2F5dZYrXg/F9113rVVmHXjvE3tX9gSJfJcEZRHmL8HOP6u2MB6SCxC8qQkITkQOSu1iQZQWNHHBJVqP1oQAitpVII35hogDZGtrzpskfjEKhjmx0Px8WodYekx0kRbHDmX6m+T1CD3e3ZyC39vU3Ldf2zY/zITd3D+gPwDnV0gcjqPcAAAAASUVORK5CYII="></a>',
		topNavLog:'<div class="top"><div class="left"><div class="logo-block"><a title="Reload"><div class="logo"></div></a></div><div class="search-block"><input type="text" name="search" placeholder="Enter search string" autocomplete="off" tabindex="1" autofocus><img class="cancel" title="Clear search input" height="10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAACpJREFUCNdjcOBgeCDDUGDBYFHAIPOAgf8AA3sDCAEZQC5QECgFVODAAQDM9AnNrYQqKQAAAABJRU5ErkJggg=="></div></div><div class="right"><div class="details"><div class="summary material-icons gear" title="Option"><img title="Menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMAQMAAABYwg+4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTNzc3LlRXOkAAAABdFJOUwBA5thmAAAAGUlEQVQI12NgAIL0/w/AGAbS/0Mwgg+XBwAciQvlLNXN5AAAAABJRU5ErkJggg==" style="margin:4px;"></div><div class="menu"><div><label for="colum-min-width">Minimum width of columns:&nbsp;</label><input id="colum-min-width" id="colum-min-width" class="colum-min-width" type="number" min="1"></div><div><label for="count-colum">Count of columns:&nbsp;</label><input id="count-colum" id="count-colum" class="count-colum" type="number" min="1"></div><div><label for="searchservice">Search engine:&nbsp;</label><select id="searchservice" id="searchservice" class="searchservice" name="searchservice" tabindex="-1"><option value="https://www.google.com/search?q=">Google</option><option value="https://yandex.ua/search/?text=">Yandex</option><option value="https://www.bing.com/search?q=">Bing</option><option value="https://www.baidu.com/s?wd=">Baidu</option><option value="https://search.yahoo.com/search?p=">Yahoo</option><option value="https://go.mail.ru/search?q=">MailRu</option><option value="https://duckduckgo.com/?q=">DuckDuckGo</option></select></div><div><label for="change-flow">Follow cursor:&nbsp;</label><input id="change-flow" id="change-flow" class="change-flow" type="checkbox" title="Follow cursor"></div><div><label for="open-new-tab">Open new tab:&nbsp;</label><input id="open-new-tab" id="open-new-tab" class="open-new-tab" type="checkbox" title="Follow cursor"></div><div><label for="add-category">Add category:&nbsp;</label><input id="add-category" id="add-category" class="add-category" type="button" value="+" title="Add category"></div><div><label for="loginout">Loginout:&nbsp;</label><input id="loginout" id="loginout" class="loginout" type="button" value=">" title="Loginout"></div></div></div></div></div><div class="delete"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMAQMAAACOZ9XdAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAABhJREFUCNdjqD/A0KDA8P8Bg1YDdmTfAADDmgnOsQukNgAAAABJRU5ErkJggg==">&nbsp;Move here to remove.</div>',
		bodyId:'<div style="margin:10px;"><p><b>Error</b></p><br><p>Something went wrong please refresh the page.</p></div>',
		popUpId:'<div class="wrap-form"><div class="form"><input type="text" placeholder="Input name category"></div><div class="color"><input name="color" type="radio" id="def" val="def" checked><label for="def" style="background:rgb(128,128,128);"></label><input name="color" type="radio" id="red" val="red"><label for="red" style="background:rgb(224,65,46);"></label><input name="color" type="radio" id="blue" val="blue"><label for="blue" style="background:rgb(80,134,247);"></label><input name="color" type="radio" id="green" val="green"><label for="green" style="background:rgb(72,168,79);"></label><input name="color" type="radio" id="white" val="white"><label for="white" style="background:white;"></label><input name="color" type="radio" id="black" val="black"><label for="black" style="background:black;"></label><input name="color" type="radio" id="yellow" val="yellow"><label for="yellow" style="background:rgb(245,187,0);"></label><input name="color" type="radio" id="aqua" val="aqua"><label for="aqua" style="background:rgb(255,174,201);"></label><input name="color" type="radio" id="blueviolet" val="blueviolet"><label for="blueviolet" style="background:rgb(163,73,164);"></label><input name="color" type="radio" id="brown" val="brown"><label for="brown" style="background:brown;"></label></div></div>'
	}
};