<?php

Tea::loadDao("blog","BlogDao");

class BlogService {

	//dao层对象实例
	private $_blogDao=null;

	public function __construct() {
		if($this->_blogDao ===null){
			$this->_blogDao = new BlogDao();
		}
		//$this->_blogDao = $this->_blogDao ? $this->_blogDao : new BlogDao();
	}

	/**
	 * 单一对象插入
	 * @param unknown_type $model
	 */
	public function addObject($model) {
		return $this->_blogDao ->inserObject($model);
	}

	/**
	 * 关系对象插入
	 * @param unknown_type $model
	 * @param unknown_type $rmodels
	 */
	public function addRelationObject($model,$rmodels){
		return $this->_blogDao ->inserRelationObject($model,$rmodels);
	}
	public function findObject($model,$options=null) {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	public function deleteObject($model,$options=null) {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	/**
	 * 添加新文章
	 * @param array $arr 对象数组 
	 * @return int 新添加的文章id
	 */
	public function addNewPost($arr){

		$id = '';	//文章id
		try {
			if(isset($arr['post'])){
				if (isset($arr['tags'])){
					$id = $this->_blogDao ->inserRelationObject($arr['post'],$arr['tags']);
				}else {
					$id = $this->_blogDao ->inserObject($arr['post']);
				}
			}
		} catch (Exception $e) {
			Tea::logger()->emerg('Error on line '.$e->getLine().' in '.$e->getFile().': <b>'.$e->getMessage().'</b>','BlogService');
			Tea::logger()->writeLogs();
		}
		return $id;
	}
}
?>