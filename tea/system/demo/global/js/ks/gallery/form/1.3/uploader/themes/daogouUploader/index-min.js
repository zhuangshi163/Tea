KISSY.add("gallery/form/1.3/uploader/themes/daogouUploader/index",function(h,g,j){function d(a){d.superclass.constructor.call(this,a)}var e=g.all;h.extend(d,j,{afterUploaderRender:function(a){a.on("select",function(a){a=a.files[0].name;e(".J_FileName").val(a)})},_getStatusWrapper:function(a){return a&&a.children(".J_FileStatus")||e("")},_waitingHandler:function(){},_startHandler:function(a){var b=this,c=a.uploader,d=a.index,g=b.get("queue"),c=c.get("type"),i=a.file,a=e(".J_ProgressBar_"+a.id);b._showMsg(i,
".J_UploadingMsg");if("ajax"==c||"flash"==c){var c=b.get("oPlugin").progressBar,f;c&&(f=new c(a,{width:b.get("progressBarWidth")}),f.on("change",function(a){100==a.value&&h.later(function(){b._showMsg(i,".J_SuccessMsg")},200)}),f.render());g.updateFile(d,{progressBar:f})}},_progressHandler:function(a){var b=a.file,a=Math.ceil(100*(a.loaded/a.total)),b=b.progressBar;if(!b)return!1;b.set("value",a)},_successHandler:function(a){a.file.progressBar.set("value",100)},_errorHandler:function(a){var b=a.msg;
e(".J_ErrorMsg_"+a.id).html(b);self._showMsg(a.file,".J_ErrorMsg")},_showMsg:function(a,b){var c=e(a.target);c.all(".status-msg").hide();c.all(b).show()}},{ATTRS:{name:{value:"daogouUploader"},cssUrl:{value:"gallery/form/1.3/uploader/themes/daogouUploader/style.css"},fileTpl:{value:'<div id="queue-file-{id}" class="file-uploading" data-name="{name}"><div class="J_UploadingMsg status-msg"><p class="file-name">{name}</p><p class="tx">\u6b63\u5728\u90e8\u7f72\uff0c\u8bf7\u7a0d\u5019...</p><div class="J_ProgressBar_{id} f-l uploader-progress"><img class="loading" src="http://img01.taobaocdn.com/tps/i1/T1F5tVXjRfXXXXXXXX-16-16.gif" alt="loading" /></div></div><div class="J_SuccessMsg status-msg"><i class="i-success"></i><div class="tx"><b>\u4e0a\u4f20\u6210\u529f!</b></div><div class="J_ErrorMsg status-msg"> <i class="i-tip"></i> <div class="tx"><b>\u4e0a\u4f20\u5931\u8d25\uff1a<i class="dg-light J_ErrorMsg_{id}"></i></b></div></div></div>'},
plugins:{value:["progressBar"]},progressBarWidth:{value:400}}});return d},{requires:["node","../../theme"]});
