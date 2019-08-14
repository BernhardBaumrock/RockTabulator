<?php namespace ProcessWire;
/**
 * Inputfield for RockTabulator Fieldtype
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 * @link https://www.baumrock.com
 */
require_once('RockTabulatorData.php');
class InputfieldRockTabulator extends InputfieldRockMarkup2 {

  public static function getModuleInfo() {
    return [
      'title' => 'RockTabulator Inputfield', 
      'summary' => 'Inputfield to display any markup in the PW backend.',
      'version' => '0.0.1',
      'author' => 'Bernhard Baumrock',
      'icon' => 'code',
      'requires' => ['RockTabulator'],
    ];
  }

  /**
   * Called on renderReady
   * 
   * MUST NOT be hookable!
   */
  public function renderReady(Inputfield $parent = null, $renderValueMode = false) {
    // load RockTabulator JavaScripts
    $this->config->scripts->add($this->rm->toUrl(__DIR__ . '/RockTabulator.js'));
    $this->config->styles->add($this->rm->toUrl(__DIR__ . '/RockTabulator.css'));
    $this->config->scripts->add($this->rm->toUrl(__DIR__ . '/RockTabulatorGrid.js'));

    // load tabulator
    $this->config->scripts->add($this->rm->toUrl(__DIR__ . '/lib/moment.min.js'));
    $this->config->scripts->add($this->rm->toUrl(__DIR__ . '/tabulator/js/tabulator.min.js'));
    $this->config->styles->add($this->rm->toUrl(__DIR__ . '/tabulator/css/tabulator_simple.min.css'));

    // load the rocktabulatordata class
    require_once('RockTabulatorData.php');
    
    return parent::renderReady($parent, $renderValueMode);
  }

  /**
   * Render Inputfield Content
   */
  public function ___getContent() {
    return $this->tpl('default');
  }

  /**
   * Hookable template render function
   * @return string
   */
  public function ___tpl($file) {
    return $this->wire->files->render(__DIR__.'/templates/'.$file, [
      'tabulator' => $this,
    ]);
  }
}
