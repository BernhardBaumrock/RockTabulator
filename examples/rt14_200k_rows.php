<?php namespace ProcessWire;
// ###############################################################
// see Setup > RockMarkup2 > Examples > e02_all_possible_filetypes
// ###############################################################

// generate dummy data
$rf = new RockFinder2();
$rf->find('parent=/data');
$rf->addColumns(['title']);
$grid->setData($rf);

bd($rf->query);

return $grid;
