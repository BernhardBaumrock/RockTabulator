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

// set access control for this data object
$data->access = function() {
  if($this->user->name == 'whatsoever') return true;
  else return 'Only visible to user whatsoever';
};

return $data;
