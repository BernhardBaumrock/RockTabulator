'use strict';

/**
 * Initialize the table when the grid object is ready
 */
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt08_multilang') return;
  grid.initTable();
});

/**
 * Modify the table when it is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  if(grid.name != 'rt08_multilang') return;
  
  // set title property of this column
  // we get the translated value with id "foo-lang-value"
  // if a translation does not exist it falls back to the default
  // if a translation is not defined at all it will return the id
  // (here: foo-lang-value)
  grid.setColdef('foo', {title: grid._('foo-lang-value')});
});
