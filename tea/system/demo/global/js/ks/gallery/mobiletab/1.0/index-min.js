KISSY.add("gallery/mobiletab/1.0/index",function(i,j){return j},{requires:["./mobiletab"]});
KISSY.add("gallery/mobiletab/1.0/mobiletab",function(i,j,s,n,r){function f(a,g){var c=this;if(!(c instanceof f))return new f(a,g);c.html=b.get(a).innerHTML;c.reload=function(){var e=b.attr(c.container,"data-index")?b.attr(c.container,"data-index")-0:0;b.html(a,c.html);var d=new f(a,g);d.switchTo(e);return d};c.log=b.create("<div>");b.insertBefore(c.log,a);g.beforeStart&&g.beforeStart();f.superclass.constructor.apply(c,arguments)}var b=j;f.Config={circular:!1,effect:"scrollx",duration:0.2,easing:"easeOut",
scrolltab:!1};f.Plugins=[];i.extend(f,n,{_init:function(){var a=this;f.superclass._init.call(a);var g=!1,c=a.content,e=!1,d,k,m,h,j=0,l;c.addEventListener("touchstart",function(a){a=a.touches[0];m=parseInt(b.css(c,"left"));d=a.pageX;k=a.pageY;j=i.now()});c.addEventListener("touchmove",function(a){if(!g){var f=a.touches[0];h=f.pageX-d;l=f.pageY-k;5<Math.abs(h)&&Math.abs(h)>Math.abs(l)?(a.preventDefault(),e=!0,b.css(c,{left:m+h+"px"})):e=!1;Math.abs(h)<Math.abs(l)&&(e=!1)}});c.addEventListener("touchend",
function(){if(e){var d=a.viewSize[0],f=d/2,m=b.width(c),k=a.config,l=b.width(a.container),n=b.offset(a.container).left,q=b.offset(a.content).left;if(!g){var o=a.activeIndex,p=function(d){if(!d)var c=-a.viewSize[0]*o+"px";"start"==d&&(c=0);"end"==d&&(c=b.width(a.container)-b.width(a.content)+"px");a.anim=(new i.Anim(a.content,{left:c},k.duration,k.easing,function(){a.anim=r},k.nativeAnim)).run()};Math.abs(h)>f||0.2<Math.abs(h/(j-i.now()))?0>h?q+m-n>l?a.switchTo(o+Math.ceil(Math.abs(h)/d)):(a.activeIndex=
a.length-1,p("end")):-q>=d?a.switchTo(o-Math.ceil(Math.abs(h)/d)):0!=a.activeIndex?a.switchTo(0):p("start"):p()}}});a.on("beforeSwitch",function(d){if(d.toIndex>a.length-1)return!1;g=!0});a.on("switch",function(){g=!1;h=0;b.attr(a.container,"data-index",a.activeIndex)});a.config.scrolltab&&a.scrolltab()},scrolltab:function(){var a=this,g=b.width(a.triggers[0]),c=b.width(a.container),e=Math.floor(c/g);i.each(a.triggers,function(a){b.width(a,b.width(a))});var d=f(a.container,{panels:a.triggers,hasTriggers:!1,
viewSize:[g]});a.on("beforeSwitch",function(c){var b=c.toIndex;b>a.activeIndex?b>=Math.ceil(e/2)&&b<=Math.floor(d.length-e/2)&&d.switchTo(b-Math.ceil(e/2)+1):b>=Math.ceil(e/2)-1&&b<=Math.floor(d.length-e/2-1)&&(b=c.toIndex,d.switchTo(b-Math.ceil(e/2)+1));b<Math.ceil(e/2)&&d.switchTo(0);b>Math.floor(d.length-e/2-1)&&d.switchTo(Math.floor(d.length-e))})}});return f},{requires:["dom","event","switchable"]});