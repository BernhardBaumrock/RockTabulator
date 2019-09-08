<?php namespace ProcessWire;
$name = $this->input->get('name', 'string');
$access = !$this->input->get('access', 'int');
$inputfield->description = "<a href='./?name=$name&access=$access'"
  ." class='ui-button ui-corner-all'>Toggle access</a>";
$inputfield->entityEncodeText = false;
