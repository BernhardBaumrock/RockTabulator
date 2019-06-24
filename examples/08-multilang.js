$(document).on('loaded', '.RockMarkup', function() {
  var grid = RockTabulator.init(this);
  var table = grid.table;

  grid.updateColumns({
    'body': {title: grid._('description'), formatter: 'html', headerFilter: true},
    'title': {title: grid._('title')},
    'owner': {title: grid._('owner')},
    'weight': {title: grid._('weight')},
    'worth': {title: grid._('worth')},
  });

  console.log('Example of global fallback:', grid._('foo'));
});
