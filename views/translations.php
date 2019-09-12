<?php namespace ProcessWire;
$lang = realpath(__DIR__ . "/../_langs.php");
$userlang = $this->config->paths->assets . 'RockTabulator/_langs.php';
$exists = is_file($userlang) ? '' : ' (does not exist yet)';

// get lang links
$translang = $main->getTranslationlinks($lang);
$transuserlang = $main->getTranslationlinks($userlang);

// setup code links
$link = str_replace('%line', '1', "<a href='{$main->codelink}'>{text}</a>");
$lang = str_replace(['{text}', '%file'], $lang, $link);
$userlang = str_replace(['{text}', '%file'], $userlang, $link);
?>

<p>
  Main translation file: <?= $lang ?><br>
  <?= $translang ?>
</p>

<p>
  User translation file: <?= $userlang.$exists ?><br>
  <?= $transuserlang ?>
</p>
