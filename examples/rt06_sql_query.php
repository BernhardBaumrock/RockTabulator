<?php namespace ProcessWire;
$data = new RockTabulatorData();
$data->setData("SELECT * FROM pages LIMIT 100");
return $data;
