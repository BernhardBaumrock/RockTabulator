$(document).on('loaded', '.RockMarkup2[data-name=rt05b_get_external_json]', function() {
  RockTabulator.init(this, {
    data: 'https://jsonplaceholder.typicode.com/posts',
    afterInit: function(grid) {
      grid.table.addColumn({
        title: 'dynamic-column-demo',
        formatter: function(cell) {
          var data = cell.getRow().getData();
          return "userId = " + data.userId
            + ", id = " + data.id;
        },
      });
    },
  });
});