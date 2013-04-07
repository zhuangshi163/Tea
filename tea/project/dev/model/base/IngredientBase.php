<?php
Tea::loadCore('db/TeaModel');

class IngredientBase extends TeaModel{

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

}