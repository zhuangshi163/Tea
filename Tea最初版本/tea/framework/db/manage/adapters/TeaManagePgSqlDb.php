<?php
/**
 * TeaManagePgSqlDb class file.
 *
 * @author Richard Myers <richard.myers@hotmail.co.uk>
 * @link http://www.Tea.com/
 * @copyright Copyright &copy; 2009 Leng Sheng Hong
 * @license http://www.Tea.com/license
 * @package Tea.db.manage.adapters
 * @since 1.3
 */
Tea::loadCore('db/manage/TeaManageDb');

class TeaManagePgSqlDb extends TeaManageDb {


	/**
	 * A mapping of TeaManageDb generic datatypes to RDBMS native datatypes for columns
	 * These must be defined in each specific adapter
	 *
	 * The datatypes are
	 * COL_TYPE_BOOL		: A true or false boolean
	 * COL_TYPE_SMALLINT	: 2-byte integer (-32,767 to 32,768)
	 * COL_TYPE_INT			: 4-byte integer (-2,147,483,648 to 2,147,483,647)
	 * COL_TYPE_BIGINT		: 8-byte integer (about -9,000 trilllion to 9,000 trillion)
	 * COL_TYPE_DECIMAL		: Fixed point decimal of specific size (total digits) and scope (num digits after decimal point)
	 * COL_TYPE_FLOAT		: A double-percision floating point decimal number
	 * COL_TYPE_CHAR		: A fixed length string of 1-255 characters
	 * COL_TYPE_VARCHAR		: A variable length string of 1-255 characters
	 * COL_TYPE_CLOB		: A large character object of up to about 2Gb
	 * COL_TYPE_DATE		: an ISO 8601 date eg. 2009-09-27
	 * COL_TYPE_TIME		: an ISO 8601 time eg. 18:38:49
	 * COL_TYPE_TIMESTAMP	: an ISO 8601 timestamp without a timezone eg. 2009-09-27 18:38:49
	 *
	 * @var array
	 */
	protected $colTypeMapping = array (
		TeaManageDb::COL_TYPE_BOOL		=> 'BOOLEAN',
    	TeaManageDb::COL_TYPE_SMALLINT	=> 'SMALLINT',
    	TeaManageDb::COL_TYPE_INT		=> 'INTEGER',
    	TeaManageDb::COL_TYPE_BIGINT	=> 'BIGINT',
    	TeaManageDb::COL_TYPE_DECIMAL	=> 'NUMERIC',
    	TeaManageDb::COL_TYPE_FLOAT		=> 'DOUBLE PRECISION',
    	TeaManageDb::COL_TYPE_CHAR		=> 'CHAR',
    	TeaManageDb::COL_TYPE_VARCHAR	=> 'VARCHAR',
    	TeaManageDb::COL_TYPE_CLOB		=> 'TEXT',
    	TeaManageDb::COL_TYPE_DATE		=> 'DATE',
    	TeaManageDb::COL_TYPE_TIME		=> 'TIME',
    	TeaManageDb::COL_TYPE_TIMESTAMP	=> 'TIMESTAMP',
	);

	protected $identiferQuotePrefix = '"';

	protected $identiferQuoteSuffix = '"';


	/**
	 * Drops an index from a table and specifically implemented for each db engine
	 * @param string $table Name of the table the index is for
	 * @param string $name Name of the index to be removed
	 */
	protected function _dropIndex($table, $name) {
		// PgSQL indexes relate to the whole db so we ensure the $name refrences the table
		$name = $this->quote($name);
		return $this->query("DROP INDEX $name");
	}

	
	/**
	 * Used to allow an index name to be modified if required by a specific db engine
	 * @param string $table Name of the table
	 * @param string $name  Name of the index
	 */
	protected function modifyIndexName($table, $name) {
		// PgSQL indexes relate to the whole db so we ensure the $name reference the table name
		// so we can not go and define multiple indexes with the same name
		return "$table__$name";
	}


	/**
	 * Adds SQL DB Engine specific auto increment and primary key clauses inplace to the column definition
	 * @param string $columnDefinition Reference to the columnDefention to append to
	 * @param bool $autoinc True if this column should be a primary key
	 * @param bool $primary True if this column should be a primary key
	 * @return void
	 */
	protected function columnDefineAutoincPrimary(&$columnDefinition, $autoinc, $primary) {
		if ($autoinc) {
            $tokens = explode(' ', $columnDefinition);
            if ($tokens[0] == 'BIGINT') {
                $tokens[0] = 'BIGSERIAL';
            } else {
                $tokens[0] = 'SERIAL';
            }
            $columnDefinition = implode(' ', $tokens);
        }

        if ($primary) {
            $columnDefinition .= ' PRIMARY KEY';
        }
	}
}