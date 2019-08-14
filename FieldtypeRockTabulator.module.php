<?php namespace ProcessWire;
/**
 * Fieldtype for RockTabulator Grids
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 * @link https://www.baumrock.com
 */
class FieldtypeRockTabulator extends FieldtypeRockMarkup2 {

  public static function getModuleInfo() {
    return [
      'title' => 'RockTabulator',
      'version' => '0.0.1',
      'author' => 'Bernhard Baumrock',
      'icon' => 'code',
      'requires' => ['RockTabulator'],
    ];
  }
}
