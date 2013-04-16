<?php

Tea::loadService("blog","BlogService");

class BlogController extends TeaController {

	public static $tags;
	
	private $_blogService;
	
	public function __construct() {
		$this->_blogService = new BlogService();
		//$this->_blogService = Tea::getSingleton("BlogService");
	}
	
	function home() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function page() {
		
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function sortBy() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function getArticle() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function createPost() {
        $data['rootUrl'] = Tea::conf()->APP_URL;
        $this->render('admin_new_post', $data);
	}

	function deletePost() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function listComment() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function approveComment() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function rejectComment() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function savePostChanges() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function saveNewPost() {
	    Tea::loadHelper('TeaValidator');

        $_POST['Post']['content'] = trim($_POST['Post']['content']);

        //get defined rules and add show some error messages
        $validator = new TeaValidator;
        $validator->checkMode = TeaValidator::CHECK_SKIP;
        //$validator->checkMode = TeaValidator::CHECK_ALL_ONE;
        //$validator->checkMode = TeaValidator::CHECK_ALL;
        
        if($error = $validator->validate($_POST, 'post_create.rules')){
            $data['rootUrl'] = Tea::conf()->APP_URL;
            $data['title'] =  'Error Occured!';
            $data['content'] =  '<p style="color:#ff0000;">'.$error.'</p>';
            $data['content'] .=  '<p>Go <a href="javascript:history.back();">back</a> to edit.</p>';
            $this->render('admin_msg', $data);
        }
        else{
            Tea::loadModel('Post');
            Tea::loadModel('Tag');
            Tea::autoload('TeaDbExpression');
            $p = new Post($_POST);
            $p->createtime = new TeaDbExpression('NOW()');

            //insert the post along with the tags
            if(self::$tags!=Null){
                $tags = array();
                foreach(self::$tags as $t){
                    $tg = new Tag;
                    $tg->name = $t;
                    $tags[] = $tg;
                }
                $id	= $this->_blogService->addRelationObject($p, $tags);
                //$id = $p->relatedInsert($tags);
            }
            //if no tags, just insert the post
            else{
            	$id = $this->_blogService->addObject($p);
            }

            //clear the sidebar cache
            Tea::cache('front')->flushAllParts();

            $data['rootUrl'] = Tea::conf()->APP_URL;
            $data['title'] =  'Post Created!';
            $data['content'] =  '<p>Your post is created successfully!</p>';
            if($p->status==1)
                $data['content'] .=  '<p>Click  <a href="'.$data['rootUrl'].'article/'.$id.'">here</a> to view the published post.</p>';
            $this->render('admin_msg', $data);
        }
	}

	/**
	 * Validate if tags is less than or equal to 10 tags based on the String seperated by commas.
	 * Tags cannot be empty 'mytag, tag2,,tag4,  , tag5' (error)
	 */
	static function checkTags($tagStr){
		//tags can be empty(no tags)
		$tagStr = trim($tagStr);
		if(empty($tagStr)){
			return;
		}
	
		$tags = explode(',', $tagStr);
	
		foreach($tags as $k=>$v){
			$tags[$k] = strip_tags(trim($v));
			if(empty($tags[$k])){
				return 'Invalid tags!';
			}
		}
	
		if(sizeof($tags)>10)
			return 'You can only have max 10 tags!';
	
		self::$tags = $tags;
	}	
}
?>