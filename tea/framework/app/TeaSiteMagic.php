<?php
/**
 * TeaSiteMagic class file.
 *
 * @author Leng Sheng Hong <darkredz@gmail.com>
 * @link http://www.Tea.com/
 * @copyright Copyright &copy; 2009 Leng Sheng Hong
 * @license http://www.Tea.com/license
 */

/**
 * TeaSiteMagic provides useful tools in development.
 *
 * <p>If you have your routes defined, call TeaSiteMagic::buildSite() and
 * it will generate the Controller files for all the controllers defined along with the methods</p>
 *
 * <p>TeaSiteMagic also generates sitemap(routes.conf.php) and some features for development use.</p>
 *
 * @author Leng Sheng Hong <darkredz@gmail.com>
 * @version $Id: TeaSiteMagic.php 1000 2009-08-06 17:10:12
 * @package Tea.app
 * @since 1.1
 */
class TeaSiteMagic{

    /**
     * Display some info as a welcome page for Tea
     */
    public static function displayHome(){
        echo '<div style="font-family:\'Courier New\', Courier, monospace;"><h1>It Works!</h1>';
        echo '<h3>What now?</h3><p><a href="'. Tea::conf()->APP_URL .'tools/sitemap.html">Generate Sitemap</a> | <a href="'. Tea::conf()->APP_URL .'index.php/gen_site">Generate Controllers</a> | <a href="'. Tea::conf()->APP_URL .'index.php/gen_component">Generate Components</a> | <a href="'. Tea::conf()->APP_URL .'index.php/gen_model">Generate Models</a> | <a href="'. Tea::conf()->APP_URL .'tools/logviewer.html">View Logs</a> | <a href="'. Tea::conf()->APP_URL .'index.php/allurl">View All URLs</a></p>';
        echo '<br/><strong>Suggested workflow:</strong><ol>
                  <li>Plan your website and draft a sitemap</li>
                  <li>Convert the sitemap into routes.conf.php</li>
                  <li>Generate the Controllers</li>
                  <li>Define your database relationship & settings</li>
                  <li>Generate the Models</li>
                  <li>Start coding & have fun !</li></ol></div>';
    }

    /**
     * Display logs/profiles message from the XML log files.
     */
    public static function showDebug($filename){
        $path = isset(Tea::conf()->LOG_PATH) ? Tea::conf()->LOG_PATH : Tea::conf()->SITE_PATH;
        header('Content-Type: text/xml');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        echo '<xml>';
        if(isset($filename))
            include $path . $filename .'.xml';
        else
            include $path . 'log.xml';
        echo '</xml>';
        exit;
    }

    /**
     * Show all URLs available in application based on the route definition
     */
    public static function showAllUrl(){
        $data = array();
        $n = 1;
        $route = Tea::app()->route;
        foreach($route as $req=>$r){
            foreach($r as $rname=>$value){
                if($rname=='root' || $rname=='catchall'){
                    foreach($value as $rname2=>$value2){
                        $rname_strip = 'index.php'.$rname2;
                        $data[$n++ ." $req"] = '<a href="'.Tea::conf()->APP_URL.$rname_strip.'">'.$rname2.'</a>';
                    }
                }else{
                    $rname_strip = 'index.php'.$rname;
                    $data[$n++ ." $req"] = '<a href="'.Tea::conf()->APP_URL.$rname_strip.'">'.$rname.'</a>';
                }
            }
        }
        echo '<pre>';
        print_r($data);
    }

    /**
     * Write the generated routes into routes.conf.php
     * @param bool $replace To replace the existing routes.conf.php
     */
    public static function buildSitemap($replace=false){
        if(!isset($_POST['routes']) || empty($_POST['routes'])){
            echo 'result=false';
        }else{
            if(get_magic_quotes_gpc())
                $_POST['routes']=str_replace("\\",'',$_POST['routes']);
            $replacename = ($replace)?'routes':'routes2';
            $handle = fopen(Tea::conf()->SITE_PATH . Tea::conf()->PROTECTED_FOLDER . 'config/'.$replacename.'.conf.php', 'w+');
            $rs = fwrite($handle, "<?php\n\n".$_POST['routes']."\n\n?>");
            fclose($handle);
            if($rs===False){
                echo 'result=false';
            }else{
                echo 'result=true';
            }
        }
    }

    /**
     * Generates Controller class files from routes definition
     */
    public static function buildSite(){
        include Tea::conf()->SITE_PATH . 'configs/routes.conf.php';
        $controllers = array();
        foreach($route as $req=>$r){
            foreach($r as $rname=>$value){
                $controllers[$value[0]][] = $value[1];
            }
        }

        echo "<html><head><title>Tea Site Generator </title></head><body bgcolor=\"#2e3436\">";
        $total = 0;

        foreach($controllers as $cname=>$methods){
        	//模块名
        	$mname = str_replace('controller','',strtolower($cname));
        	//对应的service
        	$sname = str_replace('controller','Service',ucfirst(strtolower($cname)));
        	//导入service         
            $importService = "Tea::loadService(\"$mname\",\"$sname\");";
            $filestr = '';
            $filestr .= "<?php\n\n$importService\n\nclass $cname extends TeaController {" ;
            $methods = array_unique($methods);
            //创建模块目录
            $controllerDir = Tea::conf()->SITE_PATH . Tea::conf()->PROTECTED_FOLDER . "".str_replace('controller','',strtolower($cname)).'/controller';	//取之controller前面为其控制器目录名
            $controllerFile = $controllerDir.'/'.$cname.'.php';
            if(!is_dir($controllerDir)){
            	mkdir($controllerDir,0777,true);	//递归模式创建目录的
            }
            foreach($methods as $mname){
                $filestr .= "\n\n\tfunction $mname() {\n\t\techo 'You are visiting '.\$_SERVER['REQUEST_URI'];\n\t}";
            }
            $filestr .= "\n\n}\n?>";
            if(file_exists($controllerFile)){
                echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><strong><span style=\"color:#729fbe;\">$cname.php</span></strong><span style=\"color:#fff;\"> <span style=\"color:#fff;\">file exists! Skipped ...</span></span></span><br/><br/>";
            }else{
                echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><span style=\"color:#fff;\">Controller file </span><strong><span style=\"color:#e7c118;\">$cname</span></strong><span style=\"color:#fff;\"> generated.</span></span><br/><br/>";
                $total++;
                $handle = fopen($controllerFile, 'w+');
                fwrite($handle, $filestr);
                fclose($handle);
            }
        }
        echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;color:#fff;\">Total $total file(s) generated.</span></body></html>";
    }
    

    /**
     * Generates Component class files from routes definition
     */
    public static function buildComponent(){
    	include Tea::conf()->SITE_PATH . 'configs/routes.conf.php';
    	$module = array();
    	foreach($route as $req=>$r){
    		foreach($r as $rname=>$value){
    			$module[$value[0]][] = $value[1];
    		}
    	}
    
    	echo "<html><head><title>Tea Site Generator </title></head><body bgcolor=\"#2e3436\">";
    	$total = 0;
    
    	foreach($module as $cname=>$methods){
    		//模块名
    		$mname = str_replace('controller','',strtolower($cname));
    		
    		//变量名
    		$dvname = str_replace('controller','Dao',strtolower($cname));
    		$svname = str_replace('controller','Service',strtolower($cname));
    		//类名（首字母大写）
    		$dname = str_replace('controller','Dao',ucfirst(strtolower($cname)));
    		$sname = str_replace('controller','Service',ucfirst(strtolower($cname)));
    		$daoStr = '';
    		$serviceStr = '';
    		$daoStr .= "<?php\n\nclass $dname extends TeaDao {" ;
    		//导入dao层
    		$importDao ="Tea::loadDao(\"$mname\",\"$dname\");";
    		$serviceStr .= "<?php\n\n$importDao\n\nclass $sname {" ;
    		$methods = array_unique($methods);
    		//创建模块目录
    		$daoDir = Tea::conf()->COM_PATH .str_replace('controller','',strtolower($cname)).'/dao/';	//取之controller前面为其dao目录名
    		$serviceDir = Tea::conf()->COM_PATH .str_replace('controller','',strtolower($cname)).'/service/';	//取之controller前面为其sercie目录名
    		$daoFile = $daoDir.$dname.'.php';
    		$serviceFile = $serviceDir.$sname.'.php';
    		if(!is_dir($daoDir)){
    			mkdir($daoDir,0777,true);	//递归模式创建目录的
    		}
    		if(!is_dir($serviceDir)){
    			mkdir($serviceDir,0777,true);	//递归模式创建目录的
    		}
    		/*
    			foreach($methods as $mname){
    		$dmname = 'test';
    		$smname = 'test';
    		if (strpos($mname, 'saveNew') !== FALSE){
    		$oNmae = str_replace('saveNew','',strtolower($mname));	//单一对象名（下一版本）
    		$dmname = str_replace('saveNew','insert',strtolower($mname));
    		$smname = str_replace('saveNew','add',strtolower($mname));
    		}
    		$daoStr .= "\n\n\tpublic function $dmname() {\n\t\t\n\t}";
    		$serviceStr .= "\n\n\tpublic function $smname() {\n\t\techo 'You are visiting '.\$_SERVER['REQUEST_URI'];\n\t}";
    
    		}*/
    		//属性
    		
    		$serviceStr .= "\n\n\t//dao层对象实例\n\tprivate \$_$dvname;";
    		//初始化办法（对象单一性）
    		$serviceStr .= "\n\n\tpublic function __construct() {\n\t\t\$this->_$dvname = \$this->_$dvname ? \$this->_$dvname : new $dname();\n\t}";
    		
    		//添加
    		$daoStr .= "\n\n\tpublic function inserObject(\$model) {\n\t\t\n\t}";
    		$serviceStr .= "\n\n\tpublic function addObject(\$model) {\n\t\techo 'You are visiting '.\$_SERVER['REQUEST_URI'];\n\t}";
    			
    		//查询
    		$daoStr .= "\n\n\tpublic function queryObject(\$model,\$options=null) {\n\t\t\n\t}";
    		$serviceStr .= "\n\n\tpublic function findObject(\$model,\$options=null) {\n\t\techo 'You are visiting '.\$_SERVER['REQUEST_URI'];\n\t}";
    			
    		//删除
    		$daoStr .= "\n\n\tpublic function deleteObject(\$model,\$options=null) {\n\t\t\n\t}";
    		$serviceStr .= "\n\n\tpublic function deleteObject(\$model,\$options=null) {\n\t\techo 'You are visiting '.\$_SERVER['REQUEST_URI'];\n\t}";
    
    		$daoStr .= "\n\n}\n?>";
    		$serviceStr .= "\n\n}\n?>";
    		if(file_exists($daoFile)){
    			echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><strong><span style=\"color:#729fbe;\">$dname.php</span></strong><span style=\"color:#fff;\"> <span style=\"color:#fff;\">file exists! Skipped ...</span></span></span><br/><br/>";
    		}else{
    		echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><span style=\"color:#fff;\">Controller file </span><strong><span style=\"color:#e7c118;\">$dname</span></strong><span style=\"color:#fff;\"> generated.</span></span><br/><br/>";
    		$total++;
    		$handle = fopen($daoFile, 'w+');
    				fwrite($handle, $daoStr);
    				fclose($handle);
    		}
    			
    		if(file_exists($serviceFile)){
    		echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><strong><span style=\"color:#729fbe;\">$sname.php</span></strong><span style=\"color:#fff;\"> <span style=\"color:#fff;\">file exists! Skipped ...</span></span></span><br/><br/>";
    		}else{
    		echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;\"><span style=\"color:#fff;\">Controller file </span><strong><span style=\"color:#e7c118;\">$sname</span></strong><span style=\"color:#fff;\"> generated.</span></span><br/><br/>";
    		$total++;
    		$handle = fopen($serviceFile, 'w+');
    		fwrite($handle, $serviceStr);
    		fclose($handle);
    		}
    		}
    		echo "<span style=\"font-size:190%;font-family: 'Courier New', Courier, monospace;color:#fff;\">Total $total file(s) generated.</span></body></html>";
    }
}
