'use strict';
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt08_multilang') return;
  grid.initTable();
});