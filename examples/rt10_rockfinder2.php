<?php namespace ProcessWire;
$data = new RockTabulatorData();

$finder = new RockFinder2();
$finder->find('id>0, limit=100');
$finder->addColumns(['title']);
$data->setData($finder);

return $data;
