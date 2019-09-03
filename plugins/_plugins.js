/**
 * This file is a collection of necessary plugins for RockTabulator
 * You can create your own plugins easily by adding a new prototype method either
 * in /site/assets/RockTabulator/plugins/plugins.js if your method should be
 * available for all grids or directly in the grid's JS file (see example rt11).
 * 
 * You can see all available plugins in the console: RockTabulator.plugins...
 */
$(document).on('RockTabulatorReady', function() {
  var RT = RockTabulator;
  var Plugins = function() {}
  
  RT.plugins = new Plugins();
});
