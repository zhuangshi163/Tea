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

}
?>