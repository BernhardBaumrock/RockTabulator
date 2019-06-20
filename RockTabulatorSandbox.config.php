<?php namespace ProcessWire;
/**
 * RockTabulatorSandbox Config
 *
 * @author Bernhard Baumrock, 21.06.2019
 * @license Licensed under MIT
 */
class RockTabulatorSandboxConfig extends ModuleConfig {

  public function __construct() {
    // sanitize directories
    $this->addHookAfter('Inputfield(name=dirs)::processInput', $this, 'sanitizeDirs');
  }

  /**
   * Setup config Inputfields
   */
  public function getInputfields() {
    $inputfields = parent::getInputfields();

    /** @var RockTabulatorSandbox $rm */
    $rm = $this->modules->get('RockTabulatorSandbox');

    $f = $this->modules->get('InputfieldTextarea');
    $f->name = 'dirs';
    $f->label = 'Directories for the Sandbox Module';
    $f->description = 'Directories that are listed here will be listed in the Sandbox Module.';
    $f->notes = "Enter one by line!\nWill always be appended: {$rm->exampleDir}";
    $inputfields->add($f);
    
    return $inputfields;
  }

  /**
   * Sanitize directories
   * 
   * @param HookEvent $event
   * @return void
   */
  public function sanitizeDirs(HookEvent $event) {
    $f = $event->object;
    if(!$f->value) return;
    
    /** @var RockTabulatorSandbox $rm */
    $rm = $this->modules->get('RockTabulatorSandbox');
    $dirs = $rm->getDirs($f->value);

    $f->value = implode("\n", $dirs);
  }
}
