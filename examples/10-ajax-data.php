<?php namespace ProcessWire;
$data = new RockTabulatorData();

// set data
$finder = new RockFinder("parent=/data, limit=10", ['title', 'status', 'created']);
$data->setRockFinder1($finder);

return $data;
