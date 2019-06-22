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

  public $data = null;

  public function setDataArray($data) {
    if(!is_array($data)) throw new WireException("Data must be an array");
    $this->data = $data;
  }

  public function setRockFinder1($rf) {
    $this->data = $rf->getObjects();
  }

  /**
   * Return JSON string of data
   */
  public function getJSON() {
    return json_encode($this->data);
  }
}
