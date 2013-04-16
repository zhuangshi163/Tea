<?php
class Comment{

    /**
     * @var int Max length is 11.  unsigned.
     */
    public $id;

    /**
     * @var int Max length is 11.  unsigned.
     */
    public $post_id;

    /**
     * @var varchar Max length is 64.
     */
    public $author;

    /**
     * @var varchar Max length is 128.
     */
    public $email;

    /**
     * @var varchar Max length is 145.
     */
    public $content;

    /**
     * @var varchar Max length is 128.
     */
    public $url;

    /**
     * @var datetime
     */
    public $createtime;

    /**
     * @var tinyint Max length is 1.  unsigned.
     */
    public $status;

    public $_table = 'comment';
    public $_primarykey = 'id';
    public $_fields = array('id','post_id','author','email','content','url','createtime','status');

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
                        array( 'maxlength', 11 ),
                        array( 'optional' ),
                ),

                'post_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 11 ),
                        array( 'optional' ),
                ),

                'author' => array(
                        array( 'maxlength', 64 ),
                        array( 'notnull' ),
                ),

                'email' => array(
                        array( 'maxlength', 128 ),
                        array( 'notnull' ),
                ),

                'content' => array(
                        array( 'maxlength', 145 ),
                        array( 'notnull' ),
                ),

                'url' => array(
                        array( 'maxlength', 128 ),
                        array( 'optional' ),
                ),

                'createtime' => array(
                        array( 'datetime' ),
                        array( 'optional' ),
                ),

                'status' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 1 ),
                        array( 'optional' ),
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