<?php namespace ProcessWire;
$data = new RockTabulatorData();

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'foo' => 'bar'.$i,
    'bar' => 'foo',
  ];
}
$data->setDataArray($arr);

return $data;
