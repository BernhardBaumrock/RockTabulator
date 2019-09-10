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
 * Reload grid whenever a panel is closed and has class rt-reload
 */
$(document).on('pw-panel-closed', '.rt-reload', function() {
  RockTabulator.getGrid(this).reload();
});
