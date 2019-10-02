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

    $this->grid = null;
    $this->err = null;
  }

  /**
   * Called on renderReady
   * 
   * MUST NOT be hookable!
   */
  public function renderReady(Inputfield $parent = null, $renderValueMode = false) {
    $min = $this->config->debug ? '' : '.min';

    // load tabulator
    $this->config->scripts->add($this->rm->assetUrl("lib/moment.min.js"));
    $this->config->scripts->add($this->rm->assetUrl("tabulator/js/tabulator$min.js"));
    $this->config->styles->add($this->rm->assetUrl("tabulator/css/tabulator_simple$min.css"));
    $this->config->styles->add($this->rm->assetUrl('RockTabulator.css'));

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
    $this->config->scripts->add($this->rm->assetUrl('RockTabulatorGrid.js'));
    
    return parent::renderReady($parent, $renderValueMode);
  }

  /**
   * Get grid for this Inputfield
   * @return RockTabulatorGrid|false
   */
  public function getGrid() {
    if($this->grid) return $this->grid;

    // get json object from this grid's data object
    $grid = false;
    try {
      $grid = $this->main->getGrid($this->name);
      if(!$grid) $grid = new RockTabulatorGrid($this->name);
    } catch (\Throwable $th) {
      $this->err = '<div class="uk-alert-warning" uk-alert>'.$th->getMessage().'</div>';
    }
    return $grid;
  }

  /**
   * Render init tag
   * @return string
   */
  public function initTag() {
    $grid = $this->getGrid();
    if($this->err) return $this->err;
    if(!$grid) return 'no grid found';
    return $this->tpl('_initTag.php', [
      'id' => "#".$this->id,
      'json' => $grid->getJSON(),
    ]);
  }

  /**
   * Show top markup
   * @return string|void
   */
  public function topMarkup() {
    $grid = $this->getGrid();
    if(!$grid) return;
    return $grid->topMarkup ?: '';
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
  public function ___tpl($file, $vars = []) {
    $defaults = [
      'tabulator' => $this,
    ];
    $vars = array_merge($defaults, $vars);
    return $this->wire->files->render(__DIR__.'/templates/'.$file, $vars);
  }
}
