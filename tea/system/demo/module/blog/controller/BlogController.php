<?php

Tea::loadService("blog","BlogService");

class BlogController extends TeaController {

	public static $tags;
	
	private $_blogService;
	
	public function __construct() {
		$this->_blogService = new BlogService();
		//$this->_blogService = Tea::getSingleton("BlogService");
	}
	/**
	 * Display the list of paginated Posts (draft and published)
	 */
	function home() {
        Tea::loadHelper('TeaPager');
        Tea::loadModel('Post');

        $p = new Post();
        
        //if default, no sorting defined by user, show this as pager link
        if($this->sortField=='createtime' && $this->orderType=='desc'){
            $pager = new TeaPager(Tea::conf()->APP_URL.'admin/post/page', $p->count(), 6, 10);
        }else{
            $pager = new TeaPager(Tea::conf()->APP_URL."admin/post/sort/$this->sortField/$this->orderType/page", $p->count(), 6, 10);
        }

        if(isset($this->params['pindex']))
            $pager->paginate(intval($this->params['pindex']));
        else
            $pager->paginate(1);

        $data['rootUrl'] = Tea::conf()->APP_URL;
        $data['pager'] = $pager->output;

        //Order by ASC or DESC
        if($this->orderType=='desc'){
            $data['posts'] = $p->limit($pager->limit, null, $this->sortField,
                                        //we don't want to select the Content (waste of resources)
                                        array('select'=>'id,createtime,status,title,totalcomment')
                                  );
            $data['order'] = 'asc';
        }else{
            $data['posts'] = $p->limit($pager->limit, $this->sortField, null,
                                        //we don't want to select the Content (waste of resources)
                                        array('select'=>'id,createtime,status,title,totalcomment')
                                  );
            $data['order'] = 'desc';
        }

        $this->render('admin', $data);
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
		/*
		echo memory_get_usage() , '<br>';
		$start = memory_get_usage();
		$a = Array();
		for ($i=0; $i<10000; $i++) {
			$a['tao'][$i] = $i + $i;
		}
		$mid =  memory_get_usage();
		echo memory_get_usage() , '<br>';
		for ($i=10000; $i<20000; $i++) {
			$a['post'][$i] = $i + $i;
		}
		$end =  memory_get_usage();
		echo memory_get_usage() , '<br>';
		echo 'argv:', ($mid - $start)/10000 ,'bytes' , '<br>';
		echo 'argv:',($end - $mid)/10000 ,'bytes' , '<br>';
		die;*/
		
	    Tea::loadHelper('TeaValidator');

        $_POST['post']['content'] = trim($_POST['post']['content']);

        //get defined rules and add show some error messages
        $validator = new TeaValidator;
        $validator->checkMode = TeaValidator::CHECK_SKIP;
        //$validator->checkMode = TeaValidator::CHECK_ALL_ONE;
        //$validator->checkMode = TeaValidator::CHECK_ALL;
        
        if(!$error = $validator->validate($this->changeArrayStructure($_POST), 'post_create.rules')){
            Tea::loadModel('Post');
            Tea::loadModel('Tag');
            Tea::autoload('TeaDbExpression');
            $p = new Post($_POST['post']);
            $p->createtime = new TeaDbExpression('NOW()');

            //insert the post along with the tags
            if(self::$tags!=Null){
                $tags = array();
                foreach(self::$tags as $t){
                    $tg = new Tag;
                    $tg->name = $t;
                    $tags[] = $tg;
                }
            }
            $id = $this->_blogService->addNewPost(array('post'=>$p,'tag'=>$tags));
            //clear the sidebar cache
            Tea::cache('front')->flushAllParts();

            $data['rootUrl'] = Tea::conf()->APP_URL;
            $data['title'] =  'Post Created!';
            $data['content'] =  '<p>Your post is created successfully!</p>';
            if($p->status==1)
                $data['content'] .=  '<p>Click  <a href="'.$data['rootUrl'].'article/'.$id.'">here</a> to view the published post.</p>';
            $this->render('admin_msg', $data);      
		}
		$data['rootUrl'] = Tea::conf()->APP_URL;
		$data['title'] =  'Error Occured!';
		$data['content'] =  '<p style="color:#ff0000;">'.$error.'</p>';
		$data['content'] .=  '<p>Go <a href="javascript:history.back();">back</a> to edit.</p>';
		$this->render('admin_msg', $data);
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