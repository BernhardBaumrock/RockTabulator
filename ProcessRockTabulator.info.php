<?php namespace ProcessWire;
/**
 * ProcessRockTabulator Info
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 */
$info = [
  'title' => 'RockTabulator',
  'summary' => 'RockTabulator Process Module.',
  'version' => 1,
  'author' => 'Bernhard Baumrock',
  'icon' => 'bolt',
  'requires' => ['InputfieldRockTabulator'],
  'page' => [
    'name' => 'rocktabulator',
    'title' => 'RockTabulator',
    'parent' => 'setup',
  ],
];
