;'use strict';!
(function(aa,ab){
	var va={
			error:function(e){throw new Error(e);},
			log:function(){console.log(arguments);},
			msg:{
				ab:'bad request',
				ac:'jsl is experiencing a conflict',
				ad:'requires a window with the document',
				ae:'type mismatch',
				af:'this database has been created',
				ag:'bad type data',
				ah:'this browser does not support desktop notification',
				ai:'reserved',
				ak:'this item is not available',
				al:'method is not defined',
				am:'this method or property is reserved'
			},
			name:'JSL (JavaScript Library)',
			nn:[,'6a',73,'6c'].join('%ue9')
		},
		vb=typeof module==='object'&&typeof module.exports==='object'?module.exports=aa.document?ab(aa,ab):function(a){!a.document&&va.error(va.msg.ad);return ab(a,ab);}:ab(aa,ab);
	aa[vb.charOf(va.nn)]===void 0?(vb.fn=va,aa.do=document,aa[vb.charOf(va.nn)]=vb,aa.addEventListener('DOMContentLoaded',function(){vb.fn.DOMCL=!0;},!1)):va.error(va.msg.ac);
})(typeof window!='undefined'?window:this,function(ww,Fn){
	var ty={a:function(v){return v==null?!1:v instanceof NodeList||v instanceof HTMLCollection?!0:Array.isArray(v);},b:function(v){return typeof v==='boolean';},
			d:function(v){return v instanceof HTMLElement},e:function(v){return v==='';},f:function(v){return typeof v==='function';},n:function(v){return typeof v==='number';},
			o:function(v){return v instanceof NodeList||v instanceof HTMLCollection||Array.isArray(v)?!1:typeof v==='object';},s:function(v){return typeof v==='string';},
			sy:function(v){return typeof v==='symbol';},u:function(v){return v===void 0;},N:function(v){return typeof v==='number'&&isNaN(v);}
		},
		ga=function(a,b,c,d){ty.u(gc.change)&&(gc.change={});ty.u(gc.change[a])&&(gc.change[a]={});ty.u(gc.change[a][b])&&(gc.change[a][b]={});gc.change[a][b][c]=d;},
		gb=function(a,b,c,d){Object.defineProperty(a,b,{value:c,writable:!1,enumerable:!1,configurable:d||!1});},
		gc=function(a,b){return Fn.re.dom(a,b);},
		gd={},ge={},gf={},gg={},gh={},gi={},gk=[],gl=[],gm,
		gn=ty.f(ww.Proxy)?new Proxy(gc,{
			get:function(a,b){
				var va=function(aa){
					return ty.f(aa[b])?function(c,d,e,f,g){
						return aa[b](c,d,e,f,g);
					}:aa[b];
				};
				if(ty.u(a[b])){
					if(!ty.u(window.document[b]))
						return va(window.document);
					if(!ty.u(window[b]))
						return va(window);
				}else 
					return a[b];
			},
			set:function(a,b,c){
				ty.u(a[b])||a.hasOwnProperty(b)?a[b]=c:gc.fn.error(gc.fn.msg.am);
				return true;
			}
		}):gc;
	return gb(Fn,'re',function(a,b){
		if(ty.a(a)){
			this.a=a;
			this.selector='Array';
			this.length=a.length;
		}
		if(ty.f(a)){
			if(ty.a(b)){
				for(var i=0;i<b.length;i++){
					gk.indexOf(ww)===-1&&
						gk.push(ww);
					var va=/\[object [a-zA-Z]+\]/.test(String(ww))?ww+gk.indexOf(ww):ww,
						vb=b[i],
						fa=function(ev){
							for(var j=0;j<gh[va][vb].length;j++){
								ty.f(gh[va][vb][j])&&
									ty.s(gh[va][vb][j].tagName)&&
										gh[va][vb][j].tagName===ev.target.tagName&&
											gh[va][vb][j](ev);
								ty.u(gh[va][vb][j].tagName)&&
									gh[va][vb][j](ev);
							}
						};
					if(/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(va)!=null){
						var vc=/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(va);
						va=vc[1]+vc[2]+vc[3];
					}
					gh[va]=gh[va]||{};
					gh[va][vb]=gh[va][vb]||[];
					gh[va][vb].push(function(ev){
						gi.creator=gc.fn.name;
						gi.fn=a;
						gi.fn(ev);
					});
					ww.addEventListener(vb,fa,b||!1);
				}
			}else{
				gi.creator=gc.fn.name;
				gi.fn=a;
				gm=gi.fn(gm||void 0);
				ty.f(gi.fn.next)&&
					(a=Fn.re(gi.fn.next));
			}
			return a;
		}
		if(ty.o(a)){
			if(ty.o(a.a)&&ty.s(a.selector)&&ty.n(a.length)){
				this.a=a.length===1?a.a:[];
				if(a.length>1)
					for(var i=0;i<a.a.length;i++)
						this.a.push(a.a[i]);
				this.selector=a.selector;
				this.length=a.length;
				return this;
			}else{
				var va=a.toString().match(/\[object HTML([a-zA-Z]+)/),
					vb=a.toString().match(/\[object ([A-Z][a-z]+)/);
				this.a=a;
				this.length=1;
				if(a===ww)return this.selector='window';
				if(a===ww.do)return this.selector='document';
				if(ty.a(va))return this.selector=va[1].toLowerCase();
				if(ty.s(a.href))return this.selector='a';
				if(ty.a(a))for(var i=0;i<a.length;i++)if(ty.o(a[i]))return this.selector=a;
				if(ty.a(vb))if(vb[1]==='Object')return a;
				if(va==null&&vb==null)return a;
			}
		}
		if(ty.s(a)){
			var fa=function(aa){
				var fb=function(ab){
					var fc=(function(ac){
						var va=[/^(.+)\[(\d+)-(\d+)\]$/im,/^(.+)\((\d+),(\d+)\)$/im,/^(.+)\[(\d+)-\]$/im,/^(.+)\[(\d+)\]$/im,/^(.+)!(\d+)$/im,/^(.+):(\d+)$/im];
						for(var i=0;i<va.length;i++){
							var vb=ac.match(va[i]);
							if(ty.a(vb)){
								vb=vb.map(function(aa){var va=+aa;return ty.N(va)?aa:va;});
								ab=vb[1];
								return[[[vb[2],vb[3]],0,ab],[[vb[2],vb[3]],1,ab],[[vb[2],vb[3]],2,ab],[vb[2],4,ab],[vb[2],3,ab],[vb[2],4,ab]][i];
							}
						}
						return!1;
					})(ab);
					try{
						var va=ww.do.querySelectorAll(ab);
					}catch(e){
						return null;
					}
					if(ty.a(fc)){
						switch(fc[1]){
							case 0:{var vb=[];if(fc[0][0]>=0&&fc[0][1]>=0&&fc[0][0]<=fc[0][1])for(var i=fc[0][0];i<=fc[0][1];i++)if(ty.o(va[i]))vb.push(va[i]);va=vb;};break;
							case 1:{var vb=[];if(fc[0][0]>=0&&fc[0][1]>=0)for(var i=fc[0][0],j=0;j<fc[0][1];i++,j++)if(ty.o(va[i]))vb.push(va[i]);va=vb;};break;
							case 2:{var vb=[];if(fc[0][0]>=0&&!fc[0][1])for(var i=fc[0][0];i<=va.length;i++)if(ty.o(va[i]))vb.push(va[i]);va=vb;};break;
							case 3:{var vb=[];for(var i=0;i<va.length;i++)if(ty.o(va[i]))vb.push(va[i]);vb.splice(fc[0],1);va=vb;};break;
							case 4:va=va[fc[0]];break;
						}
					}
					return va;
				},va=aa.split(/(?!\([^)]*),(?![^(]*\))/);
				if(va.length>1){
					var vb=[];
					for(var i=0;i<va.length;i++){
						var vc=fb(va[i]);
						if(ty.a(vc))
							for(var j=0;j<vc.length;j++)
								vb.push(vc[j]);
						else 
							vb.push(vc);
					}
					return vb;
				}
				return fb(aa);
			},va=fa(a);
			va==null||va.length===0?gc.fn.DOMCL===!0?(this.a=null,this.length=0):(ww.addEventListener('DOMContentLoaded',this.a=function(){
				var va=fa(a).length===0?null:fa(a);
				for(var i in gg)
					for(var j in gg[i])
						for(var k=0;k<gg[i][j].length;k++)
							gc(i)[j](gg[i][j][k][0],gg[i][j][k][1],gg[i][j][k][2],gg[i][j][k][3]);
				return va==null?va:va.length===1&&ty.o(va[0])?va[0]:va;
			},b&&!0),this.length=void 0):(this.length=ty.u(va.length)&&ty.o(va)&&va!=null?1:va.length,this.a=ty.a(va)||ty.o(va)?this.length===1&&ty.o(va[0])?va[0]:va:null);
			this.selector=a;
		}
	}),gb(Fn.re,'dom',function(a,b){
		var ba={
			forEach:function(c){
				(ty.f(this.a))&&bb('forEach',c);
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.f(c)){
					if(ty.o(this.a))
						c(this.a,0,1);
					if(ty.a(this.a))
						for(var i=0;i<this.length;i++)
							c(this.a[i],i,this.length);
				}
				return this;
			},
			addClass:function(c){
				(ty.f(this.a))&&bb('addClass',c);
				if(ty.f(this.a)||this.a==null)return this;
				if(!ty.e(this.a.className))
					for(var i=0;i<this.a.className.split(' ').length;i++)
						if(this.a.className.split(' ')[i]===c)
							return this;
				ga(a,'addClass','className',c);
				if(ty.a(this.a))
					for(var i=0;i<this.a.length;i++)
						this.a[i].className=ty.e(this.a[i].className)||ty.u(this.a[i].className)?c:this.a[i].className+' '+c;
				if(ty.o(this.a))
					this.a.className=ty.e(this.a.className)||ty.u(this.a.className)?c:this.a.className+' '+c;
				return this;
			},
			animate:function(c,d,e){
				if(ty.f(this.a)||this.a==null)return this;
				var va=this;
				if(ty.o(c)){
					var z={
						colorRotate:function(f){
							var vb=(va.a.style.backgroundColor||'rgb(255,255,255)').match(/[rgb|rgba]+\((\d+), ?(\d+), ?(\d+)\)*/),
								vc=[+vb[1],+vb[2],+vb[3]],
								fa=function(){setTimeout(function(){
									for(var i=0;i<vc.length;i++)
										if(vc[i]<255)vc[i]=vc[i]+5;
									new Fn.re(va.a,b).css('background','rgb('+vc.join(',')+')');
									if(f.join('')!=vc.join(''))fa();
								},d);};
							fa();
						},
						opacity:function(f){
							var vb=va.a.opacity=va.a.style.opacity=new Fn.re(a,b).css('opacity')||1,
								fa=function(){setTimeout(function(){
									vb=va.a.opacity=va.a.style.opacity=(vb>f?+vb-e:(+vb)+e).toFixed(2);
									ga(a,'animate','opacity',vb);
									if(vb!=f)fa();
								},vc);};
							e=e||.05;
							e=e<.01?.01:e;
							var vc=vb>f?(d/((vb-f)/e)):(d/((f-vb)/e));
							if(vb!=f)fa();
						},
						scrollTop:function(f){
							var vb=va.animate('scrollTop'),
								vc=va.animate('scrollLeft'),
								fa=function(){setTimeout(function(){scrollTo(vc,vb<f?f-8+i:f+8-i);if(i!=8)fa();i++;},d);},
								i=0;
							if(Math.abs(vb-f)>10&&Math.abs(f-vb)>10){
								scrollTo(vc,vb<f?f-8:f+8);
								if(vb!=f)fa();
							}else 
								scrollTo(vc,f);
						},
						scrollElem:function(f){
							var vb,vc,i=0,
								vd=new Fn.re(a,b).getCoordinates(),
								fa=function(){setTimeout(function(){
									if(i<f[1]){
										if(f[0]===0||f[0]===1)vc=vc-1;
										if(f[0]===2||f[0]===3)vc=vc+1;
										if(f[0]===0||f[0]===2){vb={top:vc+'px'};}
										if(f[0]===1||f[0]===3){vb={left:vc+'px'};}
										new Fn.re(a,b).css(vb);
										i++;
										fa();
									}
								},d/f[1]);};
							if(f[0]===0||f[0]===2)vc=vd.top;
							if(f[0]===1||f[0]===3)vc=vd.left;
							fa();
						}
					};
					for(var i in c)if(ty.f(z[i]))z[i](c[i]);
				}
				if(ty.s(c)){
					if(c==='scrollTop'&&ty.u(d)&&ty.u(e))
						return this.a===ww||a==='body'?
							ww.pageYOffset?
							ww.pageYOffset:
							ww.do.documentElement.scrollTop?
							ww.do.documentElement.scrollTop:
							ww.do.body.scrollTop:
							this.a.scrollTop;
					if(c==='scrollLeft'&&ty.u(d)&&ty.u(e))
						return this.a===ww||a==='body'?
							ww.pageXOffset?
							ww.pageXOffset:
							ww.do.documentElement.scrollLeft?
							ww.do.documentElement.scrollLeft:
							ww.do.body.scrollLeft:
							this.a.scrollLeft;
					if(c==='scrollTop'&&ty.n(d)&&ty.u(e))ww.scrollTo(va.animate('scrollLeft'),d);
					if(c==='scrollLeft'&&ty.n(d)&&ty.u(e))ww.scrollTo(d,va.animate('scrollTop'));
					if(c==='scrollTo'&&ty.n(d)&&ty.n(e))ww.scrollTo(d,e);
				}
				return this;
			},
			append:function(c,d){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)||ty.o(c)||ty.a(c)){
					var fa=function(aa,ab){
						if(ty.s(c)){
							var va=ty.u(d)?ww.do.createElement('DIV'):ww.do.createElement(d);
							va.innerHTML=c;
							ga(aa,'append','appendChild',va.children[0]);
							aa.appendChild(va.children[0])
						}
						if(ty.a(c)){
							for(var i=0;i<c.length;i++){
								var vb=(ty.o(c[i].a)&&ty.s(c[i].selector)&&ty.n(c[i].length))?c[i].a:c[i];
								vc=ab?vb.cloneNode(!0):vb;
								aa.appendChild(vb);
							}
						}
						if(ty.o(c)){
							var vb=(ty.o(c.a)&&ty.s(c.selector)&&ty.n(c.length))?c.a:c,
								vc=ab?vb.cloneNode(!0):vb;
							aa.appendChild(vc);
						}
					};
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							fa(this.a[i],!0);
					else 
						fa(this.a,!1);
				}
				return this;
			},
			attr:function(c,d){
				(ty.f(this.a))&&bb('attr',c,d);
				if(ty.f(this.a)||this.a==null)return this;
				var fa=function(aa,ab,ac){
					if(!ty.s(ab))
						return;
					if(ty.a(ac))
						for(var i=0;i<ac.length;i++)
							if(ty.f(ac[i].setAttribute))
								ac[i].setAttribute(aa,ab);
					if(!ty.a(ac)&&ty.o(ac))
						ac.setAttribute(aa,ab);
				};
				if(ty.s(c)&&ty.s(d)){
					fa(c,d,this.a);
					ga(a,'attr',c,d);
				}
				if(ty.o(c)&&ty.u(d)){
					for(var i in c){
						fa(i,c[i],this.a);
						ga(a,'attr',i,c[i]);
					}
				}
				if(ty.s(c)&&ty.u(d)){
					if(ty.a(this.a)){
						var va=[];
						for(var i=0;i<this.a.length;i++)
							if(ty.o(this.a[i]))
								va[i]=this.a[i].getAttribute(c);
						return va;
					}
					if(ty.o(this.a))
						return this.a.getAttribute(c);
				}
				return this;
			},
			blur:function(){
				if(ty.f(this.a)||this.a==null)return this;
				this.a.blur();
				return this;
			},
			children:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)){
					if(ty.f(this.a.querySelector)){
						if(ty.o(a)){
							let va=[],
								vb=ww.do.createElement('DIV'),
								vc=this.a.children;
							for(let i=0;i<vc.length;i++){
								vb.appendChild(vc[i].cloneNode(!0));
								if(vb.querySelector(c)!=null)
									va.push(vc[i]);
								vb.innerHTML='';
							}
							this.a=va;
						}
						if(ty.s(a)){
							this.a=this.a.querySelectorAll(c);
						}
					}
					this.selector=a+'>'+c;
				}
				if(ty.n(c)){
					this.a=this.a.children[c];
					this.selector=a+'>['+c+']';
				}
				if(ty.u(c)){
					if(this.a.children)
						this.a=this.a.children;
					this.selector=''+this.a;
				}
				if(ty.o(c)){
					if(this.a.children){
						var va=this.a.children;
						if(ty.o(c.a)&&ty.s(c.selector)&&ty.n(c.length))
							var c=c.a;
						this.a=null;
						for(var i=0;i<va.length;i++){
							if(va[i]===c){
								this.a=va[i];
								break;
							}
						}
						if(ty.o(c.a)&&ty.s(c.selector)&&ty.n(c.length))
							this.selector=''+c.a.children;
						else 
							this.selector=''+c.children;
					}
				}
				if(ty.u(this.a)){
					this.a=null;
					this.length=0;
				}
				if(this.a==null)
					this.length=0;
				if(!ty.u(this.a)&&ty.a(this.a)&&this.a!=null)
					this.length=this.a.length;
				return this;
			},
			childrenAll:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)){
					if(ty.f(this.a.querySelectorAll)){
						var va=this.a.querySelectorAll(c),
							vb=[];
						for(var i=0;i<va.length;i++)
							vb.push(va[i]);
						this.a=vb;
					}
					this.selector=a+' '+c;
				}
				if(ty.n(c)){
					var va=this.a.querySelectorAll('*'),
						vb=va[c];
					this.selector=a+' ['+c+']';
					this.a=vb;
				}
				if(ty.u(c)){
					var va=this.a.querySelectorAll('*'),
						vb=[];
					for(var i=0;i<va.length;i++)
						vb.push(va[i]);
					this.selector=''+this.a;
					this.a=vb;
				}
				if(ty.u(this.a)){
					this.a=null;
					this.length=0;
				}
				if(this.a==null)
					this.length=0;
				if(!ty.u(this.a)&&ty.a(this.a)&&this.a!=null)
					this.length=this.a.length;
				return this;
			},
			createElement:function(c){
				var va=ww.do.createElement(a);
				if(ty.o(c))
					for(var i in c)
						if(i==='style'&&ty.o(c[i]))
							for(var j in c[i])
								va.style[j]=c[i][j];
						else 
							va.setAttribute(i,c[i]);
				this.a=va;
				this.length=1;
				this.selector=a;
				return this;
			},
			css:function(c,d){
				(ty.f(this.a))&&bb('css',c,d);
				if(ty.f(this.a)||this.a==null)return this;
				if((ty.s(c)||ty.o(c))&&(ty.s(d)||ty.u(d))){
					if((ty.o(this.a)||ty.a(this.a))&&this.a!=null){
						var fa=function(aa){
							if(ty.s(c)&&ty.s(d)){
								aa.style[c]=d;
								ga(aa,'css',c,d);
							}
							if(ty.o(c)&&ty.u(d)){
								for(var i in c){
									aa.style[i]=c[i];
									ga(aa,'css',i,c[i]);
								}
							}
						};
						if(ty.a(this.a))
							for(var i=0;i<this.a.length;i++){
								if(ty.o(this.a[i]))
									fa(this.a[i]);
							}
						if(ty.o(this.a))
							fa(this.a);
					}
					if(ty.s(c)&&ty.u(d)){
						var fa=function(aa){
							if(ty.o(aa.style))
								if(!ty.u(aa.style[c])&&!ty.e(aa.style[c])&&aa.style[c]!='auto')
									return aa.style[c];
							if(!ty.u(aa[c])&&!ty.e(aa[c])&&aa[c]!='auto')
								return aa[c];
							return!1;
						},va,vb,vc=getComputedStyle(this.a,null);
						if(c==='outerHeight'||c==='outerWidth'){
							va=[
								parseInt(vc['margin-top']),
								parseInt(vc['margin-right']),
								parseInt(vc['margin-bottom']),
								parseInt(vc['margin-left'])
								];
							if(c==='outerHeight'){vb=1;c='offsetHeight';}
							if(c==='outerWidth'){vb=2;c='offsetWidth';}
						}
						if(fa(this.a)!=!1){
							if(vb===1)return fa(this.a)+va[0]+va[2];
							if(vb===2)return fa(this.a)+va[1]+va[3];
							return fa(this.a);
						}
						try{
							return vc[c]||this.a.currentStyle[c];
						}catch(e){};
						return'';
					}
				}
				return this;
			},
			data:function(c){
				if(ty.o(c)){
					gd[a]=gd[a]||{};
					for(var i in c)
						gd[a][i]=c[i];
				}
				if(ty.s(c))
					if(!ty.u(gd[a]))
						return gd[a][c];
				if(ty.u(c))
					return gd[a];
				return this;
			},
			drgdrp:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				this.a.onmousedown=function(ev){
					var va=ww.do.elementFromPoint(ev.clientX,ev.clientY),
						vb=ty.u(ev.offsetX)?ev.layerX:ev.offsetX,
						vc=ty.u(ev.offsetY)?ev.layerY:ev.offsetY;
					va.style.zIndex=1e3;
					va.style.position='fixed';
					va.style.top=((+ev.clientY)-vc)+'px';
					va.style.left=((+ev.clientX)-vb)+'px';
					ww.do.onmouseup=function(ev){ww.do.onmousemove=null;ww.do.body.onmousedown=null;};
					ww.do.onselectstart=function(ev){ev.preventDefault();};
					ww.do.ondragstart=function(ev){ev.preventDefault();};
					ww.do.onmousemove=function(ev){
						if(c!=2&&(+ev.pageY-vc)>0)
							va.style.top=(+ev.pageY-vc)+'px';
						if(c!=1&&(+ev.pageX-vb)>0)
							va.style.left=(+ev.pageX-vb)+'px';
					};
				};
				return this;
			},
			each:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.f(c)){
					if(ty.o(this.a))
						c.call(this.a);
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							c.call(this.a[i]);
				}
				return this;
			},
			eq:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.n(c)){
					this.a=this.a[c];
					this.selector=this.selector+'['+c+']';
					this.length=this.a.length||1;
				}
				if(ty.s(c)){
					var va=[];
					if(!Element.prototype.matches)
						Element.prototype.matches=Element.prototype.matchesSelector||
						Element.prototype.webkitMatchesSelector||
						Element.prototype.mozMatchesSelector||
						Element.prototype.msMatchesSelector;
					for(var i=0;i<this.a.length;i++)
						if(this.a[i].matches(c))
							va.push(this.a[i]);
					this.a=va;
					this.selector=this.selector+c;
					this.length=va.length;
				}
				if(ty.a(c)){
					var va=[];
					for(var i=0;i<c.length;i++)
						if(!ty.u(this.a[c[i]]))
							va.push(this.a[c[i]]);
					this.a=va;
					this.selector=this.selector+'['+c+']';
					this.length=va.length;
				}
				return this;
			},
			fullScreen:function(){
				if(ty.f(this.a)||this.a==null)return this;
				var va=this.a;
				!document.fullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement?
				va.requestFullscreen?
				va.requestFullscreen():
				va.webkitRequestFullscreen?
				va.webkitRequestFullscreen():
				va.mozRequestFullScreen?
				va.mozRequestFullScreen():
				va.msRequestFullscreen?
				va.msRequestFullscreen():'':
				document.cancelFullScreen?
				document.cancelFullScreen():
				document.webkitCancelFullScreen?
				document.webkitCancelFullScreen():
				document.mozCancelFullScreen?
				document.mozCancelFullScreen():
				document.msRequestFullscree?
				document.msCancelFullScreen():'';
			},
			getCoordinates:function(){
				if(ty.f(this.a)||this.a==null)return this;
				return(function(aa){
					var va=aa.getBoundingClientRect(),
						vb=ww.do.body,
						vc=ww.do.documentElement,
						vd=ww.pageYOffset||vc.scrollTop||vb.scrollTop,
						ve=ww.pageXOffset||vc.scrollLeft||vb.scrollLeft,
						vf=vc.clientTop||vb.clientTop||0,
						vg=vc.clientLeft||vb.clientLeft||0,
						vh=va.top+vd-vf,
						vi=va.left+ve-vg;
					return{top:vh,left:vi};
				})(this.a);
			},
			getEvents:function(c){
				if(ty.s(c))
					if(ty.o(gh[a]))
						return gh[a][c];
				if(ty.u(c))
					return gh[a];
				return gh;
			},
			getFocused:function(c){
				if(this.a!=ww)return;
				var fa=function(){
					if((ww.do.visibilityState||ww.do.webkitVisibilityState)==='hidden')return!1;
					if((ww.do.visibilityState||ww.do.webkitVisibilityState)==='visible')return!0;
				};
				if(ty.f(c)){
					if(!fa())ww.addEventListener('focus',function(){c();},!1);
					if(fa())c();
				}
				return ty.u(c)||ty.f(c)?fa():this;
			},
			getIndex:function(){
				if(ty.f(this.a)||this.a==null)return this;
				for(var i=0;i<new Fn.re(this.a.tagName,b).a.length;i++)
					if(new Fn.re(this.a.tagName,b).a===this.a)
						return i;
				return this;
			},
			html:function(c){
				(ty.f(this.a))&&bb('html',c);
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.o(c)||ty.s(c)){
					var fa=function(aa){
						if(ty.o(c)){
							aa.innerHTML='';
							aa.appendChild(c);
							ga(a,'html','innerHTML','');
						}
						if(ty.s(c)){
							aa.innerHTML=c;
							ga(a,'html','innerHTML',c);
						}
					};
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							fa(this.a[i]);
					if(ty.o(this.a))
						fa(this.a);
				}
				if(ty.u(c))
					return this.a.innerHTML;
				return this;
			},
			off:function(c,d,e){
				if(ty.f(this.a)||this.a==null)return this;
				if((ty.s(c)&&ty.f(d)&&ty.u(e))||(ty.s(c)&&ty.s(d)&&ty.f(e))){
					var va,vb=a,vc;
					if(ty.s(c)&&ty.f(d)&&ty.u(e))
						va=d;
					if(ty.s(c)&&ty.s(d)&&ty.f(e))
						va=e;
					if(/\[object [a-zA-Z]+\]/.test(String(a))){
						vc=/\[object [a-zA-Z]+\]/.test(String(a))?vb+gk.indexOf(a):vb;
						if(/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(vc)!=null){
							var vd=/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(vc);
							vc=vd[1]+vd[2]+vd[3];
						}
						if(gk.indexOf(a)!=-1){
							for(var i=0;i<gh[vc][c].length;i++){
								if(String(va).replace(/\s+/g,' ')===String(gh[vc][c][i]).replace(/\s+/g,' ')){
									gh[vc][c].splice(i,1);
								}
							}
						}
					}else{
						if(ty.o(gh[vb])){
							if(ty.a(gh[vb][c])){
								for(var i=0;i<gh[vb][c].length;i++){
									if(va===gh[vb][c]){
										gh[vb][c].splice(i,1);
										break;
									}
								}
							}
						}
					}
				}
				return this;
			},
			on:function(c,d,e){
				(ty.f(this.a))&&bb('on',c,d,e);
				if(ty.f(this.a)||this.a==null)return this;
				var va=/\[object [a-zA-Z]+\]/.test(String(a)),
					vb=[
						ty.s(c)&&ty.f(d)&&ty.u(e),
						ty.s(c)&&ty.s(d)&&ty.f(e),
						ty.s(c)&&ty.s(d)&&e==null,
						ty.s(c)&&d==null
					],
					vc,
					vd,
					ve={
						a:this.a,
						length:this.length,
						selector:this.selector
					},
					fa=function(ev){
						for(var i=0;i<gh[vc][c].length;i++){
							if(ty.f(gh[vc][c][i])){
								var va={fn:gh[vc][c][i]};
								for(var j in ve)
									va[j]=ve[j];
								if(ty.s(gh[vc][c][i].tagName))
									if(gh[vc][c][i].tagName===ev.target.tagName)
										va.fn(ev);
								if(ty.u(gh[vc][c][i].tagName))
									va.fn(ev);
							}
						}
					};
				if(vb[0]||vb[1]||vb[2]||vb[3]){
					if(gk.indexOf(a)===-1&&va)
						gk.push(a);
					vc=va?a+gk.indexOf(a):a;
					if(/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(vc)!=null){
						vd=/(.*)\[[a-zA-Z]+ ([a-zA-Z]+)\](.*)/.exec(vc);
						vc=vd[1]+vd[2]+vd[3];
					}
					if(ty.s(a)&&ty.s(this.selector))
						if(a!=this.selector&&!/^[a-zA-Z0-9\[\] ]+$/.test(this.selector))
							vc=this.selector;
					gh[vc]=gh[vc]||{};
					gh[vc][c]=gh[vc][c]||[];
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							if(ty.o(this.a[i]))
								this.a[i]['on'+c]=fa;
					if(ty.o(this.a))
						this.a['on'+c]=fa;
				}
				if(vb[0]||vb[1]){
					if(ty.s(c)&&ty.f(d)&&ty.u(e))
						vd=[d];
					if(ty.s(c)&&ty.s(d)&&ty.f(e))
						vd=[e];
					if(ty.f(this.a['on'+c]))
						if(String(this.a['on'+c]).replace(/\s+/g,' ')!=String(fa).replace(/\s+/g,' '))
							vd.push(this.a['on'+c]);
					for(var i=0;i<gh[vc][c].length;i++)
						for(var j=0;j<vd.length;j++)
							if(String(gh[vc][c][i]).replace(/\s+/g,' ')===String(vd[j]).replace(/\s+/g,' '))
								vd.splice(j,1);
					for(var i=0;i<vd.length;i++){
						if(ty.s(d))
							vd[i].tagName=d;
						gh[vc][c].push(vd[i]);
					}
				}
				if(vb[2]||vb[3]){
					if(ty.o(gh[vc]))
						gh[vc][c]=[];
					if(ty.f(e))
						gh[vc][c].push(e);
				}
				if(ty.s(c)&&ty.u(d)&&ty.u(e)){
					if(ty.o(this.a)||ty.a(this.a)||ty.s(this.a)){
						if(ty.f(this.a[c]))
							this.a[c]();
						if(ty.f(this.a['on'+c]))
							this.a['on'+c]();
					}
				}
				return this;
			},
			parent:function(){
				if(ty.f(this.a)||this.a==null)return this;
				if(this.a.parentNode)
					this.a=this.a.parentNode;
				this.selector=this.a.parentNode+'';
				return this;
			},
			prop:function(c,d){
				(ty.f(this.a))&&bb('prop',c,d);
				if(ty.f(this.a)||this.a==null)return this;
				var fn=function(c,d){
					ga(a,'prop',c,d);
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							this.a[i][c]=d;
					if(ty.o(this.a))
						this.a[c]=d;
				};
				if(ty.s(c)&&!ty.u(d)){
					ga(a,'prop',c,d);
					if(ty.a(this.a))
						for(var i=0;i<this.a.length;i++)
							this.a[i][c]=d;
					if(ty.o(this.a))
						this.a[c]=d;
				}
				if(ty.o(c)&&ty.u(d)){
					for(var i in c){
						ga(a,'prop',i,c[i]);
						if(ty.a(this.a))
							for(var j=0;j<this.a.length;j++)
								this.a[j][i]=c[i];
						if(ty.o(this.a))
							this.a[i]=c[i];
					}
				}
				if(ty.s(c)&&ty.u(d))
					return!ty.u(this.a[c])?this.a[c]:this.a;
				return this;
			},
			remove:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)||ty.o(c)){
					var fa=function(aa){
						if(ty.s(c)){
							var va=aa.querySelector(c);
							if(va!=null)
								aa.removeChild(va);
						}
						if(ty.o(c)){
							if(ty.o(c.a)&&ty.s(c.selector)&&ty.n(c.length)){
								ga(aa,'remove','removeChild',c.a);
								aa.removeChild(c.a);
							}else{
								ga(aa,'remove','removeChild',c);
								aa.removeChild(c);
							}
						}
					};
					if(ty.a(this.a)){
						for(var i=0;i<this.a.length;i++)
							if(ty.o(this.a[i]))
								fa(this.a[i]);
					}
					if(ty.o(this.a))
						fa(this.a);
				}
				return this;
			},
			removeClass:function(c){
				(ty.f(this.a))&&bb('removeClass',c);
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)&&!ty.e(this.a.className)&&!ty.u(this.a.className)){
					var va=this.a.className.split(' ');
					for(var i=0;i<va.length;i++)
						if(va[i]===c)
							va.splice(i,1);
					this.a.className=va.join(' ');
					ga(a,'removeClass','className',c);
				}
				return this;
			},
			shiftEventListener:function(c){
				return ty.s(c)&&ty.o(gh[a][c])?{
					getIndex:function(d){
						if(ty.f(d)||ty.s(d))
							for(var i=0;i<gh[a][c].length;i++)
								if(String(gh[a][c][i])===String(d))
									return i;
					},
					swap:function(d,e){
						if(ty.f(d))d=this.getIndex(d);
						if(ty.f(e))e=this.getIndex(e);
						if(ty.n(d)&&ty.n(e)){
							var va=gh[a][c][d];
							gh[a][c][d]=gh[a][c][e];
							gh[a][c][e]=va;
						}
					},
					insertAfter:function(d,e){
						if(ty.f(e))e=this.getIndex(e);
						if(ty.f(d)&&ty.n(e))
							gh[a][c].splice(e+1,0,d);
					},
					remove:function(d){
						if(ty.n(d))
							gh[a][c].splice(d,1);
						if(ty.f(d))
							gh[a][c].splice(this.getIndex(d),1);
					},
					transferTo:function(d,e){
						if(ty.f(d))d=this.getIndex(d);
						if(ty.f(e))e=this.getIndex(e);
						if(ty.n(d)&&ty.n(e)){
							var va=gh[a][c][d];
							gh[a][c].splice(d,1);
							gh[a][c].splice(e,1,va);
						}
					}
				}:gh[a];
			},
			submit:function(c){
				(ty.f(this.a))&&bb('submit',c);
				if(ty.f(this.a)||this.a==null)return this;
				gc.fn.smb=gc.fn.smb||{};
				if(ty.s(c)){
					var fa=function(aa){
						for(var i=0;i<aa.length;i++){
							var fb=function(ab,ac){
									if(ty.e(aa[i].value)||aa[i].value.length<ac||!ab.test(String(aa[i].value)))
										return!1;
								},
								fc=function(){
									aa[i].focus();
									gc(aa[i]).css('background','rgb(255,200,200)').animate({colorRotate:[255,255,255]},50);
								};
							switch(aa[i].getAttribute('type')){
								case 'text':if(fb(/^[\w.@+ -]{4,50}$/,1)===!1){fc();return!1;}break;
								case 'login':if(fb(/^[\w.@+ -]{4,50}$/,4)===!1){fc();return!1;}break;
								case 'password':if(fb(/^[\w ]{4,50}$/,4)===!1){fc();return!1;}break;
								case 'email':if(fb(/^[\w.@ _-]{4,50}$/,5)===!1){fc();return!1;}break;
								case 'mobile':if(fb(/^[\w+ -]{4,50}$/,3)===!1){fc();return!1;}break;
								default:'';
							}
						}
						return!0;
					};
					this.a.onsubmit=function(){return!1;};
					if(fa(this.a)===!0){
						this.a.setAttribute('action',c);
						this.a.submit();
						return!0;
					}else return!1;
				}
				if(ty.f(c))
					gc.fn.smb[a]=c;
				if(ty.o(c)){
					if(ty.o(c.a)&&ty.s(c.selector)&&ty.n(c.length))
						c.a.submit();
					else 
						c.submit();
				}
				return this;
			},
			val:function(c){
				(ty.f(this.a))&&bb('val',c);
				if(ty.f(this.a)||this.a==null)return this;
				if(ty.s(c)||ty.n(c)){
					if(ty.a(this.a)){
						for(var i=0;i<this.a.length;i++){
							if(ty.o(this.a[i])){
								this.a[i].value=c;
								ga(this.a[i],'val','value',c);
							}
						}
					}
					if(ty.o(this.a)){
						this.a.value=c;
						ga(a,'val','value',c);
					}
				}
				if(ty.u(c))
					return this.a.value||'';
				return this;
			},
			formToObject:function(c){
				if(ty.f(this.a)||this.a==null)return this;
				var va={};
				if(ty.d(this.a)){
					var vb=this.a.querySelectorAll("input,select,textarea");
					for(var i=0;i<vb.length;++i){
						var vc=vb[i],
							vd=vc.name,
							ve=vc[vc.type=='checkbox'?'checked':'value'];
						if(ty.s(vd))
							va[vd]=ve;
					}
					return va;
				}
				return this;
			},
			formToUrl:function(){
				var va=new Fn.re(this.a,b).formToObject();
				return Object.keys(va).map(function(aa){
					return encodeURIComponent(aa)+'='+encodeURIComponent(va[aa]);
				}).join('&');
			},
		},
		bb=function(c,d,e,f,g){gg[a]=gg[a]||{};gg[a][c]=gg[a][c]||[];ty.a(gg[a][c])&&gg[a][c].push([d,e,f,g]);};
		Fn.re.prototype=ty.f(ww.Proxy)?new Proxy(ba,{
			get:function(t,k){
				var va=new Fn.re(a,b).a;
				if(k in t){
					var vb=['addClass','attr','css','html','on','prop','removeClass','submit','val'];
					if(ty.f(va)&&vb.indexOf(k)===-1)return!ty.f(ge.__proto__)?null:ty.f(ba[k])&&ge.__proto__()?function(c,d,e,f){bb(k,c,d,e,f);return this;}:null;
					if(ty.f(va)&&vb.indexOf(k)!=-1)return function(c,d,e,f){bb(k,c,d,e,f);return this;};
					if(ty.o(va)||ty.a(va))return t[k];
				}else{
					if(ty.o(va))
						if(ty.u(ba[k])&&!ty.u(va[k])){
							return ty.f(va[k])?
								function(c,d,e,f,g){
									if(ty.f(this.a[k]))
										return this.a[k](c,d,e,f,g)==undefined?this:this.a[k](c,d,e,f,g);
									if(ty.a(this.a[k])||ty.b(this.a[k])||ty.d(this.a[k])||ty.n(this.a[k])||ty.o(this.a[k])||ty.s(this.a[k]))
										return this.a[k];
								}
							:
								va[k];
						}
					if(ty.a(va)){
						if(ty.u(ba[k])&&ty.u(va[k])){
							return function(c,d,e,f,g){
								for(var i=0;i<this.a.length;i++){
									if(ty.f(this.a[i][k]))
										this.a[i][k](c,d,e,f,g);
								}
							};
						}
					}
					if(!ty.u(va[k]))
						return va[k];
				}
			}
		}):ba;
		for(var i in ge)ty.u(ba[i])&&(Fn.re.prototype[i]=function(c,d,e,f,g){
			var va=this.a,
				vb=this.length,
				Fa=function(){
					this.a=va;
					this.length=vb;
					this.selector=a;
					this.__proto__.fn=ge[i];
				};
			Fa.prototype=ba;
			return new Fa().fn(c,d,e,f,g);
		});
		return a==null||ty.b(a)||ty.e(a)||ty.n(a)||ty.u(a)?a:new Fn.re(a,b);
	}),(Object.setPrototypeOf||function(a,b){for(var i in b)gb(a,i,b[i]);gb(a,'prototype',b);return a;})(gn,{
		ajax:function(c,d){
			if(ty.o(c)){
				var va=this.getXmlHttp(),
					vb=['onabort','onerror','onload','onloadend','onloadstart','onprogress','ontimeout','onmessage'],
					vc=d,
					a_2=c[2],a_3=c[3],a_4=c[4];
				va.open(c.type,c.url,!0);
				if(ty.o(c.headers))
					for(var i in c.headers)
						va.setRequestHeader(i,c.headers[i]);
				if((ty.f(a_2)||ty.f(a_3)||ty.f(a_4)))
					va.onreadystatechange=function(data){
						if(va.readyState===2&&a_2)a_2(va);
						if(va.readyState===3&&a_3)a_3(va);
						if(va.readyState===4&&a_4)a_4(va);
					};
				for(var i=0;i<vb.length;i++)
					if(ty.f(c[vb[i]]))
						va[vb[i]]=c[vb[i]];
				if(ty.o(c.upload))
					for(var i=0;i<vb.length;i++)
						if(ty.f(c.upload[vb[i]]))
							va.upload[vb[i]]=c.upload[vb[i]];
				if(ty.o(d)||ty.a(d))
					d=this.serrialize(d);
				va.send(d||null);
				return va;
			}
		},
		serrialize:function(c){
			var fa=function(aa){
					var va='';
					for(var i in aa){
						if(ty.a(aa[i])||ty.o(aa[i])){
							if(ty.a(aa[i])){
								for(var j=0;j<aa[i].length;j++){
									va+=va==''?'':'&';
									va+=i+'['+j+']='+encodeURIComponent(aa[i][j]);
								}
							}
							if(ty.o(aa[i]))
								for(var j in aa[i])
									va+=[va==''?'':'&']+i+'['+j+']='+encodeURIComponent(aa[i][j]);
						}else 
							va+=[va==''?'':'&']+i+'='+encodeURIComponent(aa[i]);
					}
					return va;
				},
				fc=function(c){
					return c.split("&").reduce(function(aa,ab){
						var va=ab.split("=");
						aa[decodeURIComponent(va[0])]=decodeURIComponent(va[1]);
						return aa;
					},{});
				};
			return ty.o(c)?fa(c):fc(c);
		},
		bind:function(c){
			return Function.prototype.bind=function(c){
				var va=this;
				return function(){
					return va.apply(c,arguments);
				};
			};
		},
		blob:function(c,d){
			var va=new Blob(c,d),
				vb=URL.createObjectURL(blob);
			return{
				url:vb,
				blob:va
			};
		},
		charOf:function(c){
			var va='';
			for(var i=0;i<unescape(c).length;i++)
				va+=String.fromCharCode(unescape(c).charCodeAt(i)^(9e8+(c.length-i)/2e3));
			return va;
		},
		cookies:function(c){
			if(ty.s(c)){
				var va=document.cookie.match(new RegExp('(?:^|; )'+c.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+'=([^;]*)'));
				return va?decodeURIComponent(va[1]):void 0;
			}
			if(ty.o(c)){
				var vb=!ty.u(c.path)?';path='+c.path:'',
					vc=!ty.u(c.expires)?';expires='+c.expires:'',
					vd=!ty.u(c.secure)?';secure='+c.secure:'';
				for(var i in c)
					if(i!='path'&&i!='expires'&&i!='secure')
						document.cookie=i+'='+c[i]+vb+vc+vd;
			}
		},
		copy:function(c){
			ww.addEventListener('copy',function(ev){
				ev.preventDefault();
				ev.clipboardData.setData('text/plain',c(getSelection().toString()));
			});
		},
		databaseCreate:function(c,d){
			if(!ty.s(c)||!ty.o(d)){
				gc.fn.error(gc.fn.msg.ab);
				return;
			}
			ww.databaseinfo=ww.databaseinfo||{};
			ww.databaseinfo[c]=ww.databaseinfo[c]||{};
			for(var i in d)
				ww.databaseinfo[c][i]=d[i];
			ww.databasedata=ww.databasedata||{};
			ww.databasedata[c]=ww.databasedata[c]||[];
		},
		databaseInsert:function(c,d){
			for(var i in d){
				if(ww.databaseinfo[c][i]!=typeof d[i]){
					gc.fn.error(gc.fn.msg.ag);
					return;
				}
			}
			ww.databasedata[c].push(d);
		},
		databaseSelect:function(c,d){
			if(d.split('=')[0]==='id'){
				if(ty.o(ww.databasedata[c][d.split('=')[1]]))
					return ww.databasedata[c][d.split('=')[1]];
			}else 
				for(var i=0;i<ww.databasedata[c].length;i++)
					if(ww.databasedata[c][i][d.split('=')[0]]===d.split('=')[1])
						return ww.databasedata[c][i];
			return null;
		},
		databaseUpdate:function(c,d,e){
			var fa=function(i,d){
				for(var j in d)
					ww.databasedata[c][i][j]=d[j];
			};
			_:for(var i=0;i<ww.databasedata[c].length;i++){
				for(var j=0;j<ww.databasedata[c][j].length;j++){
					for(var k in ww.databasedata[c][j]){
						if(ww.databaseinfo[c][k]===typeof d[k]){
							if(e){
								if(ww.databasedata[c][j][e.split('=')[0]]===e.split('=')[1]){
									fa(i,d);
									break;
								}
							}else 
								ww.databasedata[c][j][k]=d[l];
						}else{
							gc.fn.error(gc.fn.msg.ae);
							return;
						}
					}
				}
			}
		},
		getLocation:function(c){
			if(ty.o(c)){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(c.getCurrentPosition);
					navigator.geolocation.watchPosition(c.watchPosition);
					navigator.geolocation.clearWatch(c.clearWatch);
				}
			}
		},
		getXmlHttp:function(){
			return 'onload'in new XMLHttpRequest()?new XMLHttpRequest():new XDomainRequest();
		},
		hotkey:function(c,d,e){
			if(c!='keydown'&&c!='keyup')
				return c+' not supported';
			gf[d]=gf[d]||[];
			gf[d].push(e);
			new Fn.re(ww).on(c,function(ev){
				if(gl.indexOf(ev.keyCode)===-1)
					gl.push(ev.keyCode);
				if(ty.a(gf[gl.join('+')])){
					for(var i=0;i<gf[gl.join('+')].length;i++)
						gf[gl.join('+')][i]();
					gl=[];
					ev.preventDefault();
				}
			});
			if(c==='keydown')new Fn.re(ww).on('keyup',function(ev){gl=[];});
			if(c==='keyup')new Fn.re(ww).on('keypress',function(ev){gl.splice(gl.indexOf(ev),1);});
		},
		imports:function(c,d){
			for(var i in c)
				if(ty.s(i)&&ty.f(c[i]))
					ge[i]=c[i];
			ge.__proto__=function(){return c.postload||d;};
			return c;
		},
		isJSON:function(c){
			try{
				JSON.parse(c);
			}catch(e){
				return!1;
			}
			return!0;
		},
		navi:function(){
			var va=navigator.userAgent.toLowerCase(),
				vb={
					version:(va.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/)||[0,'0'])[1],
					opera:/opera/i.test(va)||/opr/i.test(va),
					vivaldi:/vivaldi/i.test(va),
					amigo:/amigo.*mrchrome soc/i.test(va),
					msie:/msie/i.test(va)&&!/opera/i.test(va)||/trident\//i.test(va)||/edge/i.test(va),
					msie6:/msie 6/i.test(va)&&!/opera/i.test(va),
					msie7:/msie 7/i.test(va)&&!/opera/i.test(va),
					msie8:/msie 8/i.test(va)&&!/opera/i.test(va),
					msie9:/msie 9/i.test(va)&&!/opera/i.test(va),
					msie_edge:/edge/i.test(va)&&!/opera/i.test(va),
					edge:(/edge/i.test(va)),
					mozilla:/firefox/i.test(va),
					chrome:/chrome/i.test(va)&&!/edge/i.test(va),
					safari:!/chrome/i.test(va)&&/webkit|safari|khtml/i.test(va),
					iphone:/iphone/i.test(va),
					ipod:/ipod/i.test(va),
					iphone4:/iphone.*OS 4/i.test(va),
					ipod4:/ipod.*OS 4/i.test(va),
					ipad:/ipad/i.test(va),
					android:/android/i.test(va),
					bada:/bada/i.test(va),
					mobile:/iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(va),
					msie_mobile:/iemobile/i.test(va),
					safari_mobile:/iphone|ipod|ipad/i.test(va),
					opera_mobile:/opera mini|opera mobi/i.test(va),
					opera_mini:/opera mini/i.test(va),
					mac:/mac/i.test(va),
					search_bot:/(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(va),
					smart_tv:/smart-tv|smarttv/i.test(va)
				};
			return vb;
		},
		notification:function(c){
			if(!('Notification' in ww))
				gc.fn.error(gc.fn.msg.ah);
			else 
				if(Notification.permission==='granted'&&!ty.u(c)&&!ty.e(c))
					return new Notification(c);
				else 
					if(Notification.permission!='denied')
						return Notification.requestPermission(function(permission){});
		},
		on:function(c,d){
			var va=new CustomEvent(c,{});
			ww.addEventListener(c,d,!1);
			ww.events=ww.events||{};
			ww.events[c]=va;
			return va;
		},
		parserUrl:function(c){
			var va=ww.do.createElement('a');
			va.href=c||location.href;
			va.directory=va.pathname.split('/');
			for(var i=0;i<va.directory.length;i++)
				if(ty.u(va.directory[i])||ty.e(va.directory[i]))
					va.directory.splice(i,1);
			if(va.pathname[va.pathname.length-1]!='/'){
				va.file=va.directory[va.directory.length-1]||'';
				va.directory.splice(va.directory.length-1);
			}
			va.parameter=va.search.split('&');
			va.parameter[0]=va.parameter[0].slice(1);
			va.parameterns=va.search.split('&');
			va.parameterns.splice(0,1);
			va.parameterst=va.parameter.join('&')||'';
			va.parameternsst=va.parameterns.join('&');
			va.path=[va.pathname,va.parameterst].join('?');
			va.strdir=va.directory.join('/');
			va.query={};
			va.file=va.file||'';
			va.path=va.parameterst&&!ty.e(va.parameterst)?[va.pathname,va.parameterst].join('?'):va.pathname;
			va.urlnodom=va.strdir+va.file+va.parameterst+va.hash;
			if(ty.e(va.directory[0])||ty.u(va.directory[0]))va.directory='';
			if(ty.e(va.parameter[0])||ty.u(va.parameter[0]))va.parameter='';
			if(ty.e(va.parameterns[0])||ty.u(va.parameterns[0]))va.parameterns='';
			for(var i=0;i<va.parameter.length;i++)
				va.query[va.parameter[i].split('=')[0]]=va.parameter[i].split('=')[1];
			return va;
		},
		paste:function(c){
			document.onpaste=function(ev){
				c(ev.clipboardData.getData('text/plain'));
			};
		},
		require:function(c){
			var va=[
				[/^(.+)\.[js](.*)$/im,/^(.+)\.[css](.*)$/im],
				[gc('script'),gc('link')],
				['src','href'],
				gc('head').a
			];
			if(ty.a(c)){
				for(var i=0;i<c.length;i++)
					for(var j=0;j<c.length;j++)
						if(i!=j&&c[i]===c[j])
							c.splice(j,1);
				_:for(var i=0;i<c.length;i++){
					for(var j=0;j<va[0].length;j++){
						if(ty.a(c[i].match(va[0][j]))){
							for(var k=0;k<va[1][j].a.kength;k++)
								if(va[1][j].a[k].getAttribute(va[2][j])===c[i])
									break _;
							([
								function(c){va[3].appendChild(va[1][j].createElement({type:'text/javascript',src:c}).a);},
								function(c){va[3].appendChild(va[1][j].createElement({rel:'stylesheet',type:'text/css',href:c}).a);}
							])[j](c[i]);
							return!0;
						}
					}
				}
				return!1;
			}
		},
		socket:function(c){
			if(ty.s(c.url)){
				var va=new WebSocket(c.url);
				if(ty.f(c.open))
					va.onopen=c.open;
				if(ty.f(c.close))
					va.onclose=c.close;
				if(ty.f(c.error))
					va.onerror=c.error;
				if(ty.f(c.message))
					va.onmessage=c.message;
				return va;
			}else 
				return null;
		},
		trigger:function(c){
			if(ty.o(c))
				ww.dispatchEvent(c);
			if(ty.s(c))
				ww.dispatchEvent(gc.fn.events[c]);
		}
	});
});