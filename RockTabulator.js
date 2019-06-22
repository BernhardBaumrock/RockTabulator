/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulator.js');

function RockTabulator() {
  this.grids = [];
};

/**
 * Init a grid when the dom element was loaded
 */
RockTabulator.prototype.init = function(el, options) {
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

  // merge options and init tabulator
  var t = new Tabulator($container[0], $.extend(defaults, options));
  grid.table = t;

  return grid;
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

// init one global RockTabulator object
var RockTabulator = new RockTabulator();
