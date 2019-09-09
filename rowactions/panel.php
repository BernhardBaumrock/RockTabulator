<?php namespace RockTabulator;
$action = new Rowaction();
$action->icon = 'search';
$action->label = $this->_('Show');
$action->hover = $this->_('Open this item in a panel');
$action->href = $this->config->urls->admin . "page/edit/?id={id}";
$action->addClass('pw-panel pw-panel-reload'); // pw-panel classes
$action->addClass('rt-reload'); // reload grid when panel is closed
return $action;
