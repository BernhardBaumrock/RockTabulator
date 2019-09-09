'use strict';
// ###################### external file start #################################
// This part is usually loaded from external .js files in the /plugins folder

// example plugins
$(document).on('pluginsReady.RT', function(e, grid) {
  if(grid.name != 'rt11_plugins') return;
  
  grid.addPlugin('foo', function() { alert('foo 1 plugin fired'); });
  grid.getPlugin('foo')(); // execute foo plugin

  // this will not be added because it exists already
  grid.addPlugin('foo', function() {});
  grid.getPlugin('foo')(); // execute foo plugin

  grid.addPlugin(
    'foo',
    function() { alert('foo 1 plugin again, but overwritten'); },
    true
  );
  // grid.getPlugin('foo')(); // execute foo plugin

  // setting the 3rd param true will overwrite existing plugins
  grid.addPlugin('bar', function(e, row){
    var bar = row.getData().bar;
    ProcessWire.alert('Value of bar: "' + bar + '"\nNote it is not the rendered value!');
  }, true);
});

// example formatters
$(document).on('formattersReady.RT', function(e, grid) {
  if(grid.name != 'rt11_plugins') return;
  
  grid.addFormatter('foo', function(val) { return val + ' foo'; });
  grid.addFormatter('bar', function(val) { return val + ' bar'; });
  grid.addFormatter('bold', function(val, cell) {
    $(cell.getElement()).addClass('uk-text-bold');
    return val;
  });
  grid.addFormatter('danger', function(val, cell) {
    $(cell.getElement()).addClass('uk-text-danger');
    return val;
  });
  grid.addFormatter('bold-danger', function(val, cell) {
    val = grid.getFormatter('bold').apply(val, cell);
    val = grid.getFormatter('danger').apply(val, cell);
    return val;
  });
});

// ###################### external file end #################################

/**
 * Init the grid on load of the Inputfield
 */
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt11_plugins') return;

  // init the grid
  grid.initTable({
    // The rowClick event is fired by tabulator every time a row is clicked.
    rowClick: grid.getPlugin('bar'),
  });
});

/**
 * Set formatters when table is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt11_plugins') return;

  // update column definitions
  grid.setColdef('foo', {
    formatter: grid.applyFormatter('foo'),
  });
  grid.setColdef('bar', {
    formatter: grid.applyFormatter('bar'),
  });
  grid.setColdef('path', {
    formatter: grid.applyFormatter('bold-danger'),
  });
});
