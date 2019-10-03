<?php namespace ProcessWire;
// ###############################################################
// see Setup > RockMarkup2 > Examples > e02_all_possible_filetypes
// ###############################################################

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'name' => "name $i",
    'progress' => $i*2,
    'rating' => rand(1,5),
    'car' => "car $i",
    'gender' => ['male', 'female'][rand(0,1)],
    'col' => "col $i",
    'dob' => "dob $i",
  ];
}
$grid->setData($arr);

return $grid;
