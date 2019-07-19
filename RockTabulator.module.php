<?php namespace ProcessWire;
/**
 * RockTabulator
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 */
class RockTabulator extends RockMarkup {

  public static function getModuleInfo() {
    return [
      'title' => 'RockTabulator Main Module',
      'version' => '0.0.1',
      'summary' => 'RockTabulator Main Module that installs and uninstalls all related modules.',
      'singular' => true,
      'autoload' => true,
      'icon' => 'bolt',
      'requires' => ['RockMarkup'],
      'installs' => [
        'FieldtypeRockTabulator',
        'InputfieldRockTabulator',
        'ProcessRockTabulator',
      ],
    ];
  }
  static protected $defaults = array(
    'langs' => "default=en-en\nde=de-de",
  );
  public function getModuleConfigInputfields(array $data) {
    $inputfields = parent::getModuleConfigInputfields($data);
    $data = array_merge(parent::$defaults, self::$defaults, $data);

    $f = $this->modules->get('InputfieldTextarea');
    $f->name = 'langs';
    $f->label = $this->_('Language Mappings');
    $f->description = $this->_('List all languages of your system with their mapped locale for RockTabulator here.');
    $f->notes = $this->_('One by line, eg de=de-de (where de is the language name and de-de is the tabulator locale');
    $f->value = $data['langs'];
    $inputfields->add($f);

    return $inputfields;
  }
  public function __construct() {
    // populate defaults, which will get replaced with actual
    // configured values before the init/ready methods are called
    $this->setArray(array_merge(parent::$defaults, self::$defaults));
  }

  /**
   * Init module
   */
  public function init() {
    parent::init();
    
    // intercept 404 page for returning ajax data
    require_once('RockTabulatorData.php');
    $this->addHookBefore('ProcessPageView::pageNotFound', $this, 'handleAjax');

    // load locales
    $this->addHookBefore("loadGlobalConfig", $this, 'loadLocales');
  }

  /**
   * Load locales to config object
   */
  public function loadLocales($event) {
    $locale = $this->getLocale();
    if(!$locale) return;

    $data = $this->wire->files->render(__DIR__ . '/_langs.php');
    $this->conf->set('locale', $locale);
    $this->conf->set('langs', [$locale => $data]);
  }
  
  /**
   * Get tabulator locale string of current pw user's language
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

  /**
   * Set global JS configuration object
   * 
   */
  public function ___setGlobalConfig($data) {
    $this->wire->config->js('RockTabulator', $data);
  }

  /**
   * Handle AJAX request
   */
  public function handleAjax($event) {
    if(!$this->config->ajax) return;

    // check name property
    $name = $this->input->post('name', 'string');
    if(!$name) return;

    $url = $event->arguments(1);
    if($url != '/rocktabulator/') return;

    // ########## GET DATA ##########
    $langID = $langID = $this->input->post('lang', 'int');
    if($langID) {
      $lang = $this->languages->get($langID);
      $this->user->language = $lang;
    }
    $data = $this->getTabulatorData($name);

    // do not execute the 404, return json instead
    header("Content-type: application/json");
    ob_start("ob_gzhandler");
    echo json_encode($data);
    ob_end_flush();
    exit();
  }

  /**
   * Return JSON error
   * @param string $msg
   * @return json
   */
  public function err($msg) {
    return (object)[
      'error' => $msg
    ];
  }

  /**
   * Get data for given tabulator
   * @param string $name
   * @return mixed
   */
  public function getTabulatorData($name = null) {
    if(!$name) $name = $this->input->get('name', 'string');
    if(!$name) return;

    $file = $this->getFile($name);
    $data = $this->files->render($file->path);

    // ########## CHECK ACCESS ##########
    // by default only superusers have access
    $access = $this->user->isSuperuser();
    $msg = '';
    if(is_callable($data->access)) {
      $result = $data->access->__invoke();
      if($result === true) $access = true;
      else {
        $access = false;
        if($result) $msg = $result;
        else $msg = "NO ACCESS";
      }
    }

    // no access? return error message
    if(!$access) return $this->err($msg);

    // data correct?
    if(!$data) return;
    if(!$data instanceof RockTabulatorData) {
      throw new WireException("{$file->url} must return a RockTabulatorData object!");
    }

    // all good, return data
    return $data;
  }
  
  /**
   * Get example PHP code for main PHP file
   */
  public function getPhpCode() {
    return file_get_contents(__DIR__ . '/snippets/php.php');
  }
}
