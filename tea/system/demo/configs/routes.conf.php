<?php
//---------- Delete if not needed ------------
$route['*']['/gen'] = array('DefaultController', 'index');

$admin = array('admin'=>'1234','guest'=>'guest');

//view the logs and profiles XML, filename = db.profile, log, trace.log, profile
$route['*']['/debug/:filename'] = array('DefaultController', 'debug', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//show all urls in app
$route['*']['/allurl'] = array('DefaultController', 'allurl', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//generate routes file. This replace the current routes.conf.php. Use with the sitemap tool.
$route['post']['/gen_sitemap'] = array('DefaultController', 'gen_sitemap', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//generate routes & controllers. Use with the sitemap tool.
$route['post']['/gen_sitemap_controller'] = array('DefaultController', 'gen_sitemap_controller', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//generate Controllers automatically
$route['*']['/gen_site'] = array('DefaultController', 'gen_site', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//generate components automatically
$route['*']['/gen_component'] = array('DefaultController', 'gen_component', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');

//generate Models automatically
$route['*']['/gen_model'] = array('DefaultController', 'gen_model', 'authName'=>'Tea Admin', 'auth'=>$admin, 'authFail'=>'Unauthorized!');


//blog home page
$route['*']['/'] =
$route['*']['/blog/post'] = array('BlogController', 'home');

//blog list posts pagination
$route['*']['/blog/page/:pindex'] =
$route['*']['/blog/post/page/:pindex'] = array('BlogController', 'page');

//blog list posts Sorting (asc/desc) and pagination
$route['*']['/blog/sort/:sortField/:orderType'] =
$route['*']['/blog/post/sort/:sortField/:orderType'] =
$route['*']['/blog/post/sort/:sortField/:orderType/page/:pindex'] = array('BlogController', 'sortBy');

//blog edit Post
$route['*']['/blog/post/edit/:pid'] = array('BlogController', 'getArticle');

$route['post']['/blog/post/save'] = array('BlogController', 'savePostChanges');


//blog create Post
$route['*']['/blog/post/create'] = array('BlogController', 'createPost');

$route['post']['/blog/post/saveNew'] = array('BlogController', 'saveNewPost');

//blog delete Post
$route['*']['/blog/post/delete/:pid'] = array('BlogController', 'deletePost');

//blog list unapproved comments
$route['*']['/blog/comment'] = array('BlogController', 'listComment');

$route['*']['/blog/comment/approve/:cid'] = array('BlogController', 'approveComment');

$route['*']['/blog/comment/reject/:cid'] = array('BlogController', 'rejectComment');


//error displays
$route['*']['/error'] = array('ErrorController', 'defaultError');
$route['*']['/error/loginFail'] = array('ErrorController', 'loginError');
$route['*']['/error/postNotFound/:pid'] = array('ErrorController', 'postError');

?>