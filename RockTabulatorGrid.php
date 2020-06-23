<?php namespace ProcessWire;
use RockTabulator\Rowaction;
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
class RockTabulatorGrid extends Wire {

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
   * Data type
   * @var string
   */
  public $type = null;

  /**
   * WireArray of rowactions
   * @var WireArray
   */
  public $rowactions;

  /**
   * Constructor
   * TODO test :)
   */
  public function __construct($name = null) {
    // set grid name
    // if not name is provided (eg in examples)
    $this->name = $name;

    $this->rowactions = $this->wire(new WireArray);

    // By default the data type is set to "js". This means that the data for
    // the tabulator is set directly and exclusively from the client. This also
    // means that AJAX functionality is disabled.
    $this->type = 'js';
  }

  /**
   * Set data property
   * @param mixed $data
   * @return void
   */
  public function setData($data) {
    // if noData property is set we do not load all rows for this tabulator
    // this is necessary for retrieving row- and gridactions efficiently
    if(!$this->session->loadTabulatorRows) return;

    $type = $this->getDataType($data);
    switch($type) {

      // regular php array can be set directly
      case 'array':
        $this->data = $data;
        $this->type = 'array';
        break;

      // RockFinder v1
      case 'RockFinder':
        /** @var RockFinder $data */
        $this->data = $data->getObjects();
        $this->type = 'RockFinder1';
        break;

      case 'RockFinder2':
        /** @var RockFinder2 $data */
        $this->data = $data->getData();
        $this->type = 'RockFinder2';
        break;

      case 'RockFinder3':
        /** @var RockFinder3 $data */
        $this->data = $data->getRowArray();
        $this->type = 'RockFinder3';
        break;

      // sql data
      case 'sql':
        $query = $this->database->prepare($data);
        $query->execute();
        $this->data = $query->fetchAll(\PDO::FETCH_OBJ);
        $this->type = 'sql';
        break;

      default:
        throw new WireException("Invalid data type!");
    }
  }

  /**
   * Is this grid accessible for current user?
   *
   * You can set access for the grid via the access property of the object:
   * $grid->access = function($grid) {
   *   if($this->user->name != 'whatsoever') {
   *     throw new WireException("Grid $grid is only visible to user whatsoever");
   *   }
   *   else return true;
   * };
   *
   * @return bool
   */
  public function access() {
    if(is_callable($this->access)) {
      return $this->access->__invoke($this);
    }
    return $this->user->isSuperuser();
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
    if($data instanceof RockFinder3) return 'RockFinder3';
    if(is_string($data)) {
      // is it an sql select statement?
      $query = strtolower($data);
      if(strpos($query, "select") === 0) return 'sql';
    }

    return null;
  }

  /**
   * Get rowactions for this grid
   * @return array
   */
  public function getRowactionsArray() {
    $actions = [];
    foreach($this->rowactions as $action) {
      $actions[$action->name] = $action->getArray();
    }
    return $actions;
  }

  /**
   * Add a rowaction to this grid
   * @param string $action
   * @return void
   */
  public function addRowaction($name) {
    $action = $this->getRowaction($name);
    if($action) {
      $this->rowactions->add($action);
      return true;
    }
    return false;
  }

  /**
   * Get rowaction by name from file
   * @param string $name
   * @return Rowaction
   */
  public function ___getRowaction($name) {
    $action = false;
    require_once('Rowaction.php');
    $file = $this->wire->config->paths->assets . "RockTabulator/rowactions/$name.php";
    if(is_file($file)) $action = $this->files->render($file);
    else {
      $file = __DIR__ . "/rowactions/$name.php";
      if(is_file($file)) $action = $this->files->render($file);
    }
    if($action) {
      $action->name = $name;
      $action->file = $file;
    }
    return $action;
  }

  /**
   * Add array of rowactions
   * @param array $actions
   * @return void
   */
  public function addRowactions($actions) {
    foreach($actions as $action) $this->addRowaction($action);
  }

  /**
   * Set array of rowactions
   * @param array $actions
   * @return void
   */
  public function setRowactions($actions = []) {
    $this->rowactions->removeAll();
    $this->addRowactions($actions);
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
   * Return JSON string of data
   * @return string
   */
  public function getJSON() {
    return json_encode($this->getJsonObject());
  }

  /**
   * Get json object
   * @return object
   */
  public function getJsonObject() {
    return (object)[
      'name' => $this->name,
      'data' => $this->data,
      'type' => $this->type,
      'lang' => $this->lang,
      'rowactions' => $this->getRowactionsArray(),
    ];
  }

  /**
   * ########## magic methods ##########
   */
  public function __toString() {
    return (string)$this->name;
  }

  /**
   * Debug Info
   * @return array
   */
  public function __debugInfo() {
    return (array)$this->getJsonObject();
  }
}
