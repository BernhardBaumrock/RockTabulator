<?php namespace ProcessWire;

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
  if(!$this->input->get('access', 'bool')) {
    $msg = "Grid $grid is only visible if the GET param 'access' is set to true";
    throw new WireException($msg);
  }
  else return true;
};

return $grid;
