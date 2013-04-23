<?php

Tea::loadDao("blog","BlogDao");

class BlogService {

	//dao层对象实例
	private static $_blogDao;
	public function __construct() {	
		if(self::$_blogDao ===null){
			self::$_blogDao = new BlogDao();
		}
		//self::$_blogDao = self::$_blogDao ? self::$_blogDao : new BlogDao();
	}
//================================================= 添加 =================================================
	/**
	 * 添加新文章
	 * @param array $arr 对象数组 
	 * @return int 新添加的文章id
	 */
	public function addNewPost($arr){
		
		$id = '';	//文章id
		try {
			if(isset($arr['post'])){
				if (isset($arr['tags'])){
					//关系对象插入
					$id = self::$_blogDao ->inserRelationObject($arr['post'],$arr['tags']);
				}else {
					//单一对象插入
					$id = self::$_blogDao ->inserObject($arr['post']);
				}
			}
		} catch (Exception $e) {
			$this->writeErrorMessage($e);
		}
		return $id;
	}
	
//=================================================== 查询 ==========================================	
	/**
	 * 检索的数据列表分页。用于与TeaPager
	 * 
     * Example:
     * <code>
     * Tea::db()->limit('Food',array('Recipe','Article','FoodType'),$options)
     * </code>
     * 
     * <code>
     * Tea::db()->limit('Food','Article',$options)
     * </code>
	 * 
	 * @param unknown_type $model
	 * @param unknown_type 相关的模型类名称。
	 * @param array $opt Array of options for each related model to generate the SELECT statement. Supported: <i>where, limit, select, param, joinType, match, asc, desc, custom, asArray, include, includeWhere, includeParam</i>
	 * @return mixed
	 */
	public function limit($model,$rmodel,$options){
		if ($rmodel === NULL){
    		return self::$_blogDao ->query($model,$options);
		}
	}
	
	/**
	 * Retrieve the total records in a table. COUNT()
	 * @param string $model The model class name
	 * @param string $rmodel The related models class names.
	 * @param array $options
	 * @return int total of records
	 */
	public function count($model,$rmodel,$options=null){
		$options['select'] = isset($options['having']) ? $options['select'] . ', ' : '';
		if (is_string($model)){	//类名
			$options['select'] .= 'COUNT(*) as _Teatotal';
		}else{					//对象
			if (isset($options['distinct']) && $options['distinct'] == true) {
				$options['select'] .= 'COUNT(DISTINCT '. $model->_table . '.' . $model->_fields[0] .') as _Teatotal';
			} else {
				$options['select'] .= 'COUNT('. $model->_table . '.' . $model->_fields[0] .') as _Teatotal';
			}
		}
		$options['asArray'] = true;
		$options['limit'] = 1;
		$rs  = self::$_blogDao ->query($model,$options);
		return $rs['_Teatotal'];
	}
	
	/**
	 * 获取文章及相关信息
	 * @param unknown_type $model
	 * @param unknown_type $options
	 * @return Ambigous <Ambigous, mixed, NULL, unknown>
	 */
	public function geArticle($model,$options=NULL,$original=FALSE){
		try {
			$rs = self::$_blogDao->queryRelate($model, 'Tag',$options);			
		} catch (Exception $e) {
			$this->writeErrorMessage($e);
			return TeaResult::error('查到失败');
		}
		return TeaResult::ok($rs);
	}
	

//============================================ 更新 ===================================================

//============================================ 其他	==================================================
	protected function writeErrorMessage($e){
		Tea::logger()->emerg('Error on line '.$e->getLine().' in '.$e->getFile().': <b>'.$e->getMessage().'</b>','BlogService');
		Tea::logger()->writeLogs();
	}
	
	/**
	 * 递归对象转换为数组
	 * @param object $obj
	 * @return array
	 */
	protected function object_to_array($obj)
	{
		$_arr = is_object($obj) ? get_object_vars($obj) : $obj;
		if (count($_arr)){
			foreach ($_arr as $key => $val)
			{
				$val = (is_array($val) || is_object($val)) ? $this->object_to_array($val) : $val;
				$arr[$key] = $val;
			}			
			return $arr;
		}else {
			return '';
		}
	}	
}
?>