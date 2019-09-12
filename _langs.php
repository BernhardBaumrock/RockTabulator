<?php namespace ProcessWire;
$langs = [
  // tabulator translations
  'pagination' => [
    "page_size" => __("Page Size"),
    "first" => __("First"), //text for the first page button
    "first_title" => __("First Page"), //tooltip text for the first page button
    "last" => __("Last"),
    "last_title" => __("Last Page"),
    "prev" => __("Prev"),
    "prev_title" => __("Prev Page"),
    "next" => __("Next"),
    "next_title" => __("Next Page"),
  ],
  "headerFilters" => [
    "default" => __("filter column..."), //default header filter placeholder text
  ],

  // rocktabulator translations
];

// is a user language file set?
$dir = $this->config->paths->assets . "RockTabulator";
$file = "$dir/_langs.php";
if(is_file($file)) {
  $userlangs = $this->wire->files->render(
    $file,
    ['defaults' => $langs],
    ['allowedPaths' => [$dir]
  ]);
  if(!is_array($userlangs)) {
    throw new WireException("_langs.php must return an array");
  }
}
else $userlangs = [];

// return joined array
return array_merge($langs, $userlangs);
