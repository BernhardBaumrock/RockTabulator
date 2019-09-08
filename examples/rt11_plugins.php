<?php namespace ProcessWire;
$limit = 15;

// generate dummy data
$arr = [];
$pages = $this->pages->find("sort=random, limit=$limit");
for($i=0; $i<$limit; $i++) {
  $arr[] = (object)[
    'id' => $pages[$i]->id,
    'foo' => rand(0,10),
    'bar' => rand(100, 200),
    'path' => $pages[$i]->path,
  ];
}
$grid->setData($arr);

return $grid;
