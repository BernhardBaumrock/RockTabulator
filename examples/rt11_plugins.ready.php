<?php namespace ProcessWire;
// load VEX library for nicer alerts
// see https://processwire.com/talk/topic/19199-how-to-use-beautiful-alertconfirmprompt-dialog-boxes-in-the-backend/
$this->wire('modules')->get('JqueryUI')->use('vex');
$inputfield->notes = 'Click on any row to fire the bar plugin';
