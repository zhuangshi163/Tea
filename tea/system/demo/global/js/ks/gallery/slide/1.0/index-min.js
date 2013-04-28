KISSY.add("gallery/slide/1.0/base",function(e){var d=function(){if(!(this instanceof d))throw Error('please use "new Slide()"');this.init.apply(this,arguments)};d.plug=function(){};e.augment(d,e.Event.Target,{init:function(a,c){if(e.isObject(a))this.con=a;else if(/^#/i.test(a))this.con=e.one(a);else if(e.one("#"+a))this.con=e.one("#"+a);else if(e.one(a))this.con=e.one(a);else throw Error("Slide Container Hooker not found");this.buildParam(c);this.buildHTML();this.bindEvent();this.fire("ready",{index:0,
navnode:this.tabs.item(0),pannelnode:this.pannels.item(0)});if(this.reverse){var b;b=this.previous;this.previous=this.next;this.next=b}if(this.carousel)for(b=0;b<this.colspan;b++)this.fix_for_transition_when_carousel(2*b);this.fixSlideSize();this.layerSlide&&this.initLayer();return this},setWrapperSize:function(a){var c=this;e.isUndefined(a)&&(a=0);c.pannels=c.con.all("."+c.contentClass+" div."+c.pannelClass);c.length=c.pannels.length;({none:function(){},vSlide:function(){var b=c.animcon.get("region");
c.animwrap.setStyles({height:(c.length+a)*b.height/c.colspan+"px"})},hSlide:function(){var b=c.animcon.get("region");c.animwrap.setStyles({width:(c.length+a)*b.width/c.colspan+"px"})},fade:function(){}})[c.effect]();e.isUndefined(a)||c.relocateCurrentTab();return this},add:function(a,c){var b=this;if(e.isUndefined(c)||c>b.length)c=b.length;e.isString(a)&&(a=e.one(a));b.transitions&&a.css({visibility:"hidden"});c==b.length?(setTimeout(function(){b.setWrapperSize(1)},0),a.insertAfter(b.pannels[c-1])):
a.insertBefore(b.pannels[c]);b.setWrapperSize();b.fixSlideSize(b.currentTab);b.transitions&&a.css({visibility:""});return this},remove:function(a){if(1!==this.length)return a<=this.currentTab&&(this.currentTab--,this.length--),this.transitions&&this.con.css({display:"none"}),e.one(this.pannels[a]).remove(),this.setWrapperSize(),this.transitions&&this.con.css({display:"block"}),this.fixSlideSize(this.currentTab),this},removeLast:function(){this.remove(this.length-1);return this},renderLazyData:function(a){a.setStyle("display",
"none");if("1"!=a.attr("lazy-data")){a.attr("lazy-data","1");e.stamp(b);var c=a.get("innerHTML").replace(/&lt;/ig,"<").replace(/&gt;/ig,">"),b=e.Node.create("<div>"+c+"</div>");e.DOM.insertBefore(b,a);e.execScript(c)}},buildWrap:function(){this.animwrap=e.Node.create('<div style="position:absolute;"></div>');this.animwrap.set("innerHTML",this.animcon.get("innerHTML"));this.animcon.set("innerHTML","");this.animcon.appendChild(this.animwrap);this.pannels=this.con.all("."+this.contentClass+" div."+this.pannelClass);
return this},doEffectInit:function(){var a=this;({none:function(){a.pannels=a.con.all("."+a.contentClass+" div."+a.pannelClass);a.pannels.setStyles({display:"none"});a.pannels.item(a.defaultTab).setStyles({display:"block"})},vSlide:function(){a.buildWrap();var c=a.animcon.get("region");a.pannels.setStyles({"float":"none",overflow:"hidden"});a.animwrap.setStyles({height:a.length*c.height/a.colspan+"px",overflow:"hidden",top:-1*a.defaultTab*c.height+"px"})},hSlide:function(){a.buildWrap();var c=a.animcon.get("region");
a.pannels.setStyles({"float":"left",overflow:"hidden"});a.animwrap.setStyles({width:a.length*c.width/a.colspan+"px",overflow:"hidden",left:-1*a.defaultTab*c.width+"px"})},fade:function(){a.pannels=a.con.all("."+a.contentClass+" div."+a.pannelClass);a.pannels.setStyles({position:"absolute",zIndex:0});a.pannels.each(function(c,b){b==a.defaultTab?c.setStyles({opacity:1,display:"block"}):c.setStyles({opacity:0,diaplay:"none"})})}})[a.effect]();return this},buildHTML:function(){var a=this.con;this.tabs=
a.all("."+this.navClass+" "+this.triggerSelector);this.length=a.all("."+this.contentClass+" ."+this.pannelClass).size();a.one("."+this.navClass)||e.Node('<ul class="'+this.navClass+'" style="display:none"></ul>').appendTo(this.con);if(0===this.tabs.size()){for(var c=a.all("."+this.navClass),b="",d=0;d<this.length;d++){var g="";0===d&&(g=this.selectedClass);b+='<li class="'+g+'"><a href="javascript:void(0);">'+(d+1)+"</a></li>"}c.set("innerHTML",b)}this.tabs=a.all("."+this.navClass+" "+this.triggerSelector);
this.animcon=a.one("."+this.contentClass);this.animwrap=null;this.doEffectInit();this.fixSlideSize(this.currentTab);this.hightlightNav(this.getWrappedIndex(this.currentTab));!0===this.autoSlide&&this.play();return this},getCurrentPannel:function(){return e.one(this.pannels[this.currentTab])},renderWidth:function(){var a=this.animcon.get("region").width;"hSlide"==this.effect&&(a/=this.colspan);this.pannels.setStyles({width:a+"px"});return this},renderHeight:function(){var a=this.animcon.get("region").height;
"vSlide"==this.effect&&(a/=this.colspan);this.pannels.setStyles({height:a+"px"});return this},relocateCurrentTab:function(a){e.isUndefined(a)&&(a=this.currentTab);if("hSlide"==this.effect)return this.transitions?this.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+-1*a*this.animcon.get("region").width+"px,0,0)","-webkit-backface-visibility":"hidden"}):this.animwrap.setStyles({left:-1*a*this.animcon.get("region").width}),this.currentTab=a,this},fixSlideSize:function(a){this.adaptive_fixed_width&&
this.renderWidth();this.adaptive_fixed_height&&this.renderHeight();this.adaptive_fixed_size&&this.renderHeight().renderWidth();this.resetSlideSize(a);return this},removeHeightTimmer:function(){e.isNull(this.heightTimmer)||(clearInterval(this.heightTimmer),this.heightTimmer=null)},addHeightTimmer:function(){var a=this;e.isNull(a.heightTimmer)||(clearInterval(a.heightTimmer),a.heightTimmer=null);var c=function(){a.effect=="hSlide"&&a.animcon.setStyles({height:a.pannels.item(a.currentTab).get("region").height+
"px"})};a.heightTimmer=setInterval(c,100);c()},resetSlideSize:function(a){var c,b;if("undefined"==typeof a||null===a)a=this.currentTab;if(!("hSlide"!=this.effect&&"vSlide"!=this.effect))return"hSlide"==this.effect&&(c=this.adaptive_width?this.adaptive_width():this.animcon.get("region").width,b=this.pannels.item(a).get("region").height,c/=this.colspan,this.pannels.setStyles({width:c+"px",display:"block"}),this.animcon.setStyles({width:c*this.colspan+"px",overflow:"hidden"}),this.animWrapperAutoHeightSetting&&
this.animcon.setStyles({height:b+"px"})),"vSlide"==this.effect&&(c=this.pannels.item(a).get("region").width,b=this.adaptive_height?this.adaptive_height():this.animcon.get("region").height,b/=this.colspan,this.pannels.setStyles({height:b*this.colspan+"px",display:"block"}),this.animcon.setStyles({height:b*this.colspan+"px",overflow:"hidden"}),this.animWrapperAutoHeightSetting&&this.animcon.setStyles({width:c+"px"})),this},getWrappedIndex:function(a){var c=0;return c=this.carousel?a<this.colspan?this.length-
3*this.colspan+a:a>=this.length-this.colspan?a-(this.length-this.colspan):a-this.colspan:a},bindEvent:function(){var a=this;e.inArray(a.eventType,["click","mouseover","mouseenter"])&&a.con._delegate(a.eventType,function(c){c.halt();c=Number(a.tabs.indexOf(c.currentTarget));a.carousel&&(c=(c+1)%a.length);a.go(c);a.autoSlide&&a.stop().play()},"."+a.navClass+" "+a.triggerSelector);a.hoverStop&&(a.con._delegate("mouseover",function(){a.autoSlide&&a.stop()},"."+a.contentClass+" div."+a.pannelClass),a.con._delegate("mouseout",
function(){a.autoSlide&&a.play()},"."+a.contentClass+" div."+a.pannelClass));e.Event.on("resize",function(){a.fixSlideSize(a.currentTab);a.relocateCurrentTab()},window);a.on("beforeSwitch",function(){if(this.layerSlide&&this.isAming())return false});if("ontouchstart"in document.documentElement){if(!a.touchmove)return this;a.con._delegate("touchstart",function(c){a.stop();a.touching=true;a.is_last()&&a.carousel&&a.fix_next_carousel();a.is_first()&&a.carousel&&a.fix_pre_carousel();a.startX=c.changedTouches[0].clientX;
a.startY=c.changedTouches[0].clientY;a.animwrap.setStyles({"-webkit-transition-duration":"0s"});a.startT=Number(new Date)},"."+a.contentClass);a.con._delegate("touchend",function(c){a.touching=false;var b=c.changedTouches[0].clientX,c=Number(a.animcon.get("region").width);a.deltaX=Math.abs(b-a.startX);var e=Math.abs(b)<Math.abs(a.startX),b=!e,b=a.carousel?false:a.is_last()&&e||a.is_first()&&b,d=function(){a.animwrap.setStyles({"-webkit-transition-duration":Number(a.speed)/2+"s","-webkit-transform":"translate3d("+
-1*a.currentTab*a.animcon.get("region").width/a.colspan+"px,0,0)"})},f=function(){var b=a.animcon.get("region").width/a.colspan,b=parseInt((a.deltaX-b/2)/b,10);if(e){if(b>=1&&a.length>2){a.currentTab=a.currentTab+b;if(a.currentTab>=a.length-1)a.currentTab=a.length-2}a.next()}else{if(b>=1&&a.length>2)a.currentTab=a.currentTab-b<=0?1:a.currentTab+-1*b;a.previous()}};if(a.touchmove&&a.deltaX<30)d();else{!b&&(a.touchmove&&a.deltaX>c/3||!a.touchmove&&a.carousel||!a.carousel&&a.touchmove&&a.effect=="hSlide"||
!a.touchmove&&!a.carousel||Number(new Date)-a.startT<550)?f():d();a.autoSlide&&a.play()}},"."+a.contentClass);a.touchmove&&(a.con._delegate("touchmove",function(c){if(!(c.touches.length>1)){a.deltaX=c.touches[0].clientX-a.startX;var b=a.is_last()&&a.deltaX<0||a.is_first()&&a.deltaX>0;if(!a.carousel&&a.effect=="hSlide"&&b)a.deltaX=a.deltaX/3;a.isScrolling=Math.abs(a.deltaX)<Math.abs(c.touches[0].clientY-a.startY)?true:false;if(!a.isScrolling){c.halt();a.stop();c=Number(a.animcon.get("region").width/
a.colspan);a.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+(a.deltaX-a.currentTab*c)+"px,0,0)"})}}},"."+a.contentClass),a.animwrap.on("webkitTransitionEnd",function(){}))}return this},initLayer:function(){var a=this;if(!("ontouchstart"in document.documentElement||0<e.UA.ie&&9>e.UA.ie)){var c="durationin,easingin,durationout,easingout,delayin,delayout,slideindirection,slideoutdirection,offsetin,offsetout,alpha,easeInStrong,easeOutStrong,easeBothStrong,easeNone,easeIn,easeOut,easeBoth,elasticIn,elasticOut,elasticBoth,backIn,backOut,backBoth,bounceIn,bounceOut,bounceBoth,left,top,right,bottom".split(","),
b={durationin:1E3,easingin:"easeIn",durationout:1E3,easingout:"easeOut",delayin:300,delayout:300,slideindirection:"right",slideoutdirection:"left",alpha:!0,offsetin:50,offsetout:50},d=function(a){var d=this,i=a.attr("rel").replace(/"'/ig,"").replace(RegExp("("+c.join("|")+")","ig"),'"$1"'),h=e.JSON.parse("{"+i+"}");e.each(b,function(a,b){var c=h[b];d[b]=void 0===c||null===c?a:c});this.el=a;this.left=Number(a.css("left").replace("px",""));this.top=Number(a.css("top").replace("px",""));this.animIn=
function(){var a=this,b=a.offsetin,c=a.slideindirection;({left:function(){a.el.css({left:a.left-b})},top:function(){a.el.css({top:a.top-b})},right:function(){a.el.css({left:a.left+b})},bottom:function(){a.el.css({top:a.top+b})}})[c]();setTimeout(function(){var b={};e.mix(b,{left:{left:a.left},top:{top:a.top},bottom:{top:a.top},right:{left:a.left}}[c]);a.alpha&&e.mix(b,{opacity:1});e.Anim(a.el,b,a.durationin/1E3,a.easingin,function(){}).run()},a.delayin);a.alpha&&a.el.css({opacity:0})};this.animOut=
function(){}};a.sublayers=[];a.pannels.each(function(b,c){("vSlide"==a.effect||"hSlide"==a.effect)&&b.css({position:"relative"});0===b.all('[alt="sublayer"]').length?a.sublayers[c]=[]:(void 0===a.sublayers[c]&&(a.sublayers[c]=[]),b.all('[alt="sublayer"]').each(function(b){a.sublayers[c].push(new d(b))}))});a.on("beforeSwitch",function(b){if(b.index===a.currentTab)return!1;a.subLayerRunin(b.index)});a.on("beforeTailSwitch",function(b){a.subLayerRunout(b.index)})}},subLayerRunin:function(a){e.each(this.sublayers[a],
function(a){a.animIn()})},subLayerRunout:function(a){e.each(this.sublayers[a],function(a){a.animOut()})},buildParam:function(a){var c=this;if(void 0===a||null===a)a={};e.each({autoSlide:!1,speed:500,timeout:3E3,effect:"none",eventType:"click",easing:"easeBoth",hoverStop:!0,selectedClass:"selected",conClass:"t-slide",navClass:"tab-nav",triggerSelector:"li",contentClass:"tab-content",pannelClass:"tab-pannel",carousel:!1,reverse:!1,touchmove:!1,adaptive_fixed_width:!1,adaptive_fixed_height:!1,adaptive_fixed_size:!1,
adaptive_width:!1,adaptive_height:!1,defaultTab:0,layerSlide:!1,layerClass:"tab-animlayer",colspan:1,animWrapperAutoHeightSetting:!0,webkitOptimize:!0},function(b,d){var e=a[d];c[d]=void 0===e||null===e?b:e});e.mix(c,{tabs:[],animcon:null,pannels:[],timmer:null,touching:!1});c.speed/=1E3;0!==c.defaultTab&&(c.defaultTab=Number(c.defaultTab)-1);c.carousel&&(c.defaultTab=c.colspan,c.effect="hSlide");c.currentTab=c.defaultTab;c.transitions="webkitTransition"in document.body.style&&c.webkitOptimize;return c},
fix_for_transition_when_carousel:function(a){"undefined"==typeof a&&(a=0);var c=this.con;this.animcon=this.con.one("."+this.contentClass);this.animwrap=this.animcon.one("div");this.pannels=c.all("."+this.contentClass+" div."+this.pannelClass);if("hSlide"==this.effect){var b=Number(this.animcon.get("region").width/this.colspan);this.animcon.get("region");this.animwrap.setStyle("width",this.pannels.size()*b+2*b);var d=this.pannels.item(a).cloneNode(!0),e=this.pannels.item(this.pannels.size()-1-a).cloneNode(!0);
this.animwrap.append(d);this.animwrap.prepend(e);this.transitions?this.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+-1*b*(a/2+1)+"px,0,0)","-webkit-backface-visibility":"hidden",left:"0"}):this.animwrap.setStyle("left",-1*b*(a/2+1))}this.pannels=c.all("."+this.contentClass+" div."+this.pannelClass);this.length=this.pannels.size();return this},isAming:function(){return this.anim?this.anim.isRunning():!1},previous:function(a){try{if(this.isAming()&&this.carousel)return this}catch(c){}var b=
this.currentTab+this.length-1-(this.colspan-1);b>=this.length-this.colspan+1&&(b%=this.length-this.colspan+1);if(this.carousel&&this.is_first())return this.fix_pre_carousel(),this.previous.call(this),this;this.go(b,a);return this},is_last:function(){return this.currentTab==this.length-(this.colspan-1)-1?!0:!1},is_first:function(){return 0===this.currentTab?!0:!1},next:function(a){try{if(this.isAming()&&this.carousel)return this}catch(c){}var b=this.currentTab+1;b>=this.length-this.colspan+1&&(b%=
this.length-this.colspan+1);if(this.carousel&&this.is_last())return this.fix_next_carousel(),this.next.call(this),this;this.go(b,a);return this},fix_next_carousel:function(){this.currentTab=this.colspan;var a=this.con;"none"!=this.effect&&(this.pannels=a.all("."+this.contentClass+" div."+this.pannelClass));a="-"+Number(this.animcon.get("region").width).toString()+"px";"hSlide"==this.effect&&(this.transitions?this.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+
a+",0,0)"}):this.animwrap.setStyle("left",a))},fix_pre_carousel:function(){this.currentTab=this.length-1-2*this.colspan+1;var a=this.con;"none"!=this.effect&&(this.pannels=a.all("."+this.contentClass+" div."+this.pannelClass));a="-"+(Number(this.animcon.get("region").width/this.colspan)*this.currentTab).toString()+"px";"hSlide"==this.effect&&(this.transitions?this.animwrap.setStyles({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+a+",0,0)"}):this.animwrap.setStyle("left",a))},
hightlightNav:function(a){if(this.carousel&&1<this.colspan)return this;this.tabs.item(a)&&(this.tabs.removeClass(this.selectedClass),this.tabs.item(a).addClass(this.selectedClass));return this},switch_to:function(a,c){var b=this,d=function(){e.isFunction(c)&&c.apply(b,b);b.fire("afterSwitch",{index:b.currentTab,navnode:b.tabs.item(b.getWrappedIndex(b.currentTab)),pannelnode:b.pannels.item(b.currentTab)})};b.fire("beforeTailSwitch",{index:b.currentTab,navnode:b.tabs.item(b.getWrappedIndex(b.currentTab)),
pannelnode:b.pannels.item(b.currentTab)});b.hightlightNav(b.getWrappedIndex(a));b.fixSlideSize(a);b.autoSlide&&b.stop().play();a>=b.length&&(a%=b.length);if(a==b.currentTab)return this;if(b.anim)try{b.anim.stop(),b.anim=null}catch(g){}({none:function(a){b.pannels.setStyles({display:"none"});b.pannels.item(a).setStyles({display:"block"});d()},vSlide:function(a){b.transitions?(b.animwrap.setStyles({"-webkit-transition-duration":b.speed+"s","-webkit-transform":"translate3d(0,"+-1*a*b.animcon.get("region").height/
b.colspan+"px,0)","-webkit-backface-visibility":"hidden"}),b.anim=e.Anim(b.animwrap,{opacity:1},b.speed,b.easing,function(){d()})):b.anim=e.Anim(b.animwrap,{top:-1*a*b.animcon.get("region").height/b.colspan},b.speed,b.easing,function(){d()});b.anim.run()},hSlide:function(a){b.transitions?(b.animwrap.setStyles({"-webkit-transition-duration":b.speed+"s","-webkit-transform":"translate3d("+-1*a*b.animcon.get("region").width/b.colspan+"px,0,0)","-webkit-backface-visibility":"hidden"}),b.anim=e.Anim(b.animwrap,
{opacity:1},b.speed,b.easing,function(){d()})):b.anim=e.Anim(b.animwrap,{left:-1*a*b.animcon.get("region").width/b.colspan},b.speed,b.easing,function(){d()});b.anim.run()},fade:function(a){var c=b.currentTab;b.anim=e.Anim(b.pannels.item(a),{opacity:1},b.speed,b.easing,function(){b.pannels.item(c).setStyle("zIndex",0);b.pannels.item(a).setStyle("zIndex",1);b.pannels.item(c).setStyle("opacity",0);b.pannels.item(c).setStyles({display:"none"});d()});b.pannels.item(a).setStyles({display:"block"});b.pannels.item(a).setStyle("opacity",
0);b.pannels.item(c).setStyle("zIndex",1);b.pannels.item(a).setStyle("zIndex",2);b.anim.run()}})[b.effect](a);b.currentTab=a;b.fire("switch",{index:a,navnode:b.tabs.item(b.getWrappedIndex(a)),pannelnode:b.pannels.item(a)});var f=b.pannels.item(a).all(".data-lazyload");f&&f.each(function(a){b.renderLazyData(a)})},go:function(a,c){!1!==this.fire("beforeSwitch",{index:a,navnode:this.tabs.item(a),pannelnode:this.pannels.item(a)})&&(a+this.colspan>this.pannels.size()&&(a=this.pannels.size()-this.colspan),
this.switch_to(a,c));return this},play:function(){var a=this;null!==a.timer&&clearTimeout(a.timer);a.timer=setTimeout(function(){a.next().play()},Number(a.timeout));return this},stop:function(){clearTimeout(this.timer);this.timer=null;return this}});return d},{requires:["node","event","json","./slide-util","./kissy2yui"]});KISSY.add("gallery/slide/1.0/index",function(e,d){return d},{requires:["./base"]});
KISSY.add("gallery/slide/1.0/kissy2yui",function(e){e.augment(e.Node,{_delegate:function(){e.isFunction(arguments[1])?this.delegate(arguments[0],arguments[2],arguments[1]):this.delegate.apply(this,arguments);return this},indexOf:function(d){if(e.isUndefined(d))return null;d[0]&&(d=d[0]);var a=0;this.each(function(c,b){c[0]===d&&(a=b)});return a},size:function(){return this.length},set:function(d,a){"innerHTML"===d?this.html(a):this.attr(d,a);return this},get:function(d){var a=this,c={innerHTML:function(){return a.html()},
region:function(){return{height:a.height(),width:a.width()}}};if(d in c)return c[d]()},appendChild:function(){this.append.apply(this,arguments);return this},setStyle:function(d,a){this.css.apply(this,arguments);return this},setStyles:function(d){this.css.apply(this,arguments);return this},cloneNode:function(){return this.clone.apply(this,arguments)}});e.Node.create=function(d){return e.Node(d)}},{requires:["node","event"]});
KISSY.add("gallery/slide/1.0/slide-util",function(e){e.mix(e,{setHash:function(d,a){var c,b;"object"==typeof d?(c=window.location.href,a=d):c=d;0>c.indexOf("#")&&(c+="#");var e=this.getHash(c);for(b in a)e[b]=a[b];c=c.split("#")[0]+"#";for(b in e)c+=b+"="+e[b]+"&";return c=c.substr(0,c.length-1)},getHash:function(d){d=d||window.location.href;if(0>d.indexOf("#"))return{};d=d.split("#")[1];if(""===d)return{};"&"==d[d.length-1]&&(d=d.substr(0,d.length-1));d=d.replace(/"/ig,"'");d=d.replace(/=/ig,'":"');
d=d.replace(/&/ig,'","');return e.JSON.parse('{"'+(d+'"')+"}")},_globalEval:function(d){if(d&&/\S/.test(d)){var a=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0],c=document.createElement("script");c.text=d;a.insertBefore(c,a.firstChild);setTimeout(function(){a.removeChild(c)},1)}},execScript:function(d){var a=RegExp(/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig),c=e.one("head").getDOMNode(),b,h,g,f,i,j=/\ssrc=(['"])(.*?)\1/i,k=/\scharset=(['"])(.*?)\1/i;
for(a.lastIndex=0;b=a.exec(d);)if((g=(h=b[1])?h.match(j):!1)&&g[2]){b=document.createElement("script");b.src=g[2];if((f=h.match(k))&&f[2])b.charset=f[2];b.async=!0;c.appendChild(b)}else(i=b[2])&&0<i.length&&this._globalEval(i)},isDaily:function(){return/daily\.taobao\.net/.test(window.location.hostname)?!0:!1}})},{requires:["node","sizzle","json"]});