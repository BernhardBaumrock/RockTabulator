$(document).on('loaded', '.RockMarkup[data-name=<?= $name ?>]', function() {
  var grid = RockTabulator.init(this, {
    // Optional: Set data via JS.
    // Note: If JS data is not set, the grid will load data from PHP file.
    // data: [{foo:'bar1'},{foo:'bar2'},{foo:'bar3'}],

    // optional tabulator config options
    config: {},
  });
});
