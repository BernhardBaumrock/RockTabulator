/**
 * RockTabulator formatters
 * 
 * We use a different concept than tabulator uses on its own. RockTabulator
 * formatters are callbacks that return a formatted string. This makes it
 * possible to combine multiple formatters (eg format('bold') + format('euro'))
 */
$(document).on('RockTabulatorReady', function() {
  var RT = RockTabulator;

  var Formatters = function() {}

  Formatters.prototype.foo = function() {
    return 'bar';
  }

  RT.formatters = new Formatters();
});
