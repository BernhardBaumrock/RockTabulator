<?php namespace ProcessWire;
$data = new RockTabulatorData();

// generate dummy data
$arr = [];
for($i=0; $i<100000; $i++) {
  $arr[] = (object)[
    'foo' => 'bar'.$i,
    'bar' => 'foo',
  ];
}
$data->setData($arr);

return $data;
