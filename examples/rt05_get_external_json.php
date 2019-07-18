<?php namespace ProcessWire;
$data = new RockTabulatorData();

// get PW commit data from github
$http = new WireHttp();
$http->setHeader('Accept', 'application/vnd.github.v3+json');
$json = $http->getJSON("https://api.github.com/repos/processwire/processwire/stats/commit_activity");

// you can use tracy's firelogger to log data to the console
if(function_exists('fl')) fl($json);

// set data
$data->setData($json);

return $data;
