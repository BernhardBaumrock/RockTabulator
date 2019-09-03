<?php namespace ProcessWire;
/**
 * Inputfield for RockTabulator Fieldtype
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 * @link https://www.baumrock.com
 */
require_once('RockTabulatorGrid.php');
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
   * init
   */
  public function init() {
    parent::init();
    $this->rt = $this->modules->get('RockTabulator');
  }

  /**
   * Called on renderReady
   * 
   * MUST NOT be hookable!
   */
  public function renderReady(Inputfield $parent = null, $renderValueMode = false) {
    // load tabulator
    $this->config->scripts->add($this->rm->assetUrl('lib/moment.min.js'));
    $this->config->scripts->add($this->rm->assetUrl('tabulator/js/tabulator.min.js'));
    $this->config->styles->add($this->rm->assetUrl('tabulator/css/tabulator_simple.min.css'));

    // load assets
    foreach([__DIR__, $this->config->paths->assets.'RockTabulator'] as $dir) {
      foreach(['plugins', 'rowactions'] as $folder) {
        // load plugins
        $files = $this->files->find("$dir/$folder", ['extensions' => ['js']]);
        foreach($files as $file) $this->config->scripts->add($this->rm->assetUrl($file));
        $files = $this->files->find("$dir/$folder", ['extensions' => ['css']]);
        foreach($files as $file) $this->config->styles->add($this->rm->assetUrl($file));
      }
    }
    
    // load RockTabulator JavaScripts
    $this->config->scripts->add($this->rm->assetUrl('RockTabulator.js'));
    $this->config->styles->add($this->rm->assetUrl('RockTabulator.css'));
    $this->config->scripts->add($this->rm->assetUrl('RockTabulatorGrid.js'));

    // load the RockTabulatorGrid class
    require_once('RockTabulatorGrid.php');
    
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
