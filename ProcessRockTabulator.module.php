<?php namespace ProcessWire;
/**
 * ProcessRockTabulator Module
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 */
class ProcessRockTabulator extends ProcessRockMarkup2 {

  public static function getModuleInfo() {
    return [
      'title' => 'ProcessRockTabulator',
      'summary' => 'RockTabulator Process Module (Sandbox).',
      'version' => 1,
      'author' => 'Bernhard Baumrock',
      'icon' => 'code',
      'requires' => ['RockTabulator'],
      'page' => [
        'name' => 'rocktabulator',
        'title' => 'RockTabulator',
        'parent' => 'setup',
      ],
    ];
  }

  /**
   * Init module
   */
  public function init() {
    parent::init();
    $this->config->js('sandbox', true);
  }
}
