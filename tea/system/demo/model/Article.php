<?php
class Article{

    /**
     * @var int Max length is 11.
     */
    public $id;

    /**
     * @var varchar Max length is 65.
     */
    public $title;

    /**
     * @var text
     */
    public $content;

    /**
     * @var datetime
     */
    public $createtime;

    /**
     * @var tinyint Max length is 1.
     */
    public $draft;

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $food_id;

    public $_table = 'article';
    public $_primarykey = 'id';
    public $_fields = array('id','title','content','createtime','draft','food_id');

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

                'title' => array(
                        array( 'maxlength', 65 ),
                        array( 'notnull' ),
                ),

                'content' => array(
                        array( 'notnull' ),
                ),

                'createtime' => array(
                        array( 'datetime' ),
                        array( 'notnull' ),
                ),

                'draft' => array(
                        array( 'integer' ),
                        array( 'maxlength', 1 ),
                        array( 'optional' ),
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