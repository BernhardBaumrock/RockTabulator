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

RockTabulator.prototype.createTabulator = function(el, grid) {
  var data = grid.data;

  // save datatype to grid object
  // this is needed later for disabling ajax on JS-only grids
  grid.dataType = typeof data;
  
  // event listeners
  $(document).on('rendered', '.RockTabulatorWrapper', function(e, grid) {
    
    // called after the table is created
    // on ajax tables this is called after the data was loaded
    var afterInit = grid.options.afterInit || function() {};

    // called after every ajax request has finished
    var afterAjax = grid.options.afterAjax || function() {};
    
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
    grid.getWrapper().trigger('rendered.RT', [grid]);
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
RockTabulator.prototype.addGrid = function(name, data) {
  var grid = new RockTabulatorGrid(name);

  $.extend(grid, data); // load data from php json string
  this.grids.push(grid); // push grid to array
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
$(document).trigger('loadPlugins.RT');
$(document).trigger('ready.RT');
// ######################################################################
