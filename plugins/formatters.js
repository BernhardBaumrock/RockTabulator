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
    var callback = this.getFormatter(name).apply || function() {
      console.warn("formatter " + name + " not found");
    };
    return function(cell) { return callback(cell.getValue(), cell); }
  }

  /**
   * Get Formatter by name
   */
  RockTabulatorGrid.prototype.getFormatter = function(name) {
    if(!name) return new Formatter();
    return this.formatters[name] || false;
  }

  /** ################### init formatters object ################### */

  grid.formatters = {};
  grid.getWrapper().trigger('formattersReady.RT', [grid]);

  /** ################### global formatters ################### */

  grid.addFormatter('open-in-panel', function(data) {
    var row = data.cell.getRow().getData();
    var id = row[data.col];
    var href = ProcessWire.config.urls.admin + 'page/edit/?id='+id;
    if(data.fields) href += '&fields=' + data.fields;
    var action = grid.getRowaction({
      name: 'panel',
      icon: 'search',
      class: 'show-on-hover rt-reload',
      href,
    }).render(data.cell);
    return action + data.val;
  });
});
