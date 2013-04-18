<?php
/**
 * 框架统一返回接口
 *
 * @category		public
 * @package		framework\db
 * @copyright	惠众天下 2011 版权所有
 * @author			zhy
 * @version		1.0
 * @link				www.hz.com
 * @since			php5.3
 */
declare(encoding='UTF-8');

class TeaResult
{
	//getData的错误标记, 唯一标识使用md5一个奇怪的字符生成，避免和result的结果冲突
	const ERROR_FLAG = 'e96640557fe6d8ed0f52dc0c65063aa4';
	//参数非法编码
	const PARAM_INVALID = 1001;
	//参数不能为空编码
	const PARAM_EMPTY	  = 1002;
	/**
	 *
	 * 返回错误结果
	 * @param $msg	错误消息
	 * @param $code	错误编码
	 */
	public static function error($msg,$code='')
	{
		return array(
            'status'   => 'error',
            'msg' => $msg,
            'code'  => $code,
		);
	}
	/**
	 *
	 * 统一获取Result返回的结果的接口
	 * @param $result	统一使用Result::ok|error 返回的数据
	 * @param string $default	如果获取数据失败，返回的数据，默认为Result::ERROR_FLAG
	 */
	public static function getData($result,$default=self::ERROR_FLAG)
	{
		if (!is_array($result) || !isset($result['status']) || $result['status'] == 'error' || ! array_key_exists('data', $result)) {
			return $default;
		}
		return $result['data'];
	}
	/**
	 *
	 * 返回成功数据
	 * @param array 	$data	统一返回的数据
	 */
	public static function ok($data = array())
	{
		$res = array();
		$res['status'] = "ok";
		$res['data'] = $data;
		return $res;
	}
	/**
	 *
	 * 获取错误结果消息
	 * @param array $result		统一使用Result::error返回的数据
	 */
	public static function getErrorMsg($result)
	{
		return isset($result['msg']) ? $result['msg'] : '';
	}
	/**
	 *
	 *	判断返回结果是否为ok
	 * @param array $result		统一使用Result::ok返回的数据
	 */
	public static function check($result)
	{
		if(isset($result['status']) && "error" == $result['status'] )
		{
			return false;
		}
		else
		{
			if (!isset($result))
			{
				return false;
			}
			return true;
		}
	}
	/**
	 * 
	 * 解析结果数据，并且通过引用返回数据的data数据
     * @param array $result 待解析的数据
     * @return boolean 该数据合法与否，true/false
	 */
	public static function parse($result)
	{
		if(isset($result['status']) && "error" == $result['status']) 
		{
			return false;
		} 
		else if (isset($result['data']))
		{
			$result = $result['data'];
			return true;
		}
		else
		{
			return true;
		}
	}
}