$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt10_rockfinder2') return;
  grid.initTable();
});