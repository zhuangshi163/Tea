/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Apr 3 14:30
*/
KISSY.add("editor/plugin/outdent/index",function(d,c,e){function b(){}d.augment(b,{pluginRenderUI:function(a){e.init(a);a.addButton("outdent",{tooltip:"\u51cf\u5c11\u7f29\u8fdb\u91cf ",listeners:{click:function(){a.execCommand("outdent");a.focus()},afterSyncUI:function(){var b=this;a.on("selectionChange",function(){a.get("mode")!=c.SOURCE_MODE&&(a.queryCommandValue("outdent")?b.set("disabled",!1):b.set("disabled",!0))})}},mode:c.WYSIWYG_MODE})}});return b},{requires:["editor","./cmd"]});
