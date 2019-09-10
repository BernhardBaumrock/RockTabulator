'use strict';

/**
 * RockTabulator Grid Plugin Support
 */
$(document).on('gridReady.RT', function(event, grid) {
  /**
   * Basic Plugin class
   */
  class Plugin {
    constructor() {}
  }

  /**
   * Add plugin to this grid
   */
  RockTabulatorGrid.prototype.addPlugin = function(name, callback, overwrite) {
    var overwrite = overwrite || false;
    var plugin = this.getPlugin(name);
    if(plugin && overwrite == false) {
      alert('Plugin ' + name + ' already exists, adding it again is not possible!');
      return;
    }
    this.plugins[name] = callback;
  }

  /**
   * Get Plugin by name
   */
  RockTabulatorGrid.prototype.getPlugin = function(name) {
    if(!name) return new Plugin();
    return this.plugins[name] || false;
  }

  grid.plugins = {};
  grid.getWrapper().trigger('pluginsReady.RT', [grid]);
});

/**
 * Colorize rows based on status column
 */
$(document).on('gridReady.RT', function(event, grid) {

  /**
   * Update columns based on a colDefs array
   */
  RockTabulatorGrid.prototype.rowStatusColors = function(data) {
    var data = $.extend({
      column: 'status', // name of column holding page status
    }, data||{});

    var grid = this;
    grid.setColdef(data.column, {
      visible: false,
      formatter: function(cell) {
        // get row and add class
        var val = cell.getValue();
        var $row = $(cell.getRow().getElement());
        if(val == 1) return val;
        else if(val > 8192) $row.addClass('bg-red-300'); // trashed
        else if(val > 2048) $row.addClass('bg-orange-300'); // unpublished
        else if(val > 1024) $row.addClass('bg-gray-300'); // hidden
        else $row.addClass('bg-orange-300');
        return val;
      },
    });
  }
});

/**
 * Reload grid whenever a panel is closed and has class rt-reload
 */
$(document).on('pw-panel-closed', '.rt-reload', function() {
  RockTabulator.getGrid(this).reload();
});

/**
 * Redraw grids when an inputfield was collapsed
 */
$(document).on('opened', '.InputfieldRockTabulator', function() {
  var grid = RockTabulator.getGrid(this);
  if(grid && grid.table) grid.table.redraw();
});
