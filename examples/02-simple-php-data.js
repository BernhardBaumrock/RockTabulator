$(document).on('loaded', '.RockMarkup', function() {
  //define table
  var table = new Tabulator("#Inputfield_02-simple-php-data .RockTabulator", {
    data:RockTabulator.getGrid('02-simple-php-data').data,
    autoColumns:true,
  });
});
