<?php
class Food{

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $id;

    /**
     * @var varchar Max length is 65.
     */
    public $name;

    /**
     * @var text
     */
    public $description;

    /**
     * @var varchar Max length is 65.
     */
    public $location;

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $food_type_id;

    public $_table = 'food';
    public $_primarykey = 'id';
    public $_fields = array('id','name','description','location','food_type_id');

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
                ),

                'description' => array(
                        array( 'notnull' ),
                ),

                'location' => array(
                        array( 'maxlength', 65 ),
                        array( 'notnull' ),
                ),

                'food_type_id' => array(
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