<?php namespace ProcessWire;
if(isset($tabulator->initMsg)) return $tabulator->initMsg;

$url = $this->config->urls->admin . "setup/rocktabulator/?name=".$tabulator->name;
$sandboxlink = "<a href='$url'>$url</a>";
?>
-- please setup JS file to init the tabulator grid --<br>
Sandbox link: <?= $sandboxlink ?>