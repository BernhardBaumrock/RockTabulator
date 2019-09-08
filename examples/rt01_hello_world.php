<?php namespace ProcessWire;
/**
 * This file will ALWAYS be loaded when a RockTabulator inputfield is loaded.
 * Here you can define all server related stuff that is related to this grid.
 * For example you can set rowactions, language translations etc.;
 * 
 * A fresh instance of a RockTabulatorGrid is available as $grid.
 * The name of the grid is set to the filename of this file by default.
 */

// add sample data
$grid->setData([
  (object)['id'=>'foo'],
  (object)['id'=>'bar'],
]);

// setting up multilanguage strings is easy
$grid->lang('foo', $this->_('FOO ENGLISH'));

// log grid to tracy console
if(function_exists('bd')) bd($grid);

return $grid;
