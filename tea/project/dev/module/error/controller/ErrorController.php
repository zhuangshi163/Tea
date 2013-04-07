<?php

class ErrorController extends TeaController {

	function index() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

}
?>