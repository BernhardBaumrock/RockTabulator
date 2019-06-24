<?php namespace ProcessWire;
/**
 * InputfieldRockTabulator Config
 *
 * @author Bernhard Baumrock, 24.06.2019
 * @license Licensed under MIT
 */
class InputfieldRockTabulatorConfig extends ModuleConfig {
  /**
   * Setup config Inputfields
   */
  public function getInputfields() {
    $inputfields = parent::getInputfields();

    $f = $this->modules->get('InputfieldTextarea');
    $f->name = 'langs';
    $f->label = $this->_('Language Mappings');
    $f->description = $this->_('List all languages of your system with their mapped locale for RockTabulator here.');
    $f->notes = $this->_('One by line, eg de=de-de (where de is the language name and de-de is the tabulator locale');
    $inputfields->add($f);
    
    return $inputfields;
  }
}
