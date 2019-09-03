<?php namespace ProcessWire;
$grid = new RockTabulatorGrid();
$grid->setData("SELECT * FROM pages LIMIT 100");
return $grid;
