<?php namespace ProcessWire;
$data = new RockTabulatorData();

$finder = new RockFinder('id>0, limit=100', ['title']);
$data->setData($finder);

return $data;
