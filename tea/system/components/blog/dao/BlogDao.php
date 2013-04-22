<?php

class BlogDao extends TeaDao {

//================================== 插入 ====================================================================	
	/**
	 * 单一对象插入
	 * @param unknown_type $model
	 * @return Ambigous <number, string>
	 */
	public function inserObject($model) {
		return Tea::db()->insert($model);
	}

	/**
	 * 多对象插入
	 * Adds a new record with its associated models. Relational insert. (Prepares and execute the INSERT statements)
	 * @param object $model The model object to be insert.
	 * @param array $rmodels A list of associated model objects to be insert along with the main model.
	 * @return int The inserted record's Id
	 */
	public function inserRelationObject($model, $rmodels){
		return Tea::db()->relatedInsert($model, $rmodels);
	}
	
//========================================= 查询 ==========================================================	
	/**
	 * 单一对象查询
	 * @param unknown_type $model
	 * @param unknown_type $options
	 * @return mixed
	 */
	public function query($model,$options=null) {
		return Tea::db()->find($model,$options);
	}

	/**
	 * 双对象查询
	 * @param unknown_type $model
	 * @param unknown_type $rmodel
	 * @param unknown_type $options
	 * @return Ambigous <mixed, NULL, unknown>
	 */
	public function queryRelate($model,$rmodel,$options=null) {
		return Tea::db()->relate($model, $rmodel,$options);
	}
	
	/**
	 * 多对象查询
	 * @param unknown_type $model
	 * @param unknown_type $rmodel
	 * @param unknown_type $options
	 * @return Ambigous <mixed, void, NULL, unknown>
	 */
	public function queryRelateMany($model,$rmodel,$options=null) {
		return Tea::db()->relateMany($model, $rmodel,$options);
	}
	
	public function deleteObject($model,$options=null) {
		
	}

}
?>