/**
 * Main RockTabulator class
 */
RockMarkup.log('RockTabulatorGrid.js');

function RockTabulatorGrid(name) {
  // name of the grid
  this.name = name;

  // data of the grid
  this.data = [];

  // the tabulator instance
  this.table = null;
}

/**
 * Get JSON from PHP and set all properties of the grid
 */
RockTabulatorGrid.prototype.setData = function(data) {
  for(prop in data) this[prop] = data[prop];
}

/**
 * Update a single column
 */
RockTabulatorGrid.prototype.updateColumn = function(name, def, instant = true) {
  // get current coldefs
  var current = this.table.getColumnDefinitions();
  var old = this.table.columnManager.findColumn(name);
  old.definition = $.extend(old.definition, def);

  // merge new coldefs
  if(instant) this.table.setColumns(current);
}

/**
 * Update columns based on a colDefs array
 */
RockTabulatorGrid.prototype.updateColumns = function(colDefs) {
  // get current coldefs
  var current = this.table.getColumnDefinitions();

  // loop all new definitions and update old colDefs
  for(var key in colDefs) {
    this.updateColumn(key, colDefs[key], false);
  }

  // merge new coldefs
  this.table.setColumns(current);
}

/**
 * Get translation value
 * 
 * Using this function makes sure the grid does not break when a translation
 * is not available. If a single translation does not exist for the current grid
 * it looks in the global translations object
 */
RockTabulatorGrid.prototype._ = function(name) {
  return this.lang[name] || RockTabulator._(name);
}
