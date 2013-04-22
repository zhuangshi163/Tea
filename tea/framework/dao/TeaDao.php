<?php
/**
 * TeaDao class file.
 *
 * @author guibinweb <darkredz@gmail.com>
 * @link http://www.Tea.com/
 * @copyright Copyright &copy; 2009 guibinweb
 * @license http://www.Tea.com/license
 */ 
class TeaDao {

		
	protected function queryTableInfo($outConds,$select=array(),$tableName='',$returnFormat=ARRAY_FORMAT,$formatPara=null)
	{
		$conditions = $outConds['where'];
		$limit = isset($outConds['limit'])?$outConds['limit']:null;
		$offset = isset($outConds['offset'])?$outConds['offset']:null;
		$orderby = isset($outConds['orderby'])?$outConds['orderby']:null;
		$ucshard = isset($outConds['ucshard'])?$outConds['ucshard']:null;
		try {
			$ret = $this->_dal->select($tableName,$select,$conditions,$limit,$offset,$orderby,$ucshard);
		}
		catch(Exception $e)
		{
			return TeaResult::error("系统错误",$e->getMessage());
		}
		$data = TeaResult::getData($ret);
		return TeaResult::ok(self::_formatResult($data,$returnFormat,$formatPara));
	}
	
	/*
	 * 将数组转换为hash格式
	*/
	protected function _hashArray($arr,$hashKey)
	{
		$hash = array();
		foreach($arr as $item)
		{
			$hash[$item[$hashKey]] = $item;
		}
		return $hash;
	}
	/*
	 * 格式化数组返回，目前支持两种格式 HASH和ARRAY
	*/
	protected function _formatResult($source=array(),$formatType=ARRAY_FORMAT,$formatPara=null)
	{
		switch($formatType)
		{
			case HASH_FORMAT:
				return $this->_hashArray($source,$formatPara);
				break;
			default:
				return $source;
				break;
		}
	}	
}
?>