<?php namespace ProcessWire;
/**
 * Inputfield for RockTabulator Fieldtype
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 * @link https://www.baumrock.com
 */
class InputfieldRockTabulator extends InputfieldRockMarkup {

  private $globalDataLoaded = false;

  public function init() {
    parent::init();

    // load RockTabulator JavaScripts
    $this->config->scripts->add($this->toUrl(__DIR__ . '/RockTabulator.js'));
    $this->config->scripts->add($this->toUrl(__DIR__ . '/RockTabulatorGrid.js'));

    // load tabulator
    $this->config->scripts->add($this->toUrl(__DIR__ . '/lib/moment.min.js'));
    $this->config->scripts->add($this->toUrl(__DIR__ . '/tabulator/js/tabulator.min.js'));
    $this->config->styles->add($this->toUrl(__DIR__ . '/tabulator/css/tabulator_simple.min.css'));

    // load the rocktabulatordata class
    require_once('RockTabulatorData.php');
  }

  /**
   * Set the field content from the file with the same name
   */
  public function ___getContent() {
    $out = $this->loadData();
    $out .= $this->files->render(__DIR__ . '/_content.php', ['that' => $this]);
    return $out;
  }

  /**
   * Get the data loading script tag
   */
  public function loadData() {
    // load data file
    $path = $this->getFilePath();
    $data = $this->files->render($path.$this->name, [
      'that' => $this, // can be used to attach hooks and call methods
    ], [
      'allowedPaths' => [$path],
    ]);

    // if no data was set we exit here
    if(!$data) return;

    // data was returned, check it!
    if(!$data instanceof RockTabulatorData) {
      throw new WireException("Data file must return a RockTabulatorData object!");
    }

    // return html output
    return $this->files->render(__DIR__ . '/loadData.php', [
      'name' => $this->name,
      'json' => $data->getJSON(),
      'that' => $this, // can be used to attach hooks and call methods
    ]);
  }

  /**
   * Load global data for all tabulators
   *
   * @return void
   */
  public function ___loadGlobalData() {
    // load data only once on the first inputfield load
    if($this->globalDataLoaded) return;
    $this->globalDataLoaded = true;

    // add custom html to the inputfield's script tag
    $script = '';
    $script .= $this->addTranslations();

    return $script;
  }

  /**
   * Add translations to the RockTabulator object
   *
   * @return string
   */
  public function addTranslations() {
    // set tabulator to current users language
    $locale = $this->getLocale();
    if(!$locale) return;
    $out = '';

    $langs = [$locale => $this->getTranslations()];
    $json = json_encode($langs);

    $out .= "RockTabulator.locale = '$locale';";
    $out .= "RockTabulator.langs = JSON.parse('$json');";
    return $out;
  }

  /**
   * Hookable method that returns an array of all global translations
   *
   * @return array
   */
  public function ___getTranslations() {
    return $this->files->render(__DIR__ . '/_langs.php');
  }

  /**
   * Get locale string of current language
   *
   * @return string
   */
  public function getLocale() {
    foreach(explode("\n", $this->langs) as $item) {
      $item = explode("=", $item);
      $name = $item[0];
      $locale = $item[1];
      if($name == $this->user->language->name) return $locale;
    }
  }
}
