$(document).on('loaded', '.RockMarkup', function() {
  var grid = RockTabulator.init(this);
  var table = grid.table;

  // set columns via the default tabulator method
  // this will REPLACE all column definitions and redraw the table
  table.setColumns([
    {title:"Name", field:"title", sorter:"string", width:200, headerFilter:true},
    {title:"Owner", field:"owner_title", sorter:"string", width:200, headerFilter:true},
    {title:"Weight", field:"weight", sorter:"number", align:"right", bottomCalc:"sum"},
  ]);
});
