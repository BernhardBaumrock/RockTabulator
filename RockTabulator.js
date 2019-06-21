/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulator.js');

function RockTabulator() {
  this.grids = [];
};

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
