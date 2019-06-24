<?php namespace ProcessWire;
$data = new RockTabulatorData();

// set data
$pets = new RockFinder("template=cat|dog", ['title', 'owner', 'weight', 'body', 'worth']);
$data->setRockFinder1($pets);

// example of a single translation
$data->lang('description', __('Description'));

// example of array of translations
$data->lang([
  'title' => __('Name'),
  'owner' => __('Owner'),
  'weight' => __('Weight'),
  'worth' => __('Worth'),
]);

return $data;
