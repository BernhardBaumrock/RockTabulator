<?php namespace ProcessWire;

$finder = $rockfinder
  ->find("template=cat")
  ->addColumns(['title', 'owner']);
$grid->setData($finder);

return $grid;
