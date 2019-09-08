$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != '<?= $name ?>') return;
  grid.initTable();
});
