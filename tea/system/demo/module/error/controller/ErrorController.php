<?php

Tea::loadService("error","ErrorService");

class ErrorController extends TeaController {

	//service层对象
	private $_errorService;

	public function __construct() {
		$this->_errorService = Tea::getSingleton("ErrorService");
	}

	function defaultError() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function loginError() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

	function postError() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

}
?>