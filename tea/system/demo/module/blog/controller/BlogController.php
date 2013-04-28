<?php

Tea::loadService("blog","BlogService");

class BlogController extends TeaController {

	public $sortField = 'createtime';
	public $orderType = 'desc';	//排序 or asc
	public static $tags;
	
	private $_blogService;
	
	public function __construct() {
		//$this->_blogService = new BlogService();
		$this->_blogService = Tea::getSingleton("BlogService");
	}
	/**
	 * Display the list of paginated Posts (draft and published)
	 */
	function home() {
        Tea::loadHelper('TeaPager');
        //查询条件
        $options = NULL;
        //总记录数
        $total = $this->_blogService->count('Post', NULL, $options);
        
        
        //if default, no sorting defined by user, show this as pager link
        if($this->sortField=='createtime' && $this->orderType=='desc'){
            $pager = new TeaPager(Tea::conf()->APP_URL.'blog/post/page', $total, 6, 10);
        }else{
            $pager = new TeaPager(Tea::conf()->APP_URL."blog/post/sort/$this->sortField/$this->orderType/page", $total, 6, 10);
        }

        if(isset($this->params['pindex']))
            $pager->paginate(intval($this->params['pindex']));
        else
            $pager->paginate(1);
		
        //查询条件	还可定制 如：$options['custom'] = ','. $desc .' DESC';
        $options = array('limit'=>$pager->limit,$this->orderType=>$this->sortField,'select'=>'id,createtime,status,title,totalcomment');
        $data['posts'] = $this->_blogService->limit('Post', NULL, $options);
        
        $data['rootUrl'] = Tea::conf()->APP_URL;
        $data['pager'] = $pager->output;
        $data['order'] = $this->orderType;	//排序
        $this->render('admin', $data);
	}

	function page() {
		if(isset($this->params['pindex']) && $this->params['pindex']>0)
			$this->home();
		else
			return 404;
	}

	function sortBy() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}


    /**
     * Show single blog post for editing
     */
	private function getArticle($id) {
        Tea::loadModel('Post');
        $p = new Post();
        $p->id = intval($id);
        
        $result = $this->_blogService->geArticle($p,
	        									array(
	                                            'limit'=>'first',
	                                            'asc'=>'tag.name',
	                                            'match'=>false	      //Post with no tags should be displayed too
	                                        	)
        								);
       if (!$data['post']  = TeaResult::getData($result,false)){       	
       	return array('/error/postNotFound/'.$p->id,'internal');
       }
       $data['tags'] = array();
       foreach($data['post']->Tag as  $t){
       	$data['tags'][] = $t->name;
       }
       $data['tags'] = implode(', ', $data['tags']);
   		return $data;
	}

	public function editPost(){
		$data = $this->getArticle($this->params['pid']);
		$data['rootUrl'] = Tea::conf()->APP_URL;
		$this->render('admin_edit_post', $data);
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
	/**
	 * Save changes made in Post editing
	 */
	function savePostChanges(){
		Tea::loadHelper('TeaValidator');
	
		$_POST['post']['content'] = trim($_POST['post']['content']);
	
		//get defined rules and add show some error messages
		$validator = new TeaValidator;
		$validator->checkMode = TeaValidator::CHECK_SKIP;
		//$validator->checkMode = TeaValidator::CHECK_ALL;
	
		if($error = $validator->validate($this->changeArrayStructure($_POST), 'post_edit.rules')){
			/*//$error = TeaResult::error($error);
			$data = $this->getArticle($_POST['post']['id']);
			$data['error'] = $error;
			//print_r($data);die;
			unset($error);
			$data['rootUrl'] = Tea::conf()->APP_URL;
			
			$this->render('admin_edit_post', $data);
			
			die;*/
			$data['rootUrl'] = Tea::conf()->APP_URL;
			$data['title'] =  'Error Occured!';
			$data['content'] =  '<p style="color:#ff0000;">'.$error.'</p>';
			$data['content'] .=  '<p>Go <a href="javascript:history.back();">back</a> to edit.</p>';
			$this->render('admin_msg', $data);
		}
		else{
			Tea::loadModel('Post');
			Tea::loadModel('Tag');
	
			$p = new Post($_POST);
	
			//delete the previous linked tags first
			Tea::loadModel('PostTag');
			$pt = new PostTag;
			$pt->post_id = $p->id;
			$pt->delete();
	
			//update the post along with the tags
			if(self::$tags!=Null){
				$tags = array();
				foreach(self::$tags as $t){
					$tg = new Tag;
					$tg->name = $t;
					$tags[] = $tg;
				}
				$p->relatedUpdate($tags);
			}
			//if no tags, just update the post
			else{
				$p->update();
			}
	
			//clear the sidebar cache
			Tea::cache('front')->flushAllParts();
	
			$data['rootUrl'] = Tea::conf()->APP_URL;
			$data['title'] =  'Post Updated!';
			$data['content'] =  '<p>Your changes is saved successfully.</p>';
			$data['content'] .=  '<p>Click  <a href="'.$data['rootUrl'].'article/'.$p->id.'">here</a> to view the post.</p>';
			$this->render('admin_msg', $data);
		}
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
            if($id){
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
		$data['rootUrl'] = Tea::conf()->APP_URL;
		$data['title'] =  'Error Occured!';
		$data['content'] =  '<p style="color:#ff0000;">'.$error.'</p>';
		$data['content'] .=  '<p>Go <a href="javascript:history.back();">back</a> to edit.</p>';
		$this->render('admin_msg', $data);
	}

	/**
	 * Validate if post exists
	 */
	static function checkPostExist($id){
		return '';
		Tea::loadModel('Post');
		$p = new Post;
		$p->id = $id;
	
		//if Post id doesn't exist, return an error
		if($p->find(array('limit'=>1, 'select'=>'id'))==Null)
			return 'Post ID not found in database';
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