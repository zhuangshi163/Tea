<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Creating New Post</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="Shortcut Icon" href="http://Tea.com/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="<?php echo $data['rootUrl']; ?>global/css/style.css" media="screen" />
<link rel="stylesheet" type="text/css" href="<?php echo $data['rootUrl']; ?>global/css/demo.css" media="screen" />


</head>
<body>

<div id="wrap">

<?php include "top.php"; ?>

<div id="content">
    <div class="left">
        <p><strong>Editing Post</strong></p>
        <form method="POST" action="<?php echo $data['rootUrl']; ?>admin/post/saveNew">
            <span class="field">
                <strong>Title: </strong><br/>
                <input type="text" size="60" name="title"/>
            </span>


            <span class="field">
                <strong>Status: </strong><br/>
                <select id="status" name="status" style="width:120px;">
                    <option value="0">Draft</option>
                    <option selected="selected" value="1">Published</option>
                </select>
            </span>


            <span class="field">
                <strong>Content (should use a HTML editor here): </strong><br/>
                <textarea rows="20" cols="70" name="content"></textarea>
            </span>

            <br/><em style="color:#999">Separate different tags with commas.</em><br/>
            <span class="field">
                <strong>Tags: </strong>
                <input type="text" size="60" name="tags"/>
            </span>

            <span class="field">
                <strong>&nbsp;</strong>
                <input type="submit" value="Create This Post" style="width:300px;"/>
            </span>

        </form>
        <hr class="divider"/>

    </div>

    <div class="right">
        <?php include "admin_sidebar.php"; ?>
    </div>

    <div style="clear: both;"> </div>
</div>

<div id="bottom"> </div>

    <div id="footer">
        Powered by <a href="http://www.Tea.com/">Tea framework</a>, for educational purpose.
    </div>
</div>

</body>
</html>