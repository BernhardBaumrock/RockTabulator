$(document).on('loaded', '.RockTabulator', function() {
  RockTabulator.init({
    el: this,
    
    // this will set the data to a rockfinder endpoint
    // options are:
    // 1) array -> data set manually
    // 2) string -> will be treated as URL
    // 3) object -> define type + name (optional)
    // 4) null -> default = {type:'RockFinder2'}
    data: {
      type: 'RockFinder2',
    },

    // tabulator config object
    config: {

    },
    
    // this callback is executed after initialisation
    onInit: function(grid) {
      console.log('grid ready', grid);
    },

    // callback after each ajax request
    onLoad: function(grid, data) {

    },
  });
});
