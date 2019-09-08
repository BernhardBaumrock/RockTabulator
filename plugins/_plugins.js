'use strict';

/**
 * RockTabulator Grid Plugin Support
 */
$(document).on('loadPlugins.RT', function() {
  var Plugins = function() {
    this.data = {}
  }

  Plugins.prototype.add = function(name, callback, overwrite) {
    var overwrite = overwrite || false;
    var plugin = this.get(name);
    if(plugin && overwrite == false) {
      alert('Plugin ' + name + ' already exists, adding it again is not possible!');
      return;
    }
    this.data[name] = callback;
  }

  Plugins.prototype.get = function(name) {
    return this.data[name] || false;
  }

  /**
   * Init plugins when a new grid is added to RockTabulator
   */
  $(document).on('gridReady.RT', function(e, grid) {
    grid.plugins = new Plugins();
    grid.getWrapper().trigger('pluginsReady.RT', [grid]);
  });

  /**
   * Add general plugins
   */
  $(document).on('pluginsReady.RT', function(e, grid) {
    var plugins = grid.plugins;

    // plugins.add('foo', function() { ... });
  });

  // init plugins or main object
  RockTabulator.plugins = new Plugins();
});
