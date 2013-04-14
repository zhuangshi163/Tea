<?php

Tea::loadService("error","ErrorService");

class ErrorController extends TeaController {

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