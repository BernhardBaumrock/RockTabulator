/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulator.js');

function RockTabulator() {

  /**
   * Array of all grids
   */
  this.grids = [];
};

/**
 * Init a grid when the dom element was loaded
 */
RockTabulator.prototype.init = function(el, options, callback) {
  // make sure the element is a jquery object
  var $el = el;
  if(!el.jquery) $el = $(el);
  el = $el[0];

  // get the tabulator container
  var name = el.id.replace('Inputfield_', '');
  var $container = $el.find('div.RockTabulator');

  // save it to the grid
  var grid = RockTabulator.getGrid(name);

  // set options
  var options = options || {};

  // set defaults
  var defaults = {
    data: grid.data,
    reactiveData: true, //enable reactive data
    autoColumns: true,
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: true, //enable page size select element and generate list options
  }

  // setup default language options
  if(RockTabulator.langs) {
    defaults.locale = true;
    defaults.langs = RockTabulator.langs;
  }

  // get ajax data
  $.get('/tabulator').done(function(data) {
    RockMarkup.log('done');

    console.log(data);
    
    // merge options and init tabulator
    var t = new Tabulator($container[0], $.extend(defaults, options));
    grid.table = t;

    // data is ready, call the callback with the initialized grid
    callback(grid);
  }).fail(function() {
    // get multilang ajax error message
    RockMarkup.log('fail');
    var msg = RockTabulator._('ajax')["error"];
    $container.text("AJAX: " + msg);
  }).always(function() {
    RockMarkup.log('always');
  });
}

/**
 * Add grid
 */
RockTabulator.prototype.addGrid = function(name) {
  var grid = new RockTabulatorGrid(name);
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
