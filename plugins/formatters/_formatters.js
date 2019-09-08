'use strict';

/**
 * RockTabulator Grid Formatter Support
 */
$(document).on('loadPlugins.RT', function() {
  var Formatters = function() {
    this.data = {}
  }

  Formatters.prototype.add = function(name, callback, overwrite) {
    var overwrite = overwrite || false;
    var plugin = this.get(name);
    if(plugin && !overwrite) return;
    this.data[name] = callback;
  }

  Formatters.prototype.get = function(name) {
    return this.data[name] || false;
  }

  /**
   * Apply this formatter to the current cell
   * 
   * The apply method returns a callback that takes the cell as first argument
   * and applies the value of that cell to the requested formatter.
   * 
   * RockTabulator formatters are designed to take the VALUE of the cell as
   * first parameter and (if necessary) the cell as second. This makes it
   * possible to combine multiple formatters at once and break logic into
   * multiple reusable formatters (eg euro, bold, number).
   */
  Formatters.prototype.apply = function(name) {
    var formatter = this.get(name);
    return function(cell) {
      return formatter(cell.getValue());
    }
  }

  /**
   * Init formatters when a new grid is added to RockTabulator
   */
  $(document).on('gridReady.RT', function(e, grid) {
    grid.formatters = new Formatters();
    grid.getWrapper().trigger('formattersReady.RT', [grid]);
  });

  /**
   * Add general formatters
   */
  $(document).on('formattersReady.RT', function(e, grid) {
    var formatters = grid.formatters;

    // formatters.add('foo', function() { ... });
  });

  // init formatters or main object
  RockTabulator.formatters = new Formatters();
});
