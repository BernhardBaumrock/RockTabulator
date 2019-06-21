<?php namespace ProcessWire;
/**
 * Inputfield for RockTabulator Fieldtype
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 * @link https://www.baumrock.com
 */
class InputfieldRockTabulator extends InputfieldRockMarkup {

  public function init() {
    parent::init();

    // load tabulator
    $this->config->scripts->add($this->toUrl(__DIR__ . '/lib/moment.min.js'));
    $this->config->scripts->add($this->toUrl(__DIR__ . '/tabulator/js/tabulator.min.js'));
    $this->config->styles->add($this->toUrl(__DIR__ . '/tabulator/css/tabulator_simple.min.css'));

  }
  
  /**
   * Set the field content from the file with the same name
   */
  public function ___getContent() {
    return $this->files->render(__DIR__ . '/tpl.php');
  }
}
