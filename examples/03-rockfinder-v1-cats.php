<?php namespace ProcessWire;
$data = new RockTabulatorData();

$rf = new RockFinder("template=cat", ['title']);
$data->setRockFinder1($rf);

return $data;
