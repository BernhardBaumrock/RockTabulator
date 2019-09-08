'use strict';
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt03_simple_php_data') return;
  grid.initTable();
});