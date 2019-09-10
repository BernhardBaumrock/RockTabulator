'use strict';

/**
 * Initialize the table when the grid object is ready
 */
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != '<?= $name ?>') return;
  grid.initTable();
});

/**
 * Modify the table when it is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  if(grid.name != '<?= $name ?>') return;
  
  // set coldefs, add or hide columns here
});
