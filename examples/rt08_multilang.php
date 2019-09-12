<?php namespace ProcessWire;

// generate dummy data
$arr = [];
for($i=0; $i<10; $i++) {
  $arr[] = (object)[
    'foo' => __('bar en')." ".$i,
    'bar' => __('foo en')." ".($i*2),
  ];
}
$grid->setData($arr);

// this sends a translated string to the JS grid object
// that can be used in your grid (eg for multilang header names)
$grid->lang('foo-lang-value', __('foo ENG'));

return $grid;
