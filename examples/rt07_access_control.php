<?php namespace ProcessWire;
$grid = new RockTabulatorGrid();

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'foo' => 'bar'.$i,
    'bar' => 'foo',
  ];
}
$grid->setData($arr);

// set access control for this data object
$grid->access = function($grid) {
  if($this->user->name != 'whatsoever') {
    throw new WireException("Grid $grid is only visible to user whatsoever");
  }
  else return true;
};

return $grid;
