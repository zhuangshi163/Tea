<?php
class Post{

    /**
     * @var int Max length is 11.  unsigned.
     */
    public $id;

    /**
     * @var varchar Max length is 145.
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
    public $status;

    /**
     * @var smallint Max length is 11.  unsigned.
     */
    public $totalcomment;

    public $_table = 'post';
    public $_primarykey = 'id';
    public $_fields = array('id','title','content','createtime','status','totalcomment');

    public function getVRules() {
        return array(
                'id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 11 ),
                        array( 'optional' ),
                ),

                'title' => array(
                        array( 'maxlength', 145 ),
                        array( 'notnull' ),
                ),

                'content' => array(
                        array( 'notnull' ),
                ),

                'createtime' => array(
                        array( 'datetime' ),
                        array( 'optional' ),
                ),

                'status' => array(
                        array( 'integer' ),
                        array( 'maxlength', 1 ),
                        array( 'optional' ),
                ),

                'totalcomment' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 11 ),
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