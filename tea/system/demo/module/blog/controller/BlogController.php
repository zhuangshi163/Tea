<?php

Tea::loadService("blog","BlogService");

class BlogController extends TeaController {

	function home() {
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
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
		echo 'You are visiting '.$_SERVER['REQUEST_URI'];
	}

}
?>