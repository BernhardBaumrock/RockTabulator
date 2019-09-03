<?php namespace ProcessWire;
$grid = new RockTabulatorGrid();

$finder = new RockFinder2();
$finder->find('id>0, limit=100');
$finder->addColumns(['title']);
$grid->setData($finder);

return $grid;
