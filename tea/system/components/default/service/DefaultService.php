<?php

Tea::loadDao("default","DefaultDao");

class DefaultService {

	//dao层对象实例
	private $_defaultDao;

	public function __construct() {
		$this->_defaultDao = $this->_defaultDao ? $this->_defaultDao : new DefaultDao();
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