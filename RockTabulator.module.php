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

  /**
   * Init module
   */
  public function init() {
    parent::init();
    
    // intercept 404 page for returning ajax data
    require_once('RockTabulatorData.php');
    $this->addHookBefore('ProcessPageView::pageNotFound', $this, 'handleAjax');
  }

  /**
   * Handle AJAX request
   */
  public function handleAjax($event) {
    $name = $this->input->post('name', 'string');
    if(!$name) return;

    $url = $event->arguments(1);
    if($url != '/rocktabulator/') return;

    // ########## GET DATA ##########
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
