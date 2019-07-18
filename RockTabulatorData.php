<?php namespace ProcessWire;
/**
 * Tabulator Data Class
 * 
 * This object holds data for RockTabulator Inputfields. It can hold data of
 * a RockFinder2 but can also get data from other sources. The difference to 
 * RockFinder2 data is that TabulatorData can be enriched by several other
 * contextual informations such as translated strings, key-value-pairs (such
 * as values of an options field that is stored in the data as key and should
 * be rendered in the Tabulator as readable value).
 */
class RockTabulatorData extends Wire {

  /**
   * Row data
   *
   * @var array
   */
  public $data = [];

  /**
   * Translations array
   *
   * @var array
   */
  public $lang = [];

  /**
   * Set data from a regular php array
   *
   * @param array $data
   * @return void
   */
  public function setDataArray($data) {
    if(!is_array($data)) throw new WireException("Data must be an array");
    $this->data = $data;
  }

  /**
   * Set data from a RockFinder v1
   *
   * @param RockFinder $rf
   * @return void
   */
  public function setRockFinder1($rf) {
    $this->data = $rf->getObjects();
  }

  /**
   * Set data property
   * @param mixed $data
   * @return void
   */
  public function setData($data) {
    $type = $this->getDataType($data);
    switch($type) {
      
      // regular php array can be set directly
      case 'array':
        $this->data = $data;
        break;

      // sql data
      case 'sql':
        $query = $this->database->prepare($data);
        $query->execute();
        $this->data = $query->fetchAll(\PDO::FETCH_OBJ);
        break;

      default:
        throw new WireException("Invalid data type!");
    }
  }

  /**
   * Get type of provided data
   * @param mixed $data
   * @return string
   */
  public function getDataType($data) {
    if(is_array($data)) return 'array';
    if($data instanceof RockFinder) return 'RockFinder';
    if($data instanceof RockFinder2) return 'RockFinder2';
    if(is_string($data)) {
      // is it an sql select statement?
      $query = strtolower($data);
      if(strpos($query, "select") === 0) return 'sql';
    }

    return null;
  }
  
  /**
   * 
   */
  public function setDataSql($query) {
    
  }

  /**
   * Add a translation to the grid's translations array
   * 
   * You can either provide a single property or an array of key-value-pairs.
   *
   * @param array|string $name
   * @param string $value
   * @return void
   */
  public function lang($name, $value = null) {
    if(is_array($name)) {
      // array of translations
      foreach($name as $k=>$v) $this->lang($k, $v);
    }
    else {
      // single translation
      $this->lang[$name] = $value;
    }
  }

  /**
   * Get json object
   */
  public function getJsonObject() {
    return (object)[
      'data' => $this->data,
      'lang' => $this->lang,
    ];
  }

  /**
   * Return JSON string of data
   */
  public function getJSON() {
    return json_encode($this->getJsonObject());
  }

  public function __debugInfo() {
    return (array)$this->getJsonObject();
  }
}
