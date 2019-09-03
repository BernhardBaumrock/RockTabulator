<?php namespace ProcessWire;
$grid = new RockTabulatorGrid();

// generate dummy data
$arr = [];
for($i=0; $i<100000; $i++) {
  $arr[] = (object)[
    'foo' => 'bar'.$i,
    'bar' => 'foo',
  ];
}
$grid->setData($arr);

return $grid;
