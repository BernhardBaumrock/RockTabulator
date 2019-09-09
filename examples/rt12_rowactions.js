'use strict';

/**
 * Init the grid on load of the Inputfield
 */
$(document).on('gridReady.RT', function(event, grid) {
  if(grid.name != 'rt12_rowactions') return;
  grid.initTable();
});

/**
 * Modify the table when it is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  if(grid.name != 'rt12_rowactions') return;
  grid.setRowactions();

  grid.setColdef('title', {
    formatter: function(cell) {
      var val = cell.getValue();
      return grid.getRowaction({
        name: 'foo-bar',
        icon: 'bolt',
        label: 'foo bar',
        class: 'show-on-hover',
      }).render(cell) + val;
    },
  });
});

$(document).on('rowaction.RT', function(e, name, row) {
  if(name != 'foo-bar') return;
  alert("foo bar action clicked on item #" + row.getData().id);
});
