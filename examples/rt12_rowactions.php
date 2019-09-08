<?php namespace ProcessWire;

$rf = new RockFinder2();
$rf->find('template=cat');
$rf->addColumns([
  'title',
  'created',
]);
$grid->setData($rf);

// attach rowactions to this grid
// this does NOT add the actions to the grid DOM, it just makes them
// available for JavaScript to add them to the DOM wherever needed
$grid->setRowactions(['panel', 'trash']);

return $grid;
