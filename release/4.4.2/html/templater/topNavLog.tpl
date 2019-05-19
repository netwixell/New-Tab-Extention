<div class="top">
	<div class="left">
		<div class="logo-block">
			<a title="Reload" tl="title:transReload">
				<div class="logo"></div>
			</a>
		</div>
		<div class="search-block">
			<input type="text" name="search" placeholder="Enter search string" autocomplete="off" tabindex="1" tl="placeholder:transSearchInputPlac" autofocus>
			<img class="cancel" tl="title:transClearSearch" title="Clear search input" height="10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAACpJREFUCNdjcOBgeCDDUGDBYFHAIPOAgf8AA3sDCAEZQC5QECgFVODAAQDM9AnNrYQqKQAAAABJRU5ErkJggg==">
		</div>
	</div>
	<div class="right">
		<div class="details">
			<div class="summary material-icons gear" tl="title:transOption" title="Options">
				<img tl="title:transMenu" title="Menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMAQMAAABYwg+4AAAABlBMVEVHcEygoKA+g8YwAAAAAXRSTlMAQObYZgAAABlJREFUCNdjYACC9P8PwBgG0v9DMIIPlwcAHIkL5SzVzeQAAAAASUVORK5CYII=" style="margin:4px;">
			</div>
			<div class="menu">
				<div>
					<label for="colum-min-width" tl="transMinWidCol">Minimum width of columns</label>:&nbsp;
					<input id="colum-min-width" id="colum-min-width" class="colum-min-width" type="number" min="1">
				</div>
				<div>
					<label for="count-colum" tl="transCountColumns">Count of columns</label>:&nbsp;
					<input id="count-colum" id="count-colum" class="count-colum" type="number" min="1">
				</div>
				<div>
					<label for="searchservice" tl="transSearchEngine">Search engine</label>:&nbsp;
					<select id="searchservice" id="searchservice" class="searchservice" name="searchservice" tabindex="-1">
						<option value="https://www.google.com/search?q=">Google</option>
						<option value="https://yandex.ua/search/?text=">Yandex</option>
						<option value="https://www.bing.com/search?q=">Bing</option>
						<option value="https://www.baidu.com/s?wd=">Baidu</option>
						<option value="https://search.yahoo.com/search?p=">Yahoo</option>
						<option value="https://go.mail.ru/search?q=">MailRu</option>
						<option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
					</select>
				</div>
				<div>
					<label for="change-flow" tl="transFollowCursor">Follow cursor</label>:&nbsp;
					<input id="change-flow" id="change-flow" class="change-flow" type="checkbox" tl="title:transFollowCursor" title="Follow cursor">
				</div>
				<div>
					<label for="theme" tl="transTheme">Theme</label>:&nbsp;
					<span tl="transThemeDark">Dark</span>&nbsp;<input id="theme" id="theme" class="theme" type="checkbox" tl="title:transChangeColor" title="Change color">&nbsp;<span tl="transThemeWhite">White</span>
				</div>
				<div>
					<label for="open-new-tab" tl="transOpenNewTab">Open new tab</label>:&nbsp;
					<input id="open-new-tab" id="open-new-tab" class="open-new-tab" type="checkbox" tl="title:transOpenNewTab" title="Open new tab">
				</div>
				<div>
					<label for="add-category" tl="transAddCategory">Add category</label>:&nbsp;
					<input id="add-category" id="add-category" class="add-category" type="button" value="+" tl="title:transAddCategory" title="Add category">
				</div>
				<div>
					<label for="loginout" tl="transLoginout">Loginout</label>:&nbsp;
					<input id="loginout" id="loginout" class="loginout" type="button" value=">" tl="title:transLoginout" title="Loginout">
				</div>
			</div>
		</div>
	</div>
</div>
<div class="delete">
	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMAQMAAACOZ9XdAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAABhJREFUCNdjqD/A0KDA8P8Bg1YDdmTfAADDmgnOsQukNgAAAABJRU5ErkJggg==">
	&nbsp;Move here to remove.
</div>