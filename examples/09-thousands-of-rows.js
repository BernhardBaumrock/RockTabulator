$(document).on('loaded', '.RockMarkup', function() {
  RockTabulator.init(this, null, function(grid) {
    console.log('grid ready', grid);
  });
});
