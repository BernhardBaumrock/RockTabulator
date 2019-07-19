<?php namespace ProcessWire;
$data = new RockTabulatorData();

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'foo' => __('bar en')." ".$i,
    'bar' => __('foo en')." ".($i*2),
  ];
}
$data->setDataArray($arr);

return $data;
