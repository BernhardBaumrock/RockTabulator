<?php namespace RockTabulator;
use \ProcessWire\WireException;

$action = new Rowaction();
$action->icon = 'trash';
$action->label = $this->_('Trash');
$action->hover = $this->_('Trash this item');
$action->confirm = $this->_('Do you really want to trash this item?');
$action->href = "/rocktabulator/?rowaction=trash&id={id}";
$action->access = function() { return true; };
$action->execute = function() {
  // get id
  $id = $this->input->get('id', 'int');
  if(!$id) throw new WireException("Invalid ID");
  
  /** @var \ProcessWire\Page $page */
  $page = $this->wire->pages->get($id);
  if(!$page->id) throw new WireException("Page with id $id not found");
  if(!$page->trashable) throw new WireException("Page $id is not trashable");

  $page->trash();
  return $this->_('Page trashed successfully')
    ." ($id)";
};
return $action;
