<?php namespace ProcessWire;

$finder = new RockFinder('id>0, limit=100', ['title']);
$grid->setData($finder);

return $grid;
