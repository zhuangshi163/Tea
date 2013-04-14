<?php

Tea::loadDao("blog","BlogDao");

class BlogService {

	//dao层对象实例
	private $_blogDao;

	public function __construct() {
		$this->_blogDao = $this->_blogDao ? $this->_blogDao : new BlogDao();
	}

	public function addObject($model) {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	public function findObject($model,$options=null) {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	public function deleteObject($model,$options=null) {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

}
?>