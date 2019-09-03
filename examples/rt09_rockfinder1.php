<?php namespace ProcessWire;
$grid = new RockTabulatorGrid();

$finder = new RockFinder('id>0, limit=100', ['title']);
$grid->setData($finder);

return $grid;
