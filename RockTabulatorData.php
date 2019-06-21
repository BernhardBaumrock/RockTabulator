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
   * Get data object
   */
  public function getData() {
    $arr = [];
    for($i=0; $i<10; $i++) {
      $arr[] = (object)[
        'foo' => 'bar'.$i,
        'bar' => 'foo',
      ];
    }
    return $arr;
  }

  /**
   * Return JSON string of data
   */
  public function getJSON() {
    $data = $this->getData();
    return json_encode($data);
  }
}
