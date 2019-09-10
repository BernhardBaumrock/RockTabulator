<?php namespace ProcessWire;
// ###############################################################
// see Setup > RockMarkup2 > Examples > e02_all_possible_filetypes
// ###############################################################

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'foo' => "foo $i",
    'bar' => "bar ".$i*2,
    'col-to-hide' => "hidden col $i",
  ];
}
$grid->setData($arr);

return $grid;
