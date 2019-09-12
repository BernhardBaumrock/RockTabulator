'use strict';

/**
 * Main RockTabulator class
 */
if(ProcessWire.config.sandbox) {
  // we are in the sandbox so we create a global grid variable
  var _grid;
}

// main object
function RockTabulator() {

  /**
   * Array of all grids
   */
  this.grids = {};

  /**
   * AJAX endpoint url
   */
  this.url = ProcessWire.config.urls.root+'rocktabulator/';

  /**
   * Init plugins
   */

  /**
   * Populate all properties of the config to this Tabulator
   */
  var config = ProcessWire.config.RockTabulator;
  for (var prop in config) {
    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      this[prop] = config[prop];
    }
  }
};

/**
 * Init a grid when the dom element was loaded
 * This does NOT init the tabulator. This is necessary so that tabulators
 * can manually be initialized (eg when loading data from another grid).
 */
RockTabulator.prototype.initGrid = function(el, data) {
  // get jquery and dom object of element
  var $el = el;
  if(!el.jquery) $el = $(el);

  // make sure it is the inputfield li element
  $el = $el.closest('li.Inputfield');
  if(!$el.length) {
    alert('RockTabulator must be initialized inside of an Inputfield');
    return;
  }
  el = $el[0];

  // save it to the grid
  var name = el.id.replace('Inputfield_', '');
  var grid = RockTabulator.getGrid(name);
  if(grid) return grid;
  else return this.addGrid(name, data);
}

/**
 * Send AJAX request to get data
 */
RockTabulator.prototype.post = function(obj) {
  var doneCallback = obj.done || function(){};
  var errorCallback = obj.error || function(){};
  var alwaysCallback = obj.always || function(){};
  
  // prepare lang
  var lang = null;
  if(ProcessWire.config.LanguageSupport) {
    lang = ProcessWire.config.LanguageSupport.language.id;
  }

  // setup payload
  var payload = obj.payload || {}
  $.extend(payload, {
    name: obj.name,
    lang: lang,
  });

  // send post request
  var url = obj.url || RockTabulator.url;
  $.post(url, payload)
    .done(doneCallback)
    .error(errorCallback)
    .always(alwaysCallback);
}

/**
 * Add grid
 */
RockTabulator.prototype.addGrid = function(name, data) {
  var grid = new RockTabulatorGrid(name);

  $.extend(grid, data); // load data from php json string
  this.grids[name] = grid; // push grid to array
  $(document).trigger('gridReady.RT', [grid]); // trigger event
  
  // save table instance globally when we are in the sandbox
  if(ProcessWire.config.sandbox) {
    _grid = grid;
    console.log("_grid", _grid);
  }
};

/**
 * Return grid by name or dom element
 */
RockTabulator.prototype.getGrid = function(name) {
  if(typeof name == 'string') {
    var grid = this.grids[name];
    if(grid) return grid;
  }

  // if the grid was not found yet try to find it via jquery
  var el = name;
  var $li = $(el).closest('.Inputfield');
  if(!$li.length) return;
  return this.getGrid($li.data('name'));
}

/**
 * Return the translated string of requested property
 */
RockTabulator.prototype._ = function(name) {
  if(typeof this.langs == 'undefined') return name;
  var langs = this.langs[this.locale];
  return langs[name] || '';
}

// ######################### init RockTabulator #########################
var RockTabulator = new RockTabulator();
$(document).trigger('ready.RT');
// ######################################################################
