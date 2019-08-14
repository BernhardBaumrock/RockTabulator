<?php namespace ProcessWire;
/**
 * ProcessRockTabulator Module
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 */
class ProcessRockTabulator extends ProcessRockMarkup2 {

  public static function getModuleInfo() {
    return [
      'title' => 'ProcessRockTabulator',
      'summary' => 'RockTabulator Process Module (Sandbox).',
      'version' => 1,
      'author' => 'Bernhard Baumrock',
      'icon' => 'code',
      'requires' => ['RockTabulator'],
      'page' => [
        'name' => 'rocktabulator',
        'title' => 'RockTabulator',
        'parent' => 'setup',
      ],
    ];
  }

  /**
   * Init module
   */
  public function init() {
    parent::init();

    // modify code markup for PHP data file
    $this->addHookAfter("RockMarkup2::getCodeMarkup", $this, 'hookCodeMarkup');
  }

  /**
   * Hook code markup for sandbox
   * @param HookEvent $event
   */
  public function hookCodeMarkup($event) {
    $ext = $event->arguments(1);
    if($ext != 'php') return;

    // get table name from url
    $name = $this->input->get('name', 'string');

    // render button to send AJAX request
    $b = $this->modules->get('InputfieldButton');
    $b->id = 'tabulator_ajax_post';
    $b->icon = 'paper-plane-o';
    $b->attr('data-name', $name);
    $b->value = $this->_('Send AJAX Post Request');
    $b = $b->render();
    $note = $this->_('See browser devtools for output');
    $event->return .= "<div>$b<small>$note</small></div>";
  }
}
