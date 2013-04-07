<?php
Tea::loadCore('db/TeaModel');

class FoodBase extends TeaModel{

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

}