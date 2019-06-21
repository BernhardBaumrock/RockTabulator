/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulatorGrid.js');

function RockTabulatorGrid(name) {
  this.name = name;
  this.data = [];
}

RockTabulatorGrid.prototype.setData = function(data) {
  this.data = data;
}
