// 抽取常用功能
/*KISSY.use("node,dom,sizzle,event", function(S, Node, DOM, Sizzle, Event){
	S.ready(function(){
		var $ = Node.all;
		$('[data-name=favorite]').on("click",function(){
			var d = $('[data-name=favorite]').attr('rel');
			var c = '测试Demo';
			if(document.all) {
				window.external.AddFavorite(d, c);
			} else {
				if(window.sidebar) {
					window.sidebar.addPanel(c, d, "");
				} else {
					alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
				}
			}
		});		
	});
});*/
KISSY.use("core", function(S){
	S.ready(function(){		
		S.query('[data-name=favorite]').on("click",function(){
			alert('dddddddddddddd');
		});
		
	});
});
