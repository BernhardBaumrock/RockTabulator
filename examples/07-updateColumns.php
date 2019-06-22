<?php namespace ProcessWire;
$data = new RockTabulatorData();

$pets = new RockFinder("template=cat|dog", ['title', 'owner', 'weight', 'body', 'worth', 'templates_id']);
$owners = new RockFinder("template=person", ['title']);
$pets->join($owners, 'owner', ['id'=>'owner']);
$data->setRockFinder1($pets);

return $data;
