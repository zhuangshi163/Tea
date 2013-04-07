<?php
Tea::loadCore('db/TeaModel');

class RecipeBase extends TeaModel{

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

}