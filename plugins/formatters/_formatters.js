'use strict';

/**
 * RockTabulator Grid Formatter Support
 */
$(document).on('gridReady.RT', function(event, grid) {
  
  class Formatter {
    constructor() {
      this.apply = function() {}
    }
  }

  /**
   * Add formatter to this grid
   */
  RockTabulatorGrid.prototype.addFormatter = function(name, callback, overwrite) {
    var overwrite = overwrite || false;
    
    var exists = this.getFormatter(name);
    if(exists && overwrite == false) {
      alert('Formatter ' + name + ' already exists, adding it again is not possible!');
      return;
    }

    var formatter = new Formatter();
    formatter.apply = callback;
    this.formatters[name] = formatter;
  }
  
  /**
   * Apply this formatter as formatter for tabulator
   */
  RockTabulatorGrid.prototype.applyFormatter = function(name) {
    // get the formatter callback
    var callback = this.getFormatter(name).apply;
    return function(cell) { return callback(cell.getValue(), cell); }
  }

  /**
   * Get Formatter by name
   */
  RockTabulatorGrid.prototype.getFormatter = function(name) {
    if(!name) return new Formatter();
    return this.formatters[name] || false;
  }

  grid.formatters = {};
  grid.getWrapper().trigger('formattersReady.RT', [grid]);
});
