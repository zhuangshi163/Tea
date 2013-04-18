<?php

//register global/PHP functions to be used with your template files
//You can move this to common.conf.php   $config['TEMPLATE_GLOBAL_TAGS'] = array('isset', 'empty');
//Every public static methods in TemplateTag class (or tag classes from modules) are available in templates without the need to define in TEMPLATE_GLOBAL_TAGS 
Tea::conf()->TEMPLATE_GLOBAL_TAGS = array('links', 'shorten', 'month', 'formatDate', 'debug', 'url', 'url2', 'function_deny', 'isset', 'empty');

/**
Define as class (optional)

class TemplateTag {
    public static test(){}
    public static test2(){}
}
**/

function links($str){
    Tea::loadHelper('TeaTextHelper');
    return TeaTextHelper::convertUrl($str);
}

function month($str){
    $months = array('January','February','March','April','May','Jun','July','August','September','October','November','December');
    return $months[intval($str)-1];
}

function formatDate($date, $format='jS F, Y h:i:s A'){
    return date($format, strtotime($date));
}

function shorten($str, $limit=120){
    Tea::loadHelper('TeaTextHelper');
    return TeaTextHelper::limitWord($str, $limit);
}

function debug($var){
    if(!empty($var)){
        echo '<pre>';
        print_r($var);
        echo '</pre>';
    }
}

//This will be called when a function NOT Registered is used in IF or ElseIF statment
function function_deny($var=null){
   echo '<span style="color:#ff0000;">Function denied in IF or ElseIF statement!</span>';
   exit;
}

//Build URL based on route id
function url($addRootUrl, $id, $param=null){
    Tea::loadHelper('TeaUrlBuilder');
    // param pass in as string with format
    // 'param1=>this_is_my_value, param2=>something_here'

    if($param!=null){
        $param = explode(', ', $param);
        $param2 = null;
        foreach($param as $p){
            $splited = explode('=>', $p);
            $param2[$splited[0]] = $splited[1];
        }
        return TeaUrlBuilder::url($id, $param2, $addRootUrl);
    }

    return TeaUrlBuilder::url($id, null, $addRootUrl);
}


//Build URL based on controller and method name
function url2($addRootUrl, $controller, $method, $param=null){
    Tea::loadHelper('TeaUrlBuilder');
    // param pass in as string with format
    // 'param1=>this_is_my_value, param2=>something_here'

    if($param!=null){
        $param = explode(', ', $param);
        $param2 = null;
        foreach($param as $p){
            $splited = explode('=>', $p);
            $param2[$splited[0]] = $splited[1];
        }
        return TeaUrlBuilder::url2($controller, $method, $param2, $addRootUrl);
    }

    return TeaUrlBuilder::url2($controller, $method, null, $addRootUrl);
}

?>