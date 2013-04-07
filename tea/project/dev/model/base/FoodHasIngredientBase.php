<?php
Tea::loadCore('db/TeaModel');

class FoodHasIngredientBase extends TeaModel{

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $food_id;

    /**
     * @var int Max length is 10.  unsigned.
     */
    public $ingredient_id;

    public $_table = 'food_has_ingredient';
    public $_primarykey = 'ingredient_id';
    public $_fields = array('food_id','ingredient_id');

    public function getVRules() {
        return array(
                'food_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 10 ),
                        array( 'notnull' ),
                ),

                'ingredient_id' => array(
                        array( 'integer' ),
                        array( 'min', 0 ),
                        array( 'maxlength', 10 ),
                        array( 'notnull' ),
                )
            );
    }

}