<?php
class Ingredient{

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $id;

    /**
     * @var varchar Max length is 65.
     */
    public $name;

    public $_table = 'ingredient';
    public $_primarykey = 'id';
    public $_fields = array('id','name');

    public function __construct($properties=null){
		if($properties!==null){
			foreach($properties as $k=>$v){
				if(in_array($k, $this->_fields))
                   $this->{$k} = $v;
            }
        }
	}


    public function getVRules() {
        return array(
                'id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 10 ),
                        array( 'optional' ),
                ),

                'name' => array(
                        array( 'maxlength', 65 ),
                        array( 'notnull' ),
                )
            );
    }

    public function validate($checkMode='all'){
		//You do not need this if you extend TeaModel or TeaSmartModel
		//MODE: all, all_one, skip
		Tea::loadHelper('TeaValidator');
		$v = new TeaValidator;
		$v->checkMode = $checkMode;
		return $v->validate(get_object_vars($this), $this->getVRules());
	}

}