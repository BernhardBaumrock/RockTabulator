<?php namespace ProcessWire;
$data = new RockTabulatorData();

// set data
$limit = $this->input->get('limit', 'int') ?: 10;
$finder = new RockFinder("parent=/data, limit=$limit", ['title', 'status', 'created']);
$data->setRockFinder1($finder);

return $data;
