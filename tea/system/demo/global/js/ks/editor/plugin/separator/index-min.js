/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Apr 3 14:30
*/
KISSY.add("editor/plugin/separator/index",function(b){function a(){}b.augment(a,{pluginRenderUI:function(a){b.all('<span class="'+a.get("prefixCls")+'editor-toolbar-separator">&nbsp;</span>').appendTo(a.get("toolBarEl"))}});return a},{requires:["editor"]});
