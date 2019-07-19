/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulator.js');

function RockTabulator() {

  /**
   * Array of all grids
   */
  this.grids = [];

  /**
   * AJAX endpoint url
   */
  this.url = '/rocktabulator/';

  // global config
  this.conf = ProcessWire.config.RockTabulator;
};

/**
 * Init a grid when the dom element was loaded
 */
RockTabulator.prototype.init = function(el, options) {
  // get jquery and dom object of element
  var $el = el;
  if(!el.jquery) $el = $(el);
  el = $el[0];

  // replace setup instructions with loading spinner
  $el.find('.RockTabulator').html('<i class="fa fa-spin fa-spinner"></i>');

  // get the tabulator container
  var name = el.id.replace('Inputfield_', '');
  var $container = $el.find('div.RockTabulator');

  // set options
  var options = options || {};

  // save it to the grid
  var grid = RockTabulator.addGrid(name);

  // add properties to grid
  grid.options = options;

  // if data was set via JS we add it to the grid object
  // this property is monitored via tabulator reactiveData feature
  grid.data = options.data;

  // set defaults
  var defaults = {
    // Set data of the tabulator
    // We enable reactive data so that tabulator automatically updates whenever
    // the source data changes.
    reactiveData: true,
    data: grid.data,
    
    // set columns from datasource
    autoColumns: true,

    // pagination
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: true,

    // layout
    layout:"fitColumns",

    // locale
    locale: this.conf.locale,
    langs: this.conf.langs,
  }
  
  // merge tabulator config options
  grid.config = $.extend(defaults, options.config);

  // create tabulator
  this.createTabulator($container[0], grid);
}

RockTabulator.prototype.createTabulator = function(el, grid) {
  var data = grid.data;
  var conf = this.conf;

  // save datatype to grid object
  // this is needed later for disabling ajax on JS-only grids
  grid.dataType = typeof data;

  // init the table vars
  var t;
  var afterInit = grid.options.afterInit || function() {};

  // init tabulator and call callback
  var init = function() {
    table = new Tabulator(el, grid.config);
    grid.table = table;

    afterInit(table, grid);
  }

  if(grid.dataType == 'object') {
    grid.dataType = 'js';
    init();
  }
  else if(grid.dataType == 'string') {
    grid.dataType = 'external';
    grid.config.data = [];

    // external json url
    // todo
  }
  else {
    grid.dataType = 'ajax';

    // by default we send an internal ajax post to get data from php
    this.post({
      name: grid.name,
      done: function(result) {
        // check type json
        if(typeof result != 'object') {
          $(el).html("Wrong response type (JSON required)");
          return;
        }

        // check for error message
        if(result.error) {
          $(el).html(result.error);
          return;
        }

        // init grid
        grid.data = result.data;
        grid.config.data = grid.data;
        init();
      },
      error: function(data) {
        $(el).html("AJAX ERROR");
      },
    });
  }
}

/**
 * Send AJAX request to get data
 */
RockTabulator.prototype.post = function(obj) {
  var doneCallback = obj.done || function(){};
  var errorCallback = obj.error || function(){};
  
  // prepare lang
  var lang = null;
  if(ProcessWire.config.LanguageSupport) {
    lang = ProcessWire.config.LanguageSupport.language.id;
  }

  // send post request
  $.post(RockTabulator.url, {
    name: obj.name,
    lang: lang,
  }).done(doneCallback)
    .error(errorCallback);
}

/**
 * Add grid
 */
RockTabulator.prototype.addGrid = function(name) {
  var grid = new RockTabulatorGrid(name);

  // By default the data property is NULL
  // This means an AJAX request will be fired to get data from the PHP file
  // having the same name as the grid.
  grid.data = null;

  this.grids.push(grid);
  return grid;
};

/**
 * Return grid by name
 */
RockTabulator.prototype.getGrid = function(name) {
  for(var i=0; i<this.grids.length; i++) {
    if(this.grids[i].name == name) return this.grids[i];
  }
}

/**
 * Return the translated string of requested property
 */
RockTabulator.prototype._ = function(name) {
  if(typeof this.langs == 'undefined') return name;
  var langs = this.langs[this.locale];
  return langs[name] || '';
}

// init one global RockTabulator object
var RockTabulator = new RockTabulator();

// fix some display issues
$(document).ready(function() {
  // redraw all tabulators once
  // without this redraw inputfields with JS data and collapsed state open have a glitch
  $.each(RockTabulator.grids, function(i, grid) {
    if(!grid.table) return;
    grid.table.redraw();
  });
});

// Sandbox AJAX requests
$(document).on('click', '#tabulator_ajax_post', function() {
  var name = $(this).data('name');
  
  // send ajax post
  RockTabulator.post({
    name,
    done: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.error(data);
    },
  });
});
