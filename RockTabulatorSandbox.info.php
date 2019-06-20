<?php namespace ProcessWire;
/**
 * RockTabulatorSandbox Info
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 */
$info = [
  'title' => 'RockTabulator Sandbox',
  'summary' => 'RockTabulator Sandbox Process Module.',
  'version' => 1,
  'author' => 'Bernhard Baumrock',
  'icon' => 'bolt',
  'requires' => ['InputfieldRockTabulator'],
  'page' => [
    'name' => 'rocktabulator-sandbox',
    'title' => 'RockTabulator Sandbox',
    'parent' => 'setup',
  ],
];
