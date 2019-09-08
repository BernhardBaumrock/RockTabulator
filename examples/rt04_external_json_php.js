'use strict';
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt04_external_json_php') return;
  grid.initTable();
});