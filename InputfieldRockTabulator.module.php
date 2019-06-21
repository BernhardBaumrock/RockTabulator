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

    // add the class to the field
    $this->addClass('RockTabulator');

    // load RockTabulator JavaScripts
    $this->config->scripts->add($this->toUrl(__DIR__ . '/RockTabulator.js'));
    $this->config->scripts->add($this->toUrl(__DIR__ . '/RockTabulatorGrid.js'));

    // load tabulator
    $this->config->scripts->add($this->toUrl(__DIR__ . '/lib/moment.min.js'));
    $this->config->scripts->add($this->toUrl(__DIR__ . '/tabulator/js/tabulator.min.js'));
    $this->config->styles->add($this->toUrl(__DIR__ . '/tabulator/css/tabulator_simple.min.css'));

    // load the rocktabulatordata class
    require_once('RockTabulatorData.php');
  }
  
  /**
   * Set the field content from the file with the same name
   */
  public function ___getContent() {
    $out = $this->loadData();
    $out .= $this->files->render(__DIR__ . '/content.php');
    return $out;
  }

  /**
   * Get the data loading script tag
   */
  public function loadData() {
    // load data file
    $path = $this->getFilePath();
    $data = $this->files->render($path.$this->name, [
      'that' => $this, // can be used to attach hooks
    ], [
      'allowedPaths' => [$path],
    ]);

    // if no data was set we exit here
    if(!$data) return;

    // data was returned, check it!
    if(!$data instanceof RockTabulatorData) {
      throw new WireException("Data file must return a RockTabulatorData object!");
    }

    // return html output
    return $this->files->render(__DIR__ . '/loadData.php', [
      'name' => $this->name,
      'json' => $data->getJSON(),
    ]);
  }
}
