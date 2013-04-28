<!DOCTYPE>
<html>
<head>
<title>Editing - <?php echo $data['post']->title; ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="Shortcut Icon" href="http://Tea.com/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="<?php echo $data['rootUrl']; ?>global/css/style.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php echo $data['rootUrl']; ?>global/css/demo.css" media="screen" />
</head>
<body>

<div id="wrap">

<?php include Tea::conf()->SITE_PATH .  Tea::conf()->PROTECTED_FOLDER . Tea::conf()->MODULE_NAME . "viewc/library/top.php"; ?>

<div id="content">
    <div class="left">
        <p><strong>Editing Post</strong></p>
        <form method="POST" id="P_form" action="<?php echo $data['rootUrl']; ?>blog/post/save">
            <span class="field">
                <strong>Title: </strong><br/>
                <input type="text" value="<?php echo $data['post']->title; ?>" size="60" name="post[title]" data-valid="{}" data-showerror="<?php echo $data['error']->post_title; ?>"/>
            </span>


            <span class="field">
                <strong>Status: </strong><br/>
                <select id="status" name="post[status]" style="width:120px;">
                    <?php if( $data['post']->status==1 ): ?>
                    <option value="0">Draft</option>
                    <option selected="selected" value="1">Published</option>
                    <?php else: ?>
                    <option selected="selected" value="0">Draft</option>
                    <option value="1">Published</option>
                    <?php endif; ?>
                </select>
            </span>


            <span class="field">
                <strong>Content (should use a HTML editor here): </strong><br/>
                <textarea rows="20" cols="70" name="post[content]" data-valid="{}" data-showerror="<?php echo $data['error']['post_content']; ?>"><?php echo $data['post']->content; ?></textarea>
            </span>

            <br/><em style="color:#999">Separate different tags with commas.</em><br/>
            <span class="field">
                <strong>Tags: </strong>
                <input type="text" value="<?php echo $data['tags']; ?>" size="60" name="tag[name]"/>
            </span>

            <span class="field">
                <strong>&nbsp;</strong>
                <input id="submit" type="submit" value="Update post" style="width:240px;"/>
                <input type="button" value="Delete post" onclick="javascript:delPost();" style="width:240px;"/>
            </span>
            
            <input type="hidden" value="<?php echo $data['post']->id; ?>" name="post[id]"/>

            <em class="datePosted">Posted on <?php echo formatDate($data['post']->createtime); ?></em>

        </form>
        <hr class="divider"/>

    </div>

    <div class="right">
        <?php include Tea::conf()->SITE_PATH .  Tea::conf()->PROTECTED_FOLDER . Tea::conf()->MODULE_NAME . "viewc/library/admin_sidebar.php"; ?>
    </div>

    <div style="clear: both;"> </div>
</div>

<div id="bottom"> </div>
<?php include Tea::conf()->SITE_PATH .  Tea::conf()->PROTECTED_FOLDER . Tea::conf()->MODULE_NAME . "viewc/library/footer.php"; ?>
</div>
<script>
    function delPost(){
        window.location="<?php echo $data['rootUrl']; ?>blog/post/delete/<?php echo $data['post']->id; ?>";
    }
	KISSY.config({
	  packages:[
	    {
	      name:"gallery",
	      tag:"20111220",
	      path:"../../../global/js/ks/",  // 开发时目录, 发布到cdn上需要适当修改
	      charset:"utf-8"
	    }
	  ]
	});
	KISSY.use("gallery/validation/1.0/",function(S,Validation){
	 
	    var form = new Validation('#P_form',{  
		    style:'under'
	    });
		
		 KISSY.Event.on('#submit',"click",function(){
			if(form.isValid()){
				return true;
			};
			return false;
		}); 
	 
	});	
</script>
</body>
</html>