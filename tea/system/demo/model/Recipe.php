<?php
class Recipe{

    /**
     * @var int Max length is 11.
     */
    public $id;

    /**
     * @var text
     */
    public $description;

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $food_id;

    public $_table = 'recipe';
    public $_primarykey = 'id';
    public $_fields = array('id','description','food_id');

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
                        array( 'maxlength', 11 ),
                        array( 'optional' ),
                ),

                'description' => array(
                        array( 'notnull' ),
                ),

                'food_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 10 ),
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