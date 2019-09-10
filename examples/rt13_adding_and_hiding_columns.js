'use strict';

/**
 * Initialize the table when the grid object is ready
 */
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt13_adding_and_hiding_columns') return;
  grid.initTable();
});

/**
 * Modify the table when it is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  if(grid.name != 'rt13_adding_and_hiding_columns') return;

  // option 1
  grid.setColdef('col-to-hide', {
    visible: false,
  });

  // option 2
  // grid.table.getColumn('col-to-hide').hide();
  // grid.table.redraw();

  // add column
  // see http://tabulator.info/docs/4.4/columns#add
  grid.table.addColumn({
    title:"JS-Column",
    formatter: function(cell) {
      var row = cell.getRow().getData();
      return "foo = " + row.foo + ", bar = " + row.bar;
    },
  });
});
