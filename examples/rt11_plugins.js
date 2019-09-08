// ###################### external file start #################################
// This part is usually loaded from external .js files in the /plugins folder
$(document).on('pluginsReady.RT', function(e, grid) {
  if(grid.name != 'rt11_plugins') return;
  var plugins = grid.plugins;
  
  plugins.add('foo', function() { alert('foo 1 plugin fired'); });
  plugins.get('foo')(); // execute foo plugin

  // this will not be added because it exists already
  plugins.add('foo', function() {});
  plugins.get('foo')(); // execute foo plugin

  plugins.add(
    'foo',
    function() { alert('foo 1 plugin again, but overwritten'); },
    true
  );
  plugins.get('foo')(); // execute foo plugin

  // setting the 3rd param true will overwrite existing plugins
  plugins.add('bar', function(e, row){
    var bar = row.getData().bar;
    ProcessWire.alert('Value of bar ' + bar + ' (note it is not the rendered value)');
  }, true);
});

$(document).on('formattersReady.RT', function(e, grid) {
  var formatters = grid.formatters;
  
  formatters.add('xxx', function(val) {
    return 'xxx ' + val;
  });
  formatters.add('bold', function(val, cell) {
    $(cell.getElement()).addClass('uk-text-bold');
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
    rowClick: grid.plugins.get('bar'),
  });

  // update column definitions
  grid.setColdef('bar', {
    // example how to apply a single formatter
    formatter: grid.formatters.apply('xxx'),
  });
  grid.setColdef('path', {
    // example how to apply a combined formatter
    // you can create your own combined formatters as plugins then you can also
    // reuse them, eg:
    // formatter: grid.plugins.myCombinedFormatter,
    formatter: function(cell) {
      var val = cell.getValue();
      val = grid.formatters.get('xxx')(val);
      val = grid.formatters.get('bold')(val, cell);
      return val;
    },
  });
});
