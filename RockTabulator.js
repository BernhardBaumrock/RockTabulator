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

  // make sure it is the inputfield li element
  $el = $el.closest('li.Inputfield');
  if(!$el.length) {
    alert('RockTabulator must be inside of an Inputfield');
    return;
  }
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

  return grid;
}

RockTabulator.prototype.createTabulator = function(el, grid) {
  var data = grid.data;

  // save datatype to grid object
  // this is needed later for disabling ajax on JS-only grids
  grid.dataType = typeof data;

  // init the table vars
  var t;

  // called after the table is created
  // on ajax tables this is called after the data was loaded
  var afterInit = grid.options.afterInit || function() {};

  // called after every ajax request has finished
  var afterAjax = grid.options.afterAjax || function() {};

  
  // event listeners
  $(document).on('rendered', '.RockTabulatorWrapper', function(e, grid) {
    // fire ajax callbacks
    if(grid.rendered === 0) afterInit(grid);
    if(grid.dataType == 'ajax') afterAjax(grid);

    // set ajax init flag
    grid.rendered = grid.rendered+1;
  });
  
  // setup renderComplete function
  // if a custom callback is set by the user we store it
  var renderComplete = grid.config.renderComplete || function(){};
  grid.config.renderComplete = function(){
    // call user defined rendercomplete callback
    renderComplete();
    grid.getWrapper().trigger('rendered', [grid]);
  };

  // init tabulator and call callback
  var init = function() {
    table = new Tabulator(el, grid.config);
    grid.setDataProperties();
    grid.table = table;

    // save table instance globally
    if(ProcessWire.config.sandbox) {
      _grid = grid;
      console.log("_grid", _grid);
    }
  }

  console.log(grid.dataType, grid);

  if(grid.dataType == 'object') {
    grid.dataType = 'js';
    init();
  }
  else if(grid.dataType == 'string') {
    grid.dataType = 'external';
    grid.config.data = [];

    // external json url
    grid.config.ajaxURL = 'https://jsonplaceholder.typicode.com/posts';
    init();
  }
  else {
    // ajax data
    grid.dataType = 'ajax';
    grid.config.data = [];

    // prepare lang
    var lang = null;
    if(ProcessWire.config.LanguageSupport) {
      lang = ProcessWire.config.LanguageSupport.language.id;
    }

    // modify config object
    grid.config.ajaxURL = RockTabulator.url;
    grid.config.ajaxParams = {
      name:grid.name,
      lang:lang,
    };
    grid.config.ajaxConfig = "post";

    // alter received data to fit tabulators needs
    grid.config.ajaxResponse = function(url, params, response) {
      // save response to grid
      grid.response = response;

      // check if response data is a tabulatorgrid data object
      if(typeof response == 'object') {
        // did we get an error?
        if(response.error) {
          $(el).html('<div class="uk-alert-warning" uk-alert>'+response.error+'</div>');
          return [];
        }

        // return data array
        if(response.type == 'sql') return response.data;
        if(response.type == 'array') return response.data;
        if(response.type == 'RockFinder1') {
          grid.setDataProperties(response);
          return response.data;
        }
        if(response.type == 'RockFinder2') {
          grid.setDataProperties(response);
          return response.data.data;
        }
      }

      UIkit.notification('Unknown type of data', {status:'danger'});
      console.warn(response);
      return [];
    }

    init();
  }
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
RockTabulator.prototype.addGrid = function(name) {
  var grid = new RockTabulatorGrid(name);

  // trigger event (for plugins)
  $(document).trigger('RockTabulatorGridReady', [grid]);

  // By default the data property is NULL
  // This means an AJAX request will be fired to get data from the PHP file
  // having the same name as the grid.
  grid.data = null;

  this.grids.push(grid);
  return grid;
};

/**
 * Return grid by name or dom element
 */
RockTabulator.prototype.getGrid = function(name) {
  for(var i=0; i<this.grids.length; i++) {
    if(this.grids[i].name == name) return this.grids[i];
  }

  // if the grid was not found yet try to find it via jquery
  var el = name;
  $li = $(el).closest('.Inputfield');
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
$(document).trigger('RockTabulatorReady');
// ######################################################################


// ######################### misc #########################

// fix some display issues
$(document).ready(function() {
  // redraw all tabulators once
  // without this redraw inputfields with JS data and collapsed state open have a glitch
  $.each(RockTabulator.grids, function(i, grid) {
    if(!grid.table) return;
    grid.table.redraw();
  });
});
