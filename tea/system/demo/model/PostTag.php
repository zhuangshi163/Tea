<?php
class PostTag{

    /**
     * @var int Max length is 11.  unsigned.
     */
    public $tag_id;

    /**
     * @var int Max length is 11.  unsigned.
     */
    public $post_id;

    public $_table = 'post_tag';
    public $_primarykey = 'post_id';
    public $_fields = array('tag_id','post_id');

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
                'tag_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 11 ),
                        array( 'notnull' ),
                ),

                'post_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 11 ),
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