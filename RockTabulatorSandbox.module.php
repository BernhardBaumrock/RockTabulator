<?php namespace ProcessWire;
/**
 * RockTabulatorSandbox Module
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 */
class RockTabulatorSandbox extends RockMarkupSandbox {

  public $exampleDir;
  
  /**
   * Init. Optional.
   */
  public function init() {
    parent::init(); // always remember to call the parent init

    // setup example dir
    /** @var InputfieldRockMarkup $rm */
    $this->rm = $this->modules->get('InputfieldRockMarkup');
    $this->exampleDir = $this->rm->toUrl(__DIR__."/examples");
  }
}
