$(document).on('loaded', '.RockMarkup', function() {
  var grid = RockTabulator.init(this, {
    autoColumns: false,
    columns:[
      {title:"Name", field:"title", sorter:"string", width:200, headerFilter:true},
      {title:"Owner", field:"owner_title", sorter:"string", width:200, headerFilter:true},
      {title:"Weight", field:"weight", sorter:"number", align:"right", bottomCalc:"sum"},
    ],
  });
  var table = grid.table;

  // hide column (if we need the id for something else)
  // for example for creating links url?id=123
  table.hideColumn("owner");

  // delete this column (it is the same as owner) and
  // only there because of how RockFinder1 works
  table.deleteColumn("owner_id");
});
