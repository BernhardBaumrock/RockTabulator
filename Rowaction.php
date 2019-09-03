<?php namespace RockTabulator;
/**
 * Rowaction object
 */
class Rowaction extends \ProcessWire\WireData {

  public $access;
  
  /**
   * Constructor
   */
  public function __construct() {

    /**
     * Default access function
     * 
     * By default all rowactions are only accessible by superusers.
     */
    $this->access = function() {
      return $this->user->isSuperuser();
    };
  }

  /**
   * Check access for this action
   */
  public function access() {
    if(is_callable($this->access)) {
      return $this->access->__invoke();
    }
  }

  /**
   * Execute this action
   */
  public function execute() {
    if(is_callable($this->execute)) {
      return $this->execute->__invoke();
    }
  }

  /**
   * Add class to classes string
   */
  public function addClass($class) {
    $cls = $this->class ?: '';
    $classes = explode(" ", $cls);
    $classes = array_merge($classes, explode(" ", $class));
    $classes = array_unique($classes);
    $classes = array_filter($classes);
    $this->class = implode(" ", $classes);
  }

  /**
   * Return name of action if requested as string
   */
  public function __toString() {
    return $this->name ?: '';
  }
  
  /**
   * Debug Info
   * @return array
   */
  public function __debugInfo() {
    return $this->getArray();
  }
}
