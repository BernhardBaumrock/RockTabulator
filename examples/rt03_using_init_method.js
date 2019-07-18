$(document).on('loaded', '.RockMarkup[data-name=rt03_using_init_method]', function() {
 var grid = RockTabulator.init(this, {
    // set data array via JS
    data: [
      {foo:'bar1', bar:'foo1'},
      {foo:'bar2', bar:'foo2'},
      {foo:'bar3', bar:'foo3'},
      {foo:'bar4', bar:'foo4'},
      {foo:'bar5', bar:'foo5'},
    ],

    // customize tabulator
    // see http://tabulator.info/docs/4.2/options
    config: {
      tooltips:true,            //show tool tips on cells
      paginationSize:2,         //allow 2 rows per page of data
      movableColumns:true,      //allow column order to be changed
    },
  });
});