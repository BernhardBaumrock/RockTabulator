'use strict';

/**
 * Initialize the table when the grid object is ready
 */
$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt16_column_groups') return;
  grid.initTable();
});

/**
 * Modify the table when it is ready
 */
$(document).on('tableReady.RT', function(event, grid) {
  if(grid.name != 'rt16_column_groups') return;
  
  // set coldefs, add or hide columns here
  grid.table.setColumns([
    {title:"Name", field:"name", width:160},
    {//create column group
        title:"Work Info",
        columns:[
        {title:"Progress", field:"progress", align:"right", sorter:"number", width:100},
        {title:"Rating", field:"rating", align:"center", width:80},
        {title:"Driver", field:"car", align:"center", width:80},
        ],
    },
    {//create column group
        title:"Personal Info",
        columns:[
        {title:"Gender", field:"gender", width:90},
        {title:"Favourite Color", field:"col", width:140},
        {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", width:130},
        ],
    },
  ]);
});