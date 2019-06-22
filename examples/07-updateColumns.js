$(document).on('loaded', '.RockMarkup', function() {
  var grid = RockTabulator.init(this);
  var table = grid.table;
  
  // mutator to build the image url
  var animalType = function(value) {
    console.log(value);
    return 'x';
  }

  // set columns via the RockTabulator updateColumns method
  // this will keep all current columns in place and just UPDATE non-existant
  // properties or overwrite existing properties with new values
  table.deleteColumn('id');
  table.deleteColumn('owner_id');
  grid.updateColumns({
    'title': {title:"Name", width:200, headerFilter:true},
    'owner_title': {title:"Owner", width:200, headerFilter:true},
    'weight': {title:"Weight", sorter:"number", align:"right", bottomCalc:"sum"},
    'body': {title: "Description", formatter: 'html'},
    'owner': {visible: false},
    'worth': {title: "Worth", bottomCalc: "sum", formatter:"money", formatterParams:{
      decimal:",",
      thousand:".",
      symbol:"€ ",
      precision:2,
    }, align:"right"},
    'templates_id': {
      title: "Type",
      accessor: animalType,
      // formatter:"image",
      // formatterParams:{
      //   height:"50px",
      //   width:"50px",
      // }
    },
  });
});
