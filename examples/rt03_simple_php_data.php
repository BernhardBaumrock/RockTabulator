<?php namespace ProcessWire;

// generate dummy data
$arr = [];
for($i=0; $i<1000; $i++) {
  $arr[] = (object)[
    'foo' => 'bar'.$i,
    'bar' => 'foo',
  ];
}
$grid->setData($arr);

return $grid;
