<?php

//rules for create Post form
return array(
        'post_title' => array(
            array( 'maxlength', 145, 'Title cannot be longer than the 145 characters.' ),
            array( 'notnull' ),
            array( 'notEmpty', 'Title cannot be empty.' ),
        	array( 'required', '标题是必填的项' ),
        ),

        'post_content' => array(
            array( 'notnull' ),
            array( 'notEmpty', 'Post content cannot be empty!' ),
        	array( 'required', '内容是必填的项' ),
        ),

        'post_status' => array(
            array( 'integer', 'Invalid status for blog post' ),
            array( 'max', 1, 'Invalid status for blog post' ),
            array( 'min', 0, 'Invalid status for blog post' ),
        ),
        'tag_name'=>array(
            array('custom', 'BlogController::checkTags'),
            array('optional')
        )
    );
?>