<?php

Tea::loadDao("error","ErrorDao");

class ErrorService {

	//dao层对象实例
	private $_errorDao;

	public function __construct() {
		$this->_errorDao = $this->_errorDao ? $this->_errorDao : new ErrorDao();
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