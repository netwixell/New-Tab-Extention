;'use strict';
var loader={
		start:function(num){
			jsl(config.bodyId).css('background','rgba(0,0,0,0)');
			jsl(config.bodyId+' .block').css('background','rgba(0,0,0,0)');
			jsl('.title-block .open-all').css('display','none');
			jsl('.title-block .pencil').css('display','none');
			jsl('.title-block .plus').css('display','none');
			jsl('.link-block .pencil').css('display','none');
			jsl(config.topNav).css({
				opacity:.2,
				background:'rgba(0,0,0,0)'
			});
			jsl('.block[data-num]').css('opacity','.2');
			jsl('.block[data-num="block-'+num+'"]').css({
				opacity:'',
				background:'rgba(128,128,128,.5)'
			});
		},
		stop:function(){
			jsl(config.bodyId).css('background','');
			jsl(config.bodyId+' .block').css('background','');
			jsl('.title-block .open-all').css('display','');
			jsl('.title-block .pencil').css('display','');
			jsl('.title-block .plus').css('display','');
			jsl('.link-block .pencil').css('display','');
			jsl(config.topNav).css({
				opacity:'',
				background:''
			});
			jsl('.block[data-num]').css({
				opacity:'',
				background:''
			});
		}
	};
function encode(s){
	return s.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}
function decode(s){
	return s.replace(/&amp;/g,"&").replace(/>/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"');
}
function searchJson(string,json){
	var result={},
		json=json||JSON.parse(localStorage.dataBoard),
		linkBlock=jsl('div').createElement({
			class:'wrap-search-block'
		}),
		result={
			links:[],
			blocks:[],
			countColum:json.countColum,
			columMinWid:json.columMinWid,
			microtime:json.microtime,
			data:json.data,
			dragPoint:json.dragPoint
		};
	if(string!=''){
		jsl('.search-block .cancel').css('visibility','visible');
		for(var i=0;i<json.blocks.length;i++){
			if(result.blocks.indexOf(i)==-1){
				if(json.blocks[i].title.toLowerCase().indexOf(string.toLowerCase())!=-1)
					if(result.blocks.indexOf(i)==-1)
						result.blocks.push(json.blocks[i]);
				for(var j=0;j<json.blocks[i].links.length;j++){
					if(json.blocks[i].links[j].href.toLowerCase().indexOf(string.toLowerCase())!=-1||json.blocks[i].links[j].html.toLowerCase().indexOf(string.toLowerCase())!=-1){
						if(result.blocks.indexOf(json.blocks[i])==-1)
							result.blocks.push(json.blocks[i]);
						if(result.links.indexOf(json.blocks[i].links[j])==-1)
							result.links.push(json.blocks[i].links[j]);
					}
				}
			}
		}
	}else{
		jsl('.search-block .cancel').css('visibility','hidden');
		result=json;
	}
	window.asdasd=result;
	renderDashboard(result);
	resizeDashboard(result);
	if(result.links!=undefined){
		for(var k=0;k<result.links.length;k++){
			var linkA=jsl('a').createElement({
					class:'link',
					'data-num':'link-'+k,
					href:result.links[k]['href'],
					title:(result.links[k]['title']||'New bookmark')+' | '+result.links[k]['href']
				}),
				nameSpan=jsl('span').createElement().html(result.links[k]['html']||'New bookmark'),
				parsUrl=jsl.parserUrl(result.links[k]['href']),
				faviconImg=jsl('img').createElement({
					src:'https://www.google.com/s2/favicons?domain='+parsUrl.host,
					alt:(result.links[k]['title']||'New bookmark')+' | '+result.links[k]['href'],
					title:(result.links[k]['title']||'New bookmark')+' | '+result.links[k]['href'],
				}).on('error',function(ev){
					ev.target.src=config.html.errorFavicon;
				}),
				wrapLinkSpan=jsl('span').createElement({
					class:'wrap-link-span',
					'data-num':'wrap-link-'+k
				});
			linkA.append(faviconImg).append(nameSpan);
			wrapLinkSpan.append(linkA);
			linkBlock.append(wrapLinkSpan);
		}
		var html=linkBlock.a.outerHTML+jsl(config.bodyId).html();
		jsl(config.bodyId).html(result.links.length==0&&result.blocks.length==0&&linkBlock.html()==''?'<div class="empty">Empty</div>':html);
	}
}
function editLink(json,blockId,linkId){
	var json=json||JSON.parse(localStorage.dataBoard),
		inputBlockBack=jsl('div').createElement({
			class:'input-block-back',
			'data-num':'input-block-back-'+linkId
		}),
		newUrl=jsl('input').createElement({
			'data-num-block':blockId,
			'data-num-link':linkId,
			class:'input',
			placeholder:'Enter Url'
		}).prop({
			inb:inputBlockBack
		}).val(jsl('.block[data-num='+blockId+'] a[data-num='+linkId+']').attr('href')),
		winp=jsl('div').createElement({
			class:'input-block-wrap',
			'data-num':'input-'+blockId
		}).append(newUrl),
		clAdd=jsl('img').createElement({
			class:'close',
			alt:'Cancel',
			title:'Cancel',
			src:config.html.closeIcon,
			'data-num':'close-'+linkId
		}).prop({
			inb:blockId,
			ini:linkId
		}).on('mousedown',function(ev){
			ev.preventDefault();
			return false;
		}),
		f1=function(ev){
			if(ev.keyCode==13){
				if(ev.target.value!=''){
					var url=ev.target.value/*.toLowerCase()*/,
						parts=/^([a-z]+):\/\/|^\/\//.exec(url);
					jsl(ev.target).attr('readonly','readonly').css('cursor','not-allowed');
					jsl(this.inb).css('display','block');
					jsl('.input-block-wrap[data-num=input-'+blockId+'] img[data-num=close-'+linkId+']').attr('src','/img/load.gif');
					jsl(ev.target).on('blur');
					if(parts==null)
						url='http://'+url;
					jsl.ajax({
						url:config.domain+'/getinformation.php',
						type:'POST',
						headers:{
							'Content-Type':'application/x-www-form-urlencoded',
						},
						4:function(res){
							newUrl.a.onkeyup=null;
							window.test=url;
							f2(ev,res,url);
						}
					},{
						url:url
					});
					jsl.ajax({
						url:config.domain+'/screenshot.php',
						type:'POST',
						headers:{
							'Content-Type':'application/x-www-form-urlencoded',
						}
					},{
						url:url
					});
				}
				ev.preventDefault();
			}
			if(ev.keyCode==27){
				clAdd.a.click();
				ev.preventDefault();
			}
		},
		f2=function(ev,res,url){
			var match=res.response.match(/<title.*?>(.*?)\n?<\/title>/),
				html=res.response==''||res.status!=200||match==null||match[1]==''?'New bookmark':match[1];
			window.qwerty=true;
			ev.target.value=html;
			ev.target.select();
			window.uri=url;
			editObjeck.html=html;
			editObjeck.blockId=blockId;
			editObjeck.linkId=linkId;
			editObjeck.url=url;
			jsl('.input-block-back').css('display','none');
			jsl(ev.target).removeAttribute('readonly').css('cursor','auto');
			jsl('.input-block-wrap[data-num=input-'+blockId+']').css('margin','0');
			jsl('.input-block-wrap[data-num=input-'+blockId+'] img').css('display','none');
			newUrl.on('focus').attr('placeholder','Enter Name').on('keyup',function(ev){
				if(ev.keyCode==13){
					setTimeout(function(){window.stopGo=true;},100);
					window.qwerty=false;
					var blockId=/block-(\d+)/.exec(jsl(ev.target).attr('data-num-block'))[1],
						linkId=/link-(\d+)/.exec(jsl(ev.target).attr('data-num-link'))[1],
						json=JSON.parse(localStorage.dataBoard);
					json.blocks[getIndexBlock(blockId,json)]['links'][linkId]={
						href:window.uri,
						html:ev.target.value,
						title:ev.target.value
					};
					localStorage.dataBoard=JSON.stringify(json);
					notificationShow('Bookmark updated.','message');
					updateData(json,{
						href:window.uri,
						html:encode(ev.target.value),
						title:encode(ev.target.value),
						parentBlock:blockId,
						linkId:linkId
					},'editLink');
				}
			}).on('blur',function(ev){
				if(window.qwerty){
					setTimeout(function(){window.stopGo=true;},100);
					var blockId=/block-(\d+)/.exec(jsl(ev.target).attr('data-num-block'))[1],
						linkId=/link-(\d+)/.exec(jsl(ev.target).attr('data-num-link'))[1],
						json=JSON.parse(localStorage.dataBoard);
					json.blocks[getIndexBlock(blockId,json)]['links'][linkId]={
						href:window.uri,
						html:ev.target.value,
						title:ev.target.value
					};
					localStorage.dataBoard=JSON.stringify(json);
					notificationShow('Bookmark updated.','message');
					updateData(json,{
						href:window.uri,
						html:encode(ev.target.value),
						title:encode(ev.target.value),
						parentBlock:blockId,
						linkId:linkId
					},'editLink');
				}
			}).css('cursor','auto').removeAttribute('readonly');
		},
		editObjeck={};
	window.stopGo=false;
	winp.append(clAdd);
	jsl('.block[data-num='+blockId+'] .wrap-link-span[data-num=wrap-'+linkId+']').append(inputBlockBack).append(winp);
	jsl('.block[data-num='+blockId+'] a[data-num='+linkId+']').css('display','none');
	jsl('.block[data-num='+blockId+'] img[data-num-link='+linkId+']').css('display','none');
	clAdd.a.addEventListener('click',function(ev){
		setTimeout(function(){window.stopGo=true;},100);
		loader.stop();
		jsl('.block[data-num='+this.inb+'] a[data-num='+this.ini+']').css('display','block');
		jsl('.input-block-wrap[data-num=input-'+this.inb+']').css('display','none');
		jsl('.block[data-num='+this.inb+'] img[data-num-link='+this.ini+']').css('display','');
	});
	newUrl.on('focus');
	newUrl.a.onkeyup=f1;
	newUrl.a.select();
}
function getIndexBlock(blockId,json){
	json=json||JSON.parse(localStorage.dataBoard);
	for(var i=0;i<json.blocks.length;i++)
		if(json.blocks[i]['id']==blockId)
			return i;
}
function getIndexLink(indexBlock,index,json){
	json=json||JSON.parse(localStorage.dataBoard);
	for(var i=0;i<json.blocks[indexBlock].links.length;i++)
		if(i==index)
			return i;
}
function validURL(url){
	var pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
	return !!pattern.test(url);
}
function addLink(ev,json,url){
	url=url/*.toLowerCase()*/;
	var parts=/^([a-z]+):\/\/|^\/\//.exec(url),
		response=function(res){
			window.stopGo=false;
			var blockId=/input-block-wrap-(\d+)/.exec(jsl(ev.target).parent().attr('data-num'))[1],
				match=res.response.match(/<title.*?>(.*?)\n?<\/title>/),
				html=res.response==''||res.status!=200||match==null?'New bookmark':match[1],
				tumbler=true;
			jsl('.input-block-wrap[data-num=input-block-wrap-'+/input-block-wrap-(\d+)/.exec(jsl(ev.target).parent().attr('data-num'))[1]+']').css('margin','0');
			jsl('.input-block-wrap[data-num=input-block-wrap-'+/input-block-wrap-(\d+)/.exec(jsl(ev.target).parent().attr('data-num'))[1]+'] img').css('display','none');
			jsl('.input-block-back').css('display','none');
			jsl(ev.target).attr('placeholder','Enter Name').val(html).on('focus').removeAttribute('readonly').css('cursor','auto').select().on('keyup',function(ev){
				if(ev.keyCode==13){
					var json=JSON.parse(localStorage.dataBoard);
					tumbler=false;
					json.blocks[getIndexBlock(blockId,json)]['links'].unshift({
						href:url,
						html:ev.target.value,
						title:ev.target.value
					});
					notificationShow('Bookmark saved.','message');
					setTimeout(function(){window.stopGo=true;},100);
					updateData(json,{
						href:url,
						html:encode(ev.target.value),
						title:encode(ev.target.value),
						parentBlock:blockId
					},'addLink');
				}
			}).on('blur',function(){
				if(tumbler){
					window.stopGo=false;
					var json=JSON.parse(localStorage.dataBoard);
					json.blocks[getIndexBlock(blockId,json)]['links'].unshift({
						href:url,
						html:ev.target.value,
						title:ev.target.value
					});
					notificationShow('Bookmark saved.','message');
					updateData(json,{
						href:url,
						html:encode(ev.target.value),
						title:encode(ev.target.value),
						parentBlock:blockId
					},'addLink');
				}
			});
		};
	jsl('.input-block-wrap[data-num=input-block-wrap-'+/input-block-wrap-(\d+)/.exec(jsl(ev.target).parent().attr('data-num'))[1]+'] img').attr('src','/img/load.gif');
	if(parts==null)
		url='http://'+url;
	if(validURL(url)){
		jsl.ajax({
			url:url,
			type:'GET',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			},
			4:function(res){
				if(res.responseText=='')
					jsl.ajax({
						url:config.domain+'/getinformation.php',
						type:'POST',
						headers:{
							'Content-Type':'application/x-www-form-urlencoded',
						},
						4:function(res){
							response(res);
						}
					},{
						url:url
					});
				else
					response(res);
			}
		});
		jsl.ajax({
			url:config.domain+'/screenshot.php',
			type:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			}
		},{
			url:url
		});
	}else{
		jsl.ajax({
			url:config.domain+'/getinformation.php',
			type:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			},
			4:function(res){
				response(res);
			}
		},{
			url:url
		});
		jsl.ajax({
			url:config.domain+'/screenshot.php',
			type:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			}
		},{
			url:url
		});
	}
}
function appendCategory(ev){
	if(ev.keyCode==13){
		var json=JSON.parse(localStorage.dataBoard),
			max=-1,
			color=jsl('.color input[name="color"]:checked').attr('val'),
			objColor={
				def:'rgb(128,128,128)',
				red:'rgb(224,65,46)',
				blue:'rgb(80,134,247)',
				green:'rgb(72,168,79)',
				white:'white',
				black:'black',
				yellow:'rgb(245,187,0)',
				aqua:'rgb(255,174,201)',
				blueviolet:'rgb(163,73,164)',
				brown:'brown'
			};
		for(var i=0;i<json.blocks.length;i++)
			if(max<json.blocks[i]['id'])
				max=json.blocks[i]['id'];
		max=max==-1?0:++max;
		json.blocks.unshift({
			id:max,
			links:[],
			title:ev.target.value,
			parentColum:'0',
			color:objColor[color]||'rgb(128,128,128)'
		});
		jsl(config.popUpId).css('display','none');
		notificationShow('New category created.','message');
		updateData(json,{
			links:[],
			title:encode(ev.target.value),
			parentColum:'0',
			id:max
		},'addBlock');
	}
	ev.preventDefault();
}
function extreme(arr){
	var resNum=arr.b[0];
	for(var j=0;j<arr.b.length;j++)
		if(jsl('.colum[data-num="colum-'+resNum+'"]').css('offsetHeight')>jsl('.colum[data-num="colum-'+arr.b[j]+'"]').css('offsetHeight'))
			resNum=arr.b[j];
	return resNum;
}
function refreshJson(arr,json){
	// проблема с переброской колонок
	if(arr==null){
		var json=json||JSON.parse(localStorage.dataBoard);
	}else{
		var json=json||JSON.parse(localStorage.dataBoard);
		for(var i=0;i<arr.a.length;i++)
			for(var j=0;j<json.blocks.length;j++)
				if(json.blocks[j]['parentColum']==arr.a[i])
					json.blocks[j]['parentColum']=String(extreme(arr));
		// json.countColum=arr.b.length;
	}
	return json;
}
function notificationShow(ms,type){
	var color,h;
	clearTimeout(window.timeout);
	switch(type){
		case 'warning':{color='rgb(245,160,0)';h='Warning';}break;
		case 'error':{color='rgb(224,65,46)';h='Error';}break;
		case 'message':{color='rgb(97,178,97)';h='Message';}break;
	}
	jsl(config.windowMessage).html('<div class="closest" title="Close notification.">x</div><p><b>'+h+'</b></p><p>'+ms+'</p>').css('background',color).attr('class','show').children('.closest').on('click',function(){
		jsl(config.windowMessage).attr('class','');
	});
	window.timeout=setTimeout(function(){
		jsl(config.windowMessage).attr('class','');
	},4000);
}
function updateData(json,update,method){
	update.microtime=Date.now();
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	var ajax=jsl.ajax({
			url:config.domain+'/updatedata.php',
			type:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			},
			onerror:function(e){
				notificationShow(e,'error');
				loader.stop();
			},
			4:function(res){
				if(res.status!=200)
					return ajax.onerror('Error connection !');
				if(jsl.isJSON(res.response)==false)
					return ajax.onerror('Bad response !');
				var serverJson=JSON.parse(res.response);
				if(serverJson.error){
					({	
						401:function(){
							location.reload();
						}
					})[serverJson.error]();
				}else{
					//notificationShow('Operation done','message');
				}
			}
		},{
			data:JSON.stringify(json),
			update:update,
			method:method
		});
	renderDashboard(json);
	resizeDashboard(json);
	loader.stop();
}
function editBlockName(ev,name,json){
	var blockId=/input-name-block-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1];
	json.blocks[getIndexBlock(blockId,json)].title=encode(name);
	notificationShow('Name saved.','message');
	updateData(json,{
		blockId:blockId,
		newName:encode(name)
	},'editBlockName');
}
function mouseShowHandler(ev){
	ev=ev||window.event;
	if(ev.pageX==null&&ev.clientX!=null){ 
		var html=document.documentElement,
			body=document.body;
		ev.pageX=e.clientX+(html&&html.scrollLeft||body&&body.scrollLeft||0)-(html.clientLeft||0);
		ev.pageY=e.clientY+(html&&html.scrollTop||body&&body.scrollTop||0)-(html.clientTop||0);
	}
	window.pageX=ev.pageX;
	window.pageY=ev.pageY;
}
function drag(){
	var dropViewer=jsl('div').createElement({
			id:'drag-viewer'
		}),
		stops,
		dragObject={},
		dw={
			y:0,
			x:0
		},
		ew=function(ev){
			return{
				clientY:ev.clientY/*+jsl(config.blankId).animate('scrollTop')-dw.y+dragObject.block.offsetHeight/2*/,
				clientX:ev.clientX+jsl(config.blankId).animate('scrollLeft')-dw.x+dragObject.block.offsetWidth/2
			};
		},
		ewLink=function(ev){
			return{
				clientY:ev.clientY/*+jsl(config.blankId).animate('scrollTop')-dw.y+dragObject.block.offsetHeight/2*/,
				clientX:ev.clientX+jsl(config.blankId).animate('scrollLeft')-dw.x+dragObject.link.offsetWidth/2
			};
		},
		findDroppable=function(ev){
			ev=config.dragPoint?ev:ew(ev);
			var elem=document.elementFromPoint(ev.clientX,ev.clientY),
				arr={};
			if(elem==dropViewer.a||elem==null)return;
			if(elem.closest('.colum'))arr.inColum=/colum-(\d+)/.exec(jsl(elem.closest('.colum')).attr('data-num'));
			if(elem.closest('.block')){
				arr.afterBlock=/block-(\d+)/.exec(jsl(elem.closest('.block')).attr('data-num'));
				arr.block=elem.closest('.block');
			}
			return arr;
		},
		findDroppableEmpty=function(ev){
			ev=config.dragPoint?ev:ew(ev);
			var elem=document.elementFromPoint(ev.clientX,ev.clientY),
				arr={};
			if(elem==null)return;
			if(elem.closest('.colum'))arr.inColum=/colum-(\d+)/.exec(jsl(elem.closest('.colum')).attr('data-num'));
			if(elem.closest('.colum'))arr.inPosition=Array.prototype.slice.call(jsl(elem.closest('.colum')).children().a).indexOf(elem);
			if(elem.closest('.colum')){
				if(arr.inPosition==0)
					if(!(jsl(elem.closest('.colum')).children().length==1&&jsl(elem.closest('.colum')).children(0).a==dropViewer.a))
						arr.afterBlock=/block-(\d+)/.exec(jsl(elem.closest('.colum')).children().eq(arr.inPosition+1).attr('data-num'));
				if(arr.inPosition>0)
					arr.afterBlock=/block-(\d+)/.exec(jsl(elem.closest('.colum')).children().eq(arr.inPosition-1).attr('data-num'));
			}
			return arr;
		},
		findDroppableLink=function(ev){
			ev=config.dragPoint?ev:ewLink(ev);
			var elem=document.elementFromPoint(ev.clientX,ev.clientY),
				arr={};
			arr.test=elem;
			if(elem==dropViewer.a||elem==null)return;
			if(elem.closest('.block')){
				arr.inBlock=/block-(\d+)/.exec(jsl(elem.closest('.block')).attr('data-num'));
				if(elem.closest('.link'))
					arr.link=/link-(\d+)/.exec(jsl(elem.closest('.link')).attr('data-num'));
				arr.block=elem.closest('.block');
				arr.linkE=elem.closest('.link');
			}
			return arr;
		},
		down=function(ev){
			if(ev.which!=1||window.stopGo==false)
				return;
			if(ev.target==dropViewer.a)
				return;
			var link=ev.target.closest('.link'),
				block=ev.target.closest('.name'),
				blockL=ev.target.closest('.block'),
				colum=ev.target.closest('.colum');
			if(!link&&!block)
				return;
			if(link){
				dw.y=window.pageY-jsl(link).getCoordinates().top;
				dw.x=window.pageX-jsl(link).getCoordinates().left;
				dragObject.link=link;
				dragObject.numBlock=/block-(\d+)/.exec(blockL.getAttribute('data-num'));
				dragObject.num=/link-(\d+)/.exec(link.getAttribute('data-num'));
				dragObject.link=ev.target.closest('.link');
				dragObject.downX=ev.pageX;
				dragObject.downY=ev.pageY;
				dragObject.moveStart=false;
				dropViewer.css({
					height:'26px'
				});
				dragObject.link.onclick=function(){
					return false;
				};
				document.onmousemove=moveLink;
				document.onmouseup=upLink;
				//ev.preventDefault();
				window.onblur=function(){
					var json=JSON.parse(localStorage.dataBoard);
					localStorage.dataBoard=JSON.stringify(json);
					renderDashboard(json);
					resizeDashboard(json);
					dragObject={};
					document.onmousemove=null;
					document.onmouseup=null;
					window.onblur=null;
					clearInterval(stops);
					jsl('.delete').css('display','none');
					return false;
				};
			}
			if(block){
				dw.y=ev.offsetY;
				dw.x=ev.offsetX;
				dragObject.numColum=/colum-(\d+)/.exec(colum.getAttribute('data-num'));
				dragObject.num=/name-block-(\d+)/.exec(block.getAttribute('data-num'));
				dragObject.block=ev.target.closest('.block');
				dragObject.downX=ev.pageX;
				dragObject.downY=ev.pageY;
				dragObject.moveStart=false;
				document.onmousemove=moveBlock;
				document.onmouseup=upBlock;
				dropViewer.css({
					height:'42px'
				});
				ev.preventDefault();
				window.onblur=function(){
					var json=JSON.parse(localStorage.dataBoard);
					localStorage.dataBoard=JSON.stringify(json);
					renderDashboard(json);
					resizeDashboard(json);
					dragObject={};
					document.onmousemove=null;
					document.onmouseup=null;
					window.onblur=null;
					clearInterval(stops);
					jsl('.delete').css('display','none');
					return false;
				};
			}
			//ev.preventDefault();
			//return false;
		},
		moveLink=function(ev){
			function indertPrevLink(inBlock,dropElem,position){
				jsl('.block[data-num="block-'+inBlock+'"] .link-block').append(dropViewer);
				var arr=jsl('.block[data-num="block-'+inBlock+'"] .link-block .wrap-link-span');
				if(arr.a==null){
					jsl('.block[data-num="block-'+inBlock+'"] .link-block').append(dropElem);
				}else{
					if(position==0&&arr.length==1){
						jsl('.block[data-num="block-'+inBlock+'"] .link-block').insertBefore(dropElem,arr.a);
					}else{
						jsl('.block[data-num="block-'+inBlock+'"] .link-block').insertBefore(dropElem,arr.a[position]);
					}
				}
			}
			if((ev.pageY-10<0||ev.pageY+10>window.innerHeight)&&stops==undefined){
				if(ev.pageY-10<0)
					stops=setInterval(function(){
						if(jsl(config.blankId).offsetHeight<jsl(config.holder).offsetHeight)
							jsl(config.blankId).scrollTo(0,jsl(config.blankId).animate('scrollTop')-10);
					},35);
				if(ev.pageY+10>window.innerHeight)
					stops=setInterval(function(){
						if(jsl(config.blankId).offsetHeight<jsl(config.holder).offsetHeight)
							jsl(config.blankId).scrollTo(0,jsl(config.blankId).animate('scrollTop')+10);
					},35);
			}
			if((ev.pageY-10>0&&ev.pageY+10<window.innerHeight)&&stops!=undefined){
				clearInterval(stops);
				stops=undefined;
			}
			if(ev.target==dropViewer.a){
				ev.preventDefault();
				return false;
			}
			if(Math.abs(ev.clientX-dragObject.downX)<10&&Math.abs(ev.clientY-dragObject.downY)<10){
				ev.preventDefault();
				return false;
			}
			jsl(dragObject.link).css({
				position:'absolute',
				width:jsl(dragObject.link).css('offsetWidth')-2+'px',
				left:'-9999px',
				'z-index':-10
			});
			jsl(config.bodyId+' .block .wrap-block').css('height','');
			indertPrevLink(dragObject.numBlock[1],dropViewer.a,Number(dragObject.num[1])+1);// добавил чтоб при попытке перетаскивать последний линк в не последнем блоке перетаскиваемая сслка не прыгала 
			var dragResult=findDroppableLink(ev);
			if(document.elementFromPoint(ev.clientX,ev.clientY)==jsl('.delete').a||document.elementFromPoint(ev.clientX,ev.clientY)==jsl(config.topNav+' .delete img').a){
				dropViewer.css('display','none');
				dragObject.delete=true;
				jsl(config.topNav+' .delete').css({
					background:'rgb(230,0,0)',
					color:'rgb(255,255,255)'
				});
				jsl(config.topNav+' .delete img').css({
					filter:'brightness(1)'
				});
			}else{
				dropViewer.css('display','block');
				dragObject.delete=false;
				jsl(config.topNav+' .delete').css({
					background:'',
					color:''
				}).css('display','block');
				jsl(config.topNav+' .delete img').css({
					filter:'brightness(.8)'
				});
				jsl(config.bodyId+' .block .wrap-block').css('height','100%');
				jsl('.title-block .open-all').css('display','none');
				jsl('.title-block .pencil').css('display','none');
				jsl('.title-block .plus').css('display','none');
			}
			jsl(dragObject.link).css({
				position:'fixed',
				top:(ev.clientY-dw.y-1)+'px',
				left:(ev.clientX-dw.x-1)+'px',
				width:jsl(dragObject.link).css('offsetWidth')-28+'px',
				height:jsl(dragObject.link).css('offsetHeight')-13+'px',
				'z-index':1,
				background:'transparent',
				border:'1px solid rgba(128,128,128,.5)'
			});
			jsl(config.bodyId+' .block .wrap-block').css('height','100%');
			if(typeof dragObject.link=='object'&&dragObject.moveStart==false&&typeof dragObject.num=='object'&&typeof dragObject.numBlock=='object'){
				dragObject.position=Number(dragObject.num[1])+1;
				indertPrevLink(dragObject.numBlock[1],dropViewer.a,Number(dragObject.num[1])+1);
			}
			if(Math.abs(ev.clientX-dragObject.downX)<10&&Math.abs(ev.clientY-dragObject.downY)<10){
				ev.preventDefault();
				return false;
			}else
				dragObject.moveStart=true;
			if(dragResult==undefined||dragResult.inBlock==undefined||dragResult.block==undefined){
				ev.preventDefault();
				return false;
			}
			var indexInBlock=dragResult.inBlock[1],
				indexAfterBlock,
				snf=0,
				indexDB=getIndexBlock(dragObject.num[1]),
				json=JSON.parse(localStorage.dataBoard);
			if(dragObject.moveStart){
				if(dragResult.link==undefined&&dragResult.block!=undefined&&dragResult.inBlock!=undefined){
					if(dragResult.test.className=='borrom-border')
						dragObject.position=json.blocks[getIndexBlock(indexInBlock)].links.length;
					else
						dragObject.position=0;
					indertPrevLink(dragResult.inBlock[1],dropViewer.a,dragObject.position);
				}else{
					if(dragResult!=undefined&&dragResult.inBlock!=undefined){
						var indexInBlock=dragResult.inBlock[1],
							spliceElem;
						if(dragResult.link!=undefined)
							if(ev.y-jsl(dragResult.linkE).getCoordinates().top<jsl(dragResult.linkE).offsetHeight/2)
								snf=1;
						if(snf==0){
							dragObject.position=Number(dragResult.link[1])+1;
							indertPrevLink(dragResult.inBlock[1],dropViewer.a,Number(dragResult.link[1])+1);
						}
						if(snf==1){
							dragObject.position=Number(dragResult.link[1]);
							indertPrevLink(dragResult.inBlock[1],dropViewer.a,Number(dragResult.link[1]));
						}
					}
				}
			}
			ev.preventDefault();
			return false;
		},
		upLink=function(ev){
			if(dragObject.moveStart==false){
				clearInterval(stops);
				document.onmousemove=null;
				document.onmouseup=null;
				window.onblur=null;
				toGo(dragObject.link.href,ev);
				ev.preventDefault();
				return false;
			}
			jsl(dragObject.link).css({
				top:'',
				left:'',
				width:'',
				'z-index':1,
				border:'none',
				position:'relative',
				background:'transparent'
			});
			var json=JSON.parse(localStorage.dataBoard),
				dl=null,
				dragResult=findDroppableLink(ev),
				indexBlock=getIndexBlock(dragObject.numBlock[1],json),
				indexLink=getIndexLink(indexBlock,dragObject.num[1],json);
			if(dragResult!=undefined&&dragResult.inBlock!=undefined){
				if(dragResult.block&&dragObject.moveStart){
					var inBlock=getIndexBlock(dragResult.inBlock[1]),
						sp=json.blocks[indexBlock].links.splice(indexLink,1);
					if(indexBlock==inBlock)
						if(indexLink<dragObject.position)
							dragObject.position=dragObject.position-1;
					json.blocks[inBlock].links.splice(dragObject.position,0,sp[0]);
				}
			}
			if(dragObject.delete||document.elementFromPoint(ev.clientX,ev.clientY)==jsl('.delete').a||document.elementFromPoint(ev.clientX,ev.clientY)==jsl(config.topNav+' .delete img').a)
				dl=json.blocks[indexBlock].links.splice(indexLink,1);
			setTimeout(function(){
				dragObject.link.onclick=null;
			});
			jsl('.delete').css('display','none');
			localStorage.dataBoard=JSON.stringify(json);
			renderDashboard(json);
			resizeDashboard(json);
			clearInterval(stops);
			document.onmousemove=null;
			document.onmouseup=null;
			window.onblur=null;
			if(dl!=null){
				notificationShow('Link removed.','message');
				updateData(json,{
					block:indexBlock,
					link:indexLink
				},'deleteLink');
			}else{
				if(dragResult!=undefined&&dragResult.inBlock!=undefined){
					if(dragObject.moveStart==true){
						notificationShow('Moving saved.','message');
						updateData(json,{
							fromBlock:indexBlock,
							inBlock:inBlock
						},'dragLink');
					}
				}
			}
			return false;
		},
		moveBlock=function(ev){
			function countBlocks(indexInColum){
				var countBlocks=0;
				for(var i=0;i<json.blocks.length;i++){
					if(json.blocks[i].parentColum==indexInColum){
						++countBlocks;
					}
				}
				return countBlocks;
			}
			function countBlocksIn(indexInColum,indexAfterBlock){
				var countBlocks=0;
				for(var i=0;i<json.blocks.length;i++){
					if(json.blocks[i].parentColum==indexInColum){
						if(i==Number(indexAfterBlock))
							return countBlocks;
						++countBlocks;
					}
				}
				return countBlocks;
			}
			function indertPrev(inColum,dropElem,position){
				jsl('.colum[data-num="colum-'+inColum+'"]').append(dropViewer);
				var arr=jsl('.colum[data-num="colum-'+inColum+'"] .block');
				if(arr.a.length==undefined&&arr.length==1){
					if(position==0){
						jsl('.colum[data-num="colum-'+inColum+'"]').insertBefore(dropElem,arr.a);
					}
				}else{
					for(var i=0;i<arr.a.length;i++){
						if(i==position){
							if(i==0){
								jsl('.colum[data-num="colum-'+inColum+'"]').insertBefore(dropElem,arr.a[i]);
							}else{
								jsl('.colum[data-num="colum-'+inColum+'"]').insertBefore(dropElem,arr.a[i]);
							}
						}
					}
				}
			}
			if((ev.pageY-10<0||ev.pageY+10>window.innerHeight)&&stops==undefined){
				if(ev.pageY-10<0)
					stops=setInterval(function(){
						if(jsl(config.blankId).offsetHeight<jsl(config.holder).offsetHeight)
							jsl(config.blankId).scrollTo(0,jsl(config.blankId).animate('scrollTop')-10);
					},35);
				if(ev.pageY+10>window.innerHeight)
					stops=setInterval(function(){
						if(jsl(config.blankId).offsetHeight<jsl(config.holder).offsetHeight)
							jsl(config.blankId).scrollTo(0,jsl(config.blankId).animate('scrollTop')+10);
					},35);
			}
			if(dragObject.block!=undefined){
				if(Math.abs(ev.clientX-dragObject.downX)<10&&Math.abs(ev.clientY-dragObject.downY)<10&&dragObject.moveStart==false){
					ev.preventDefault();
					return false;
				}else
					dragObject.moveStart=true;
			}
			if((ev.pageY-10>0&&ev.pageY+10<window.innerHeight)&&stops!=undefined){
				clearInterval(stops);
				stops=undefined;
			}
			if(ev.target==dropViewer.a){
				ev.preventDefault();
				return false;
			}
			jsl(dragObject.block).css({
				position:'absolute',
				width:jsl(dragObject.block).css('offsetWidth')-2+'px',
				left:'-9999px',
				'z-index':-10
			});
			if(document.elementFromPoint(ev.clientX,ev.clientY)==jsl('.delete').a||document.elementFromPoint(ev.clientX,ev.clientY)==jsl(config.topNav+' .delete img').a){
				dropViewer.css('display','none');
				dragObject.delete=true;
				jsl(config.topNav+' .delete').css({
					background:'rgb(230,0,0)',
					color:'rgb(255,255,255)'
				});
				jsl(config.topNav+' .delete img').css({
					filter:'brightness(1)'
				});
			}else{
				dropViewer.css('display','block');
				dragObject.delete=false;
				jsl(config.topNav+' .delete').css({
					background:'',
					color:''
				}).css('display','block');
				jsl(config.topNav+' .delete img').css({
					filter:'brightness(.8)'
				});
				jsl(config.bodyId+' .block .wrap-block').css('height','100%');
				jsl('.title-block .open-all').css('display','none');
				jsl('.title-block .pencil').css('display','none');
				jsl('.title-block .plus').css('display','none');
			}
			var dragResult=findDroppable(ev);
			jsl(dragObject.block).css({
				position:'absolute',
				top:(ev.clientY+jsl(config.blankId).animate('scrollTop')-dw.y-1)+'px',
				left:(ev.clientX+jsl('body').animate('scrollLeft')-dw.x)+'px',
				width:jsl(dragObject.block).css('offsetWidth')-2+'px',
				'z-index':1,
				background:'transparent',
				border:'1px solid rgba(128,128,128,.5)'
			});
			if(dragResult==undefined||dragResult.inColum==undefined||dragObject.num==undefined){
				ev.preventDefault();
				return false;
			}
			var indexInColum=dragResult.inColum[1],
				indexAfterBlock,
				snf=0,
				indexDB=getIndexBlock(dragObject.num[1]),
				json=JSON.parse(localStorage.dataBoard);
			if(dragResult!=undefined&&dragResult.inColum!=undefined){
				var indexInColum=dragResult.inColum[1],
					indexAfterBlock,
					spliceElem,
					snf=0,
					indexDB=getIndexBlock(dragObject.num[1]);
				if(dragResult.afterBlock==undefined){
					var adasd=0;
					for(var i=json.blocks.length;i--;){
						if(json.blocks[i].parentColum==indexInColum){
							adasd=i;
							break;
						}
					}
					indexAfterBlock=adasd>0?adasd:0;
					++indexAfterBlock;
				}else
					indexAfterBlock=getIndexBlock(dragResult.afterBlock[1]);
				if(dragResult.afterBlock!=undefined){
					if(ev.y-jsl(dragResult.block).getCoordinates().top<jsl(dragResult.block).offsetHeight/2)
						snf=1;
				}
				if(dragResult.afterBlock==undefined){
					if(dragObject.numColum[1]==indexInColum)
						jsl('.colum[data-num="colum-'+indexInColum+'"]').append(dropViewer);
					else
						jsl('.colum[data-num="colum-'+indexInColum+'"]').append(dropViewer);
				}else{
					if(snf==0){
						if(Number(indexDB)>Number(indexAfterBlock))
							indertPrev(indexInColum,dropViewer.a,countBlocksIn(indexInColum,indexAfterBlock)+1);
						if(Number(indexDB)<Number(indexAfterBlock))
							indertPrev(indexInColum,dropViewer.a,countBlocksIn(indexInColum,indexAfterBlock)+1);
					}
					if(snf==1){
						if(Number(indexDB)>Number(indexAfterBlock))
							indertPrev(indexInColum,dropViewer.a,countBlocksIn(indexInColum,indexAfterBlock));
						if(Number(indexDB)<Number(indexAfterBlock))
							indertPrev(indexInColum,dropViewer.a,countBlocksIn(indexInColum,indexAfterBlock));
					}
				}
			}
			ev.preventDefault();
			return false;
		},
		upBlock=function(ev){
			jsl(dragObject.block).css({
				top:'',
				left:'',
				width:'',
				'z-index':1,
				border:'none',
				position:'relative',
				background:'transparent'
			});
			var json=JSON.parse(localStorage.dataBoard),
				dragResult=findDroppable(ev),
				dl=null;
			if(dragResult!=undefined&&dragResult.inColum!=undefined){
				var indexInColum=dragResult.inColum[1],
					indexAfterBlock,
					spliceElem,
					snf=0,
					indexDB=getIndexBlock(dragObject.num[1]);
				if(dragResult.afterBlock==undefined){
					var adasd=0;
					for(var i=json.blocks.length;i--;){
						if(json.blocks[i].parentColum==indexInColum){
							adasd=i;
							break;
						}
					}
					indexAfterBlock=adasd>0?adasd:0;
					++indexAfterBlock;
				}else
					indexAfterBlock=getIndexBlock(dragResult.afterBlock[1]);
				if(dragResult.afterBlock!=undefined){
					if(ev.y-jsl(dragResult.block).getCoordinates().top<jsl(dragResult.block).offsetHeight/2)
						snf=1;
				}
				json.blocks[indexDB].parentColum=indexInColum;
				if(Number(indexDB)!=Number(indexAfterBlock))
					spliceElem=json.blocks.splice(Number(indexDB),1);
				if(snf==0){
					if(Number(indexDB)>Number(indexAfterBlock))
						json.blocks.splice(Number(indexAfterBlock)+1,0,spliceElem[0]);
					if(Number(indexDB)<Number(indexAfterBlock))
						json.blocks.splice(Number(indexAfterBlock),0,spliceElem[0]);
				}
				if(snf==1){
					if(Number(indexDB)>Number(indexAfterBlock))
						json.blocks.splice(Number(indexAfterBlock),0,spliceElem[0]);
					if(Number(indexDB)<Number(indexAfterBlock))
						json.blocks.splice(Number(indexAfterBlock)-1,0,spliceElem[0]);
				}
			}else{
				dragResult=findDroppableEmpty(ev)||{};
				if(dragResult.inColum!=undefined){
					var indexInColum=dragResult.inColum[1],
						indexAfterBlock,
						spliceElem,
						snf=0,
						indexDB=getIndexBlock(dragObject.num[1]);
					if(dragResult.afterBlock==undefined){
						var adasd=0;
						for(var i=json.blocks.length;i--;){
							if(json.blocks[i].parentColum==indexInColum){
								adasd=i;
								break;
							}
						}
						indexAfterBlock=adasd>0?adasd:0;
						++indexAfterBlock;
					}else
						indexAfterBlock=getIndexBlock(dragResult.afterBlock[1]);
					if(dragResult.afterBlock!=undefined)
						if(dragResult.inPosition==0)
							snf=1;
					json.blocks[indexDB].parentColum=indexInColum;
					if(Number(indexDB)!=Number(indexAfterBlock))
						spliceElem=json.blocks.splice(Number(indexDB),1);
					if(snf==0){
						if(Number(indexDB)>Number(indexAfterBlock))
							json.blocks.splice(Number(indexAfterBlock)+1,0,spliceElem[0]);
						if(Number(indexDB)<Number(indexAfterBlock))
							json.blocks.splice(Number(indexAfterBlock),0,spliceElem[0]);
					}
					if(snf==1){
						if(Number(indexDB)>Number(indexAfterBlock))
							json.blocks.splice(Number(indexAfterBlock),0,spliceElem[0]);
						if(Number(indexDB)<Number(indexAfterBlock))
							json.blocks.splice(Number(indexAfterBlock)-1,0,spliceElem[0]);
					}
				}
			}
			if(dragObject.delete||document.elementFromPoint(ev.clientX,ev.clientY)==jsl('.delete').a||document.elementFromPoint(ev.clientX,ev.clientY)==jsl(config.topNav+' .delete img').a)
				dl=json.blocks.splice(getIndexBlock(dragObject.num[1],json),1);
			jsl('.delete').css('display','none');
			localStorage.dataBoard=JSON.stringify(json);
			renderDashboard(json);
			resizeDashboard(json);
			clearInterval(stops);
			document.onmousemove=null;
			document.onmouseup=null;
			window.onblur=null;
			if(dl!=null){
				notificationShow('Category removed.','message');
				updateData(json,{
					block:dl[0].id,
					parentColum:dl[0].parentColum
				},'deleteBlock');
			}else{
				if(dragResult!=undefined&&dragResult.inColum!=undefined){
					if(dragObject.moveStart==true){
						notificationShow('Moving saved.','message');
						updateData(json,{
							fromColumn:indexInColum,
							block:indexDB,
							inColum:indexInColum,
							after:indexAfterBlock
						},'dragBlock');
					}
				}
			}
			return false;
		};
	document.onmousedown=down;
}
function renderDashboard(json){
	if(json==undefined)
		json=JSON.parse(localStorage.dataBoard);
	var countColum=Number(json.countColum),
		body=jsl(config.bodyId),
		parrentElement=jsl(body).parent(),
		scrollTop=jsl(config.blankId).animate('scrollTop');
	body.html('');
	if(Number(json.countColum)>0){
		jsl(config.topNav).children('.menu input.colum-min-width').val(Number(json.columMinWid)).attr('max',String(parrentElement.css('offsetWidth')/Number(json.countColum)));
		jsl(config.topNav).children('.menu input.count-colum').val(Number(json.countColum)).attr('max',String(Math.trunc(parrentElement.css('offsetWidth')/Number(config.columMinWid))));
		jsl(config.topNav).children('.menu input.change-flow').prop('checked',json.dragPoint);
		jsl(config.topNav).children('.menu input.open-new-tab').prop('checked',json.openNewTab);
		jsl(config.topNav).children('.menu select.searchservice').prop('value',json.searchService);
		for(var i=0;i<Number(json.countColum);i++){
			var colum=jsl('div').createElement({
				class:'colum',
				'data-num':'colum-'+i
			});
			body.append(colum);
		}
	}
	if(json['blocks'].length>0){
		for(var j=0;j<json['blocks'].length;j++){
			var block=jsl('div').createElement({
					class:'block',
					'data-num':'block-'+json['blocks'][j]['id']||j
				}),
				wrapBlock=jsl('div').createElement({
					class:'wrap-block'
				}),
				titleBlock=jsl('div').createElement({
					class:'title-block',
					'data-num':'title-block-'+json['blocks'][j]['id']||j,
					style:{
						'border-color':json['blocks'][j]['color']||''
					}
				}),
				nameBlock=jsl('div').createElement({
					class:'name',
					'data-num':'name-block-'+json['blocks'][j]['id']||j
				}).html(json['blocks'][j]['title']||'Title'),
				inputBlock=jsl('div').createElement({
					class:'input-block',
					'data-num':'input-block-'+json['blocks'][j]['id']||j
				}),
				inputName=jsl('input').createElement({
					class:'input-name',
					'data-num':'input-name-block-'+json['blocks'][j]['id']||j,
					placeholder:'Enter Name',
					style:{display:'none'}
				}),
				editBlock=jsl('div').createElement({
					class:'pencil',
					title:'Edit name category',
					'data-num':'edit-block-'+json['blocks'][j]['id']||j
				}).prop({
					inb:nameBlock,
					ini:inputName
				}).html(jsl('img').createElement({
					src:config.html.editName,
					title:'Edit name category',
					alt:'Edit name category',
					'data-num':'edit-block-'+json['blocks'][j]['id']||j,
				}).a),
				openAll=jsl('div').createElement({
					class:'open-all',
					title:'Open all link',
					'data-num':'open-all-'+json['blocks'][j]['id']||j
				}).html(jsl('img').createElement({
					src:config.html.openAll,
					title:'Open all link',
					alt:'Open all link',
					'data-num':'open-all-'+json['blocks'][j]['id']||j,
				}).a),
				inputBlockBack=jsl('div').createElement({
					class:'input-block-back',
					'data-num':'input-block-back-'+json['blocks'][j]['id']||j
				}),
				inputBlockWrap=jsl('div').createElement({
					class:'input-block-wrap',
					'data-num':'input-block-wrap-'+json['blocks'][j]['id']||j
				}),
				clAdd=jsl('img').createElement({
					class:'close',
					title:'Cancel',
					alt:'Cancel',
					src:config.html.closeIcon,
					'data-num':'close-'+json['blocks'][j]['id']||j
				}).prop({
					inb:inputBlock,
					ini:input
				}).on('mousedown',function(ev){
					ev.preventDefault();
					return false;
				}),
				input=jsl('input').createElement({
					class:'input',
					'data-num':'input',
					placeholder:'Enter Url'
				}).prop({
					inb:inputBlockBack,
					ini:inputBlock,
					cli:clAdd
				}),
				plusBlock=jsl('div').createElement({
					class:'plus',
					title:'Add link',
					'data-num':'plus-block-'+json['blocks'][j]['id']||j
				}).prop({
					inb:inputBlock,
					ini:input
				}).html(jsl('img').createElement({
					src:config.html.addLink,
					title:'Add link',
					alt:'Add link',
					'data-num':'plus-block-'+json['blocks'][j]['id']||j,
				}).a),
				settingBlock=jsl('div').createElement({
					class:'settings-block',
					'data-num':'settings-block-'+json['blocks'][j]['id']||j
				}),
				linkBlock=jsl('div').createElement({
					class:'link-block',
					'data-num':'link-block-'+json['blocks'][j]['id']||j
				}),
				bottomBorder=jsl('div').createElement({
					class:'borrom-border',
					style:{
						height:'8px',
						width:'100%'
					},
					'data-num':'borrom-border-'+json['blocks'][j]['id']||j
				}),
				columNumAppend=json.blocks[j]['parentColum']<Number(json.countColum)?json.blocks[j]['parentColum']:countColum<=0?0:--countColum,
				fen=function(ev){
					if(ev.keyCode==13&&ev.target.value!=''){
						var json=JSON.parse(localStorage.dataBoard);
						addLink(ev,json,ev.target.value);
						jsl(this.inb).css('display','block');
						jsl(this).on('blur').attr('readonly','readonly').css('cursor','not-allowed');
						ev.target.removeEventListener('keyup',fen);
					}
				};
			clAdd.a.addEventListener('click',function(ev){
				loader.stop();
				jsl(this.inb).css('display','none');
				setTimeout(function(){window.stopGo=true;},100);
			});
			editBlock.a.addEventListener('click',function(ev){
				var blockId=/edit-block-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1],
					val=decode(json.blocks[getIndexBlock(blockId,json)].title);
				loader.start(blockId);
				jsl(this.ini).css('display','block').on('focus').val(val).attr('default',val).select();
				jsl(this.inb).css('display','none');
				window.stopGo=false;
			},false);
			plusBlock.a.addEventListener('click',function(ev){
				jsl('.input-block').css('display','none');
				loader.start(/input-block-(\d+)/.exec(this.inb.a.attributes['data-num'].value)[1]);
				jsl(this.inb).css('display','block');
				jsl(this.ini).on('focus');
				window.stopGo=false;
			},false);
			openAll.a.addEventListener('click',function(ev){
				var blockId=/open-all-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1];
				for(var i=0;i<json.blocks[getIndexBlock(blockId,json)].links.length;i++)
					window.open(json.blocks[getIndexBlock(blockId,json)].links[i].href);
			},false);
			input.a.addEventListener('keyup',fen,false);
			input.a.addEventListener('keydown',function(ev){
				if(ev.keyCode!=27)
					return;
				loader.stop();
				jsl(this.ini).css('display','none');
				setTimeout(function(){window.stopGo=true;},100);
			},false);
			inputName.a.addEventListener('keyup',function(ev){
				if(ev.keyCode==27){
					var blockId=/input-name-block-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1];
					jsl('.input-name').css('display','none');
					jsl('.name').css('display','block');
					loader.stop();
					setTimeout(function(){window.stopGo=true;},100);
				}
				if(ev.keyCode==13){
					if(ev.target.value==jsl(ev.target).attr('default')){
						var blockId=/input-name-block-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1];
						jsl('.input-name').css('display','none');
						jsl('.name').css('display','block');
						loader.stop();
						setTimeout(function(){window.stopGo=true;},100);
					}else{
						var json=JSON.parse(localStorage.dataBoard);
						editBlockName(ev,ev.target.value,json);
						setTimeout(function(){window.stopGo=true;},100);
					}
				}
			},false);
			inputName.a.addEventListener('blur',function(ev){
				if(window.stopGo)
					return;
				if(ev.target.value==jsl(ev.target).attr('default')){
					var blockId=/input-name-block-(\d+)/.exec(jsl(ev.target).attr('data-num'))[1];
					jsl('.input-name').css('display','none');
					jsl('.name').css('display','block');
					loader.stop();
					setTimeout(function(){window.stopGo=true;},100);
				}else{
					var json=JSON.parse(localStorage.dataBoard);
					editBlockName(ev,ev.target.value,json);
					setTimeout(function(){window.stopGo=true;},100);
				}
			},false);
			if(json['blocks'][j]['links'].length>0){
				for(var k=0;k<json['blocks'][j]['links'].length;k++){
					var linkA=jsl('a').createElement({
							class:'link',
							'data-num':'link-'+k,
							href:json['blocks'][j]['links'][k]['href'],
							title:decode(json['blocks'][j]['links'][k]['title']||'New bookmark')+' | '+json['blocks'][j]['links'][k]['href']
						}),
						nameSpan=jsl('span').createElement().html(json['blocks'][j]['links'][k]['html']||'New bookmark'),
						parsUrl=jsl.parserUrl(json['blocks'][j]['links'][k]['href']),
						faviconImg=jsl('img').createElement({
							src:'https://www.google.com/s2/favicons?domain='+parsUrl.host,
							alt:decode(json['blocks'][j]['links'][k]['title']||'New bookmark')+' | '+json['blocks'][j]['links'][k]['href'],
							title:decode(json['blocks'][j]['links'][k]['title']||'New bookmark')+' | '+json['blocks'][j]['links'][k]['href'],
						}).on('error',function(ev){
							ev.target.src=config.html.errorFavicon;
						}),
						editIcon=jsl('img').createElement({
							src:config.html.editName,
							height:'14px',
							width:'14px',
							class:'pencil',
							alt:'Edit this link',
							title:'Edit this link',
							'data-num-link':'link-'+k,
							'data-num-block':'block-'+json['blocks'][j]['id']||j
						}).on('click',function(ev){
							renderDashboard(JSON.parse(localStorage.dataBoard));
							resizeDashboard(JSON.parse(localStorage.dataBoard));
							loader.start(/block-(\d+)/.exec(this.a.attributes['data-num-block'].value)[1]);
							editLink(json,jsl(ev.target).attr('data-num-block'),jsl(ev.target).attr('data-num-link'));
						}).on('mousedown',function(ev){
							ev.preventDefault();
							return false;
						}),
						wrapLinkSpan=jsl('span').createElement({
							class:'wrap-link-span',
							'data-num':'wrap-link-'+k
						});
					linkA.append(faviconImg).append(nameSpan);
					wrapLinkSpan.append(editIcon).append(linkA);
					if(json.screenshot){
						var linkScreenshot=jsl('img').createElement({
							src:(config.domain+'/screenshot/'+btoa(json['blocks'][j]['links'][k]['href'])+'-pc.jpg'),
							class:'link-screenshot',
							'data-num':'link-'+k,
							alt:decode(json['blocks'][j]['links'][k]['title']||'New bookmark')+' | '+json['blocks'][j]['links'][k]['href'],
							title:decode(json['blocks'][j]['links'][k]['title']||'New bookmark')+' | '+json['blocks'][j]['links'][k]['href'],
							style:{
								margin:'0 12px',
								display:'none',
								width:'calc(100% - 24px)'
							}
						}).on('load',function(ev){
							jsl(ev.target).css('display','block');
						});
						linkScreenshot.a.onerror=function(ev){
							jsl(ev.target).css('display','none');
						};
						wrapLinkSpan.append(linkScreenshot);
					}
					linkBlock.append(wrapLinkSpan);
				}
			}
			drag();
			inputBlockWrap.append(input).append(clAdd);
			inputBlock.append(inputBlockBack).append(inputBlockWrap);
			settingBlock.append(plusBlock).append(openAll).append(editBlock);
			titleBlock.append(nameBlock).append(inputName).append(settingBlock);
			block.append(wrapBlock).append(titleBlock).append(inputBlock).append(linkBlock).append(bottomBorder);
			jsl('.colum[data-num="colum-'+columNumAppend+'"]').append(block);
		}
		jsl(config.bodyId+' a').on('click',function(ev){
			var uri=ev.target.href==undefined?jsl(ev.target).parent().attr('href'):ev.target.href;
			toGo(uri,ev);
			ev.preventDefault();
			return false;
		});
	}
	jsl(config.blankId).prop('scrollTop',scrollTop);
	loader.stop();
}
function toGo(uri,ev){
	if(window.stopGo==false)
		return;
	config.openNewTab==true?window.open(uri):location=uri;
	ev.preventDefault();
	return false;
}
function addCategory(ev){
	openMenu(ev);
	jsl('.wrap-form').on('click',function(){
		jsl('.form input').on('focus');
	});
	jsl(config.popUpId).css('display','flex').on('click',function(ev){
		loader.stop();
		if(ev.target==jsl(config.popUpId).a)
			jsl(config.popUpId).css('display','none');
	});
	jsl(config.popUpId+' input[type="text"]').on('focus').val('');
}
function resizeDashboard(json){
	if(json==undefined)
		json=JSON.parse(localStorage.dataBoard);
	var body=jsl(config.bodyId),
		parrentElement=jsl(body).parent();
	parrentElement.css('width',window.innerWidth-expand+'px');
	config.columMinWid=Number(json.columMinWid)||57;
	config.maxColum=Math.trunc(parrentElement.css('offsetWidth')/Number(config.columMinWid));
	config.minColum=1;
	config.dragPoint=json.dragPoint;
	if(body.css('offsetWidth')<Number(json.countColum)*Number(config.columMinWid)){
		var arr={a:[],b:[]};
		for(var i=0;i<jsl('.colum[class="colum"]').length;i++)
			if(i>=Math.round(body.css('offsetWidth')/Number(config.columMinWid)))
				arr.a.unshift(i);
			else
				arr.b.unshift(i);
		json=refreshJson(arr,json);
		renderDashboard(json);
		resizeColum(body,json);
	}else{
		json=refreshJson(null,json);
		renderDashboard(json);
		resizeColum(body,json);
	}
}
function resizeColum(body,json){
	if(body.css('offsetWidth')<Number(json.countColum)*Number(config.columMinWid))
		jsl('.colum').css({
			width:body.css('offsetWidth')/Math.round(body.css('offsetWidth')/Number(config.columMinWid))+'px'
		});
	else
		jsl('.colum').css({
			width:body.css('offsetWidth')/Number(json.countColum)+'px'
		});
	jsl(config.bodyId).css('min-height',window.innerHeight-jsl(config.topNav).css('offsetHeight')-25+'px');
	jsl(config.bodyId+' .colum').css('min-height',jsl(config.bodyId).css('offsetHeight')+'px');
}
function auth(that){
	if(jsl(that).children('input[name="login"]').eq(0).val()==''||jsl(that).children('input[name="password"]').eq(0).val()==''){
		jsl(config.bodyId).html('').append(jsl('div').createElement({
			style:{margin:'10px'}
		}).html('<p><b>Login</b></p><p>Username or password empty</p><p>Please try again</p>'));
		return;
	}
	jsl(that).children('input[name="login"]').attr('readonly','readonly').css('cursor','not-allowed');
	jsl(that).children('input[name="password"]').attr('readonly','readonly').css('cursor','not-allowed');
	jsl(that).children('input[name="submit"]').prop('disabled',true);
	var ajax=jsl.ajax({
			url:config.domain+'/auth.php',
			type:'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
			},
			onerror:function(e){
				notificationShow(e,'error');
				loader.stop();
			},
			4:function(res){
				if(res.status!=200)
					return ajax.onerror('Error connection !');
				if(jsl.isJSON(res.response)==false)
					return ajax.onerror('Bad response !');
				jsl(config.bodyId).html('');
				clearInterval(clear);
				if(res.response!=''){
					var currenJson=JSON.parse(res.response);
					if(currenJson.error){
						if(jsl(config.bodyId+' input[type=checkbox]').length==0)
						({
							401:function(){
								var message='<p><b>Registration</b></p><p>This login was not found</p><p>To use the service, you need to apply the conditions</p>',
									conditions=jsl('label').createElement({
										class:'acept'
									}),
									check1=jsl('input').createElement({
										type:'checkbox',
										name:'acept',
										class:'acept'
									}),
									check=jsl('input').createElement({
										type:'checkbox',
										id:'check',
										name:'acept'
									}).on('change',function(ev){
										if(ev.target.checked){
											jsl(that).children('input[name="login"]').attr('readonly','readonly').css('cursor','not-allowed');
											jsl(that).children('input[name="password"]').attr('readonly','readonly').css('cursor','not-allowed');
										}
										if(!ev.target.checked){
											jsl(that).children('input[type="text"]').eq(0).removeAttribute('readonly').css('cursor','auto');
											jsl(that).children('input[type="password"]').eq(0).removeAttribute('readonly').css('cursor','auto');
										}
										check1.a.checked=ev.target.checked
									}),
									lab=jsl('label').createElement({
										for:'check'
									}).html('I accept'),
									p=jsl('span').createElement(),
									sdfsd=jsl('div').createElement({style:{margin:'10px'}}).html(message);
								conditions.append(check).append(lab).append(p);
								jsl(config.bodyId).append(sdfsd).append(conditions);
								if(jsl(config.topNav+' form').children('input[name=acept]').length==1)
									jsl(config.topNav+' form').append(check1);
								jsl(that).children('input[type="text"]').eq(0).removeAttribute('readonly').css('cursor','auto');
								jsl(that).children('input[type="password"]').eq(0).removeAttribute('readonly').css('cursor','auto');
								jsl(that).children('input[type="submit"]').prop('disabled',false);
							},
							400:function(){
								var message='<p><b>Login</b></p><p>Bad username or password</p><p>Please try again</p>',
									sdfsd=jsl('div').createElement({
										style:{margin:'10px'}
									}).html(message);
								jsl(config.bodyId).append(sdfsd);
								jsl(that).children('input[type="text"]').eq(0).removeAttribute('readonly').css('cursor','auto');
								jsl(that).children('input[type="password"]').eq(0).removeAttribute('readonly').css('cursor','auto');
								jsl(that).children('input[type="submit"]').prop('disabled',false);
							}
						})[currenJson.error]();
					}else{
						location.reload();
					}
				}
			}
		},jsl(that).formToObject()),
		clear=setInterval(function(){
			jsl(config.bodyId).html(jsl(config.bodyId).html()+'.');
		},30);
	jsl(config.bodyId).html('');
}
function authFb(){
	//alert('fb')
}
function authGo(){
	//alert('go')
}
function blurCon(value,data){
	var json=JSON.parse(localStorage.dataBoard);
	updateData(json,{
		[data]:value,
		data:data
	},'userData');
}
function changeColum(thet){
	var json=JSON.parse(localStorage.dataBoard),
		val=thet.value;
	if(Number(val)>Number(config.maxColum))val=config.maxColum;
	if(Number(val)<Number(config.minColum))val=config.minColum;
	thet.value=val;
	json.countColum=Number(val);
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	renderDashboard(json);
	resizeDashboard(json);
}
function changeMinWid(thet){
	var json=JSON.parse(localStorage.dataBoard),
		val=thet.value;
	config.columMinWid=Number(val)||45;
	json.columMinWid=Number(val);
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	renderDashboard(json);
	resizeDashboard(json);
}
function changeFlow(thet){
	var json=JSON.parse(localStorage.dataBoard);
	config.dragPoint=thet.checked;
	json.dragPoint=thet.checked;
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	blurCon(thet.checked,'dragPoint');
	renderDashboard(json);
	resizeDashboard(json);
}
function openNewTab(thet){
	var json=JSON.parse(localStorage.dataBoard);
	config.openNewTab=thet.checked;
	json.openNewTab=thet.checked;
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	blurCon(thet.checked,'openNewTab');
	renderDashboard(json);
	resizeDashboard(json);
}
function clearSess(){
	var cookies=document.cookie.split(';');
	for(var i=0;i<cookies.length;i++){
		var cookie=cookies[i],
			eqPos=cookie.indexOf('='),
			name=eqPos>-1?cookie.substr(0,eqPos):cookie;
		document.cookie=name+'=;path=/;expires='+new Date(0).toUTCString();
	}
	localStorage.removeItem('dataBoard');
	jsl.ajax({
		url:config.domain+'/auth.php?session_destroy=1',
		type:'GET',
		4:function(){
			location.reload();
		}
	});
}
function openMenu(thet){
	var arr=jsl('.menu').css('display')=='block'?['','removeClass','none']:['white','addClass','block'];
	jsl('.summary').css('color',arr[0])[arr[1]]('background');
	jsl('.menu').css('display',arr[2]);
	if(arr[2]=='block'){
		jsl('.title-block .open-all').css('display','none');
		jsl('.title-block .pencil').css('display','none');
		jsl('.title-block .plus').css('display','none');
		jsl('.link-block .pencil').css('display','none');
		window.stopGo=false;
	}
	if(arr[2]=='none'){
		jsl('.title-block .open-all').css('display','');
		jsl('.title-block .pencil').css('display','');
		jsl('.title-block .plus').css('display','');
		jsl('.link-block .pencil').css('display','');
		setTimeout(function(){window.stopGo=true;},100);
	}
}
function changeSearchService(thet){
	var json=JSON.parse(localStorage.dataBoard),
		val=thet.value;
	config.searchService=val;
	json.searchService=val;
	json.microtime=Date.now();
	localStorage.dataBoard=JSON.stringify(json);
	blurCon(thet.checked,'dragPoint');
	renderDashboard(json);
	resizeDashboard(json);
}
function loadHtml(autorized){
	if(autorized){
		jsl(config.topNav).html(config.html.topNavLog);
		jsl(config.bodyId).html(config.html.bodyId);
		jsl(config.popUpId).html(config.html.popUpId);
		jsl(config.confirmId).html('<div class="button-block"><button>Update</button></div><div class="message"></div>');
		jsl('.search-block input').on('input',function(ev){
			searchJson(ev.target.value);
		}).on('keyup',function(ev){
			if(ev.keyCode==13)
				if(jsl('.search-block input').val()!='')
					toGo(jsl('.searchservice').val()+jsl('.search-block input').val(),ev);
			if(ev.keyCode==27)
				jsl('.search-block input').val('');
			searchJson(ev.target.value);
		});
		jsl('.logo-block a').on('click',function(){
			location.reload();
		});
		jsl('.cancel').on('click',function(ev){
			jsl('.search-block input').val('');
			renderDashboard();
			resizeDashboard();
			ev.target.style.visibility='hidden';
			jsl('.search-block input').on('focus');
		});
		jsl('.button-block').on('click',function(){
			localStorage.dataBoard='';
			location.reload();
		});
		jsl('.searchservice').on('change',function(ev){
			changeSearchService(ev.target);
		});
		jsl('.summary').on('click',function(ev){
			openMenu(ev.target);
		});
		jsl('.colum-min-width').on('input',function(ev){
			changeMinWid(ev.target);
		});
		jsl('.count-colum').on('input',function(ev){
			changeColum(ev.target);
		});
		jsl('.change-flow').on('change',function(ev){
			changeFlow(ev.target);
		});
		jsl('.open-new-tab').on('change',function(ev){
			openNewTab(ev.target);
		});
		jsl('.colum-min-width').on('blur',function(ev){
			blurCon(ev.target.value,'count_min_width');
		});
		jsl('.count-colum').on('blur',function(ev){
			blurCon(ev.target.value,'count_colum');
		});
		jsl('.add-category').on('click',function(ev){
			addCategory(ev.target);
		});
		jsl('.loginout').on('click',function(ev){
			clearSess();
		});
		jsl('.form input').on('keyup',function(ev){
			appendCategory(ev);
		});
		jsl('.form input').on('keydown',function(ev){
			if(ev.keyCode==27)
				jsl(config.popUpId).css('display','none');
		});
	}else{
		jsl(config.topNav).html(config.html.topNav);
	}
}
function switchBackground(str){
	var topNaw=jsl('#top-nav').css('background-color').match(/rgba\((\d+), (\d+), (\d+), (\d.\d)/).filter(function(item, index, array){return (index>0&&index<5);})[3],
		wrap=jsl('#wrap').css('background-color').match(/rgba\((\d+), (\d+), (\d+), (\d.\d)/).filter(function(item, index, array){return (index>0&&index<5);})[3],
		wrapBlock=jsl('#wrap .block[0]').css('background-color').match(/rgba\((\d+), (\d+), (\d+), (\d.\d)/).filter(function(item, index, array){return (index>0&&index<5);})[3];
	jsl('#blank').css('background-color',`rgb(${str})`);
	str=(Number(str.split(',')[0])+Number(str.split(',')[1])+Number(str.split(',')[2]))/3;
	jsl(config.topNav).css('background-color',`rgba(${str},${topNaw})`);
	jsl(config.bodyId).css('background-color',`rgba(${str},${wrap})`);
	jsl(config.bodyId+' .block').css('background-color',`rgba(${str},${wrapBlock})`);
}
jsl(function(){
	var div=jsl('div').createElement({style:'overflow:scroll;width:50px;height:50px'}),
		div1=jsl('div').createElement({style:'width:100px;height:100px'});
	jsl(div).append(div1);
	jsl('body').append(div);
	window.expand=jsl.innerWidth-jsl.documentElement.clientWidth||jsl.innerWidth-jsl.body.offsetWidth||jsl(div).offsetWidth-jsl(div).clientWidth;
	jsl('body').remove(div);
	loader.start();
	if(localStorage.dataBoard){
		loadHtml(true);
		currenJson=JSON.parse(localStorage.dataBoard);
		renderDashboard(currenJson);
		resizeDashboard(currenJson);
	}
	jsl(function(ev){
		if(ev.keyCode==8&&ev.target==document.body){
			jsl('.search-block input').on('focus');
			ev.preventDefault();
			return false;
		}
	},['keydown']);
	jsl(function(ev){
		mouseShowHandler(ev);
	},['mousemove']);
	jsl(function(ev){
		if(ev.target.closest('.details')==null){
			if(jsl('.menu').css('display')=='block'){
				jsl('.title-block .open-all').css('display','');
				jsl('.title-block .pencil').css('display','');
				jsl('.title-block .plus').css('display','');
				jsl('.link-block .pencil').css('display','');
				setTimeout(function(){window.stopGo=true;},100);
			}
			jsl('.menu').css('display','none');
			jsl('.summary').removeClass('background').css('color','');
		}
	},['mouseup']);
	var ajax=jsl.ajax({
		url:config.domain+'/selectdata.php',
		type:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		onerror:function(e){
			loadHtml(false);
			if(localStorage.dataBoard!=null){
				renderDashboard(JSON.parse(localStorage.dataBoard));
				resizeDashboard(JSON.parse(localStorage.dataBoard));
				jsl(function(){
					resizeDashboard(JSON.parse(localStorage.dataBoard));
				},['resize']);
			}
			if(typeof e=='string')
				notificationShow(e,'error');
			loader.stop();
		},
		4:function(res){
			if(res.status!=200)
				return ajax.onerror('Error connection !');
			if(res.response==''){
				if(jsl.isJSON(localStorage.dataBoard)==false)
					return ajax.onerror('Bad response !');
				var currenJson=JSON.parse(localStorage.dataBoard),
					serverJson=JSON.parse(localStorage.dataBoard);
			}else{
				if(jsl.isJSON(res.response)==false)
					return ajax.onerror('Bad response !');
				var currenJson=JSON.parse(res.response),
					serverJson=JSON.parse(res.response);
			}
			if(serverJson.error){
				({
					530:function(){
						loadHtml(false);
						if(localStorage.dataBoard!=null)
							jsl(config.bodyId).html(config.html.bodyId);
						localStorage.removeItem('dataBoard');
						var clear=setInterval(function(){
							if(clear>2e4)
								clearInterval(clear);
							jsl(config.topNav).children('form').eq(0).on('submit',function(ev){
								auth(this.a);
								ev.preventDefault();
							});
							jsl(config.topNav).children('.social .fb').eq(0).on('click',function(ev){
								authFb(this.a);
								ev.preventDefault();
							});
							jsl(config.topNav).children('.social .go').eq(0).on('click',function(ev){
								authGo(this.a);
								ev.preventDefault();
							});
							clearInterval(clear);
						});
					},
					400:function(){
						notificationShow('Bad reques !','error');
					}
				})[serverJson.error]();
			}else{
				if(res.response!=localStorage.dataBoard){
					if(localStorage.dataBoard==null||localStorage.dataBoard==''){
						currenJson=serverJson;
						localStorage.dataBoard=JSON.stringify(currenJson);
						location.reload();
					}else{
						var clientJson=JSON.parse(localStorage.dataBoard);
						if(Number(serverJson.microtime)>Number(clientJson.microtime)){
							jsl(config.confirmId+' .message').html('<p>На сервере найдены более актуальные данные.</p><p>Вы желаете обновить данные на вашем компьютере?</p>');
							jsl(config.confirmId).css('display','block');
							jsl(config.confirmId+' button').on('click', function(){
								currenJson=serverJson;
								notificationShow('Load data.','message');
								localStorage.removeItem('dataBoard');
								location.reload();
							});
						}
						if(Number(serverJson.microtime)<Number(clientJson.microtime)){
							jsl(config.confirmId+' .message').html('<p>На вашем компьютере найдены более актуальные данные.</p><p>Вы желаете обновить данные на сервере?</p>');
							jsl(config.confirmId).css('display','block');
							jsl(config.confirmId+' button').on('click', function(){
								currenJson=clientJson;
								notificationShow('Load data.','message');
								updateData(currenJson,{},'sinhronize');
								location.reload();
							});
						}
						if(Number(serverJson.microtime)==Number(clientJson.microtime)){
							currenJson=serverJson;
							localStorage.dataBoard=JSON.stringify(currenJson);
							renderDashboard(currenJson);
							resizeDashboard(currenJson);
						}
					}
				}
				jsl(function(){
					resizeDashboard(JSON.parse(localStorage.dataBoard));
				},['resize']);
			}
			loader.stop();
		}
	},localStorage.dataBoard);
	/*
	// goo analitics
	window.dataLayer=window.dataLayer||[];
	function gtag(){dataLayer.push(arguments);}
	gtag('js',new Date());
	gtag('config','UA-39942370-3');
	// fb auth нужен https
	(function(d,s,id){
		var js,
			fjs=d.getElementsByTagName(s)[0];
		if(d.getElementById(id))
			return;
		js=d.createElement(s);
		js.id=id;
		js.src="https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js,fjs);
	}(document,'script','facebook-jssdk'));
	function statusChangeCallback(){
	}
	window.fbAsyncInit=function(){
		FB.init({
			appId:'415247762572553',
			cookie:true,
			xfbml:true,
			version:'v3.2'
		});
		FB.AppEvents.logPageView();
	};
	FB.getLoginStatus(function(response){
		statusChangeCallback(response);
	});
	*/
},['DOMContentLoaded']);