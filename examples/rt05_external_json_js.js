$(document).on('gridReady.RT', function(event, grid) {
  // important if you have multiple gris on one page
  if(grid.name != 'rt05_external_json_js') return;
  grid.initTable({
    ajaxURL: 'https://jsonplaceholder.typicode.com/posts',
  });
});