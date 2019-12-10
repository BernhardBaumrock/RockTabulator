<?php namespace ProcessWire;
/**
 * ProcessRockTabulator Module
 *
 * @author Bernhard Baumrock, 15.07.2019
 * @license Licensed under MIT
 */
if(!$this->modules->isInstalled("ProcessRockMarkup2")) return;
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
    $this->config->js('sandbox', true);

    $this->addHookAfter('getSandboxForm', $this, 'showTranslations');
  }

  /**
   * Add info about translations for RockTabulator
   * @param HookEvent $event
   * @return void
   */
  public function showTranslations($event) {
    $form = &$event->return;

    $form->add([
      'type' => 'markup',
      'label' => 'Translations',
      'icon' => 'language',
      'value' => $this->files->render(__DIR__ . '/views/translations.php', [
        'main' => $this->main(),
      ]),
      'notes' => "Use RockTabulator._('foo') to get the translated value of foo",
    ]);
  }
}
