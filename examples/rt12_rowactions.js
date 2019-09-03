$(document).on('loaded', '.RockMarkup2[data-name=rt12_rowactions]', function() {
  var RT = RockTabulator;

  // init the grid
  RT.init(this, {
    afterInit: function(grid) {
      grid.setRowactions();
  
      grid.setColdef('title', {
        formatter: function(cell) {
          return cell.getValue()
            + grid.renderRowactions(cell, ['trash'], {
              onHover: true,
            });
        }
      });
    },
  });
});
