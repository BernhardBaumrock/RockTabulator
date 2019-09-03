/**
 * ###############################################################
 * see Setup > RockMarkup2 > Examples > e02_all_possible_filetypes
 * ###############################################################
 */
$(document).on('loaded', '.RockMarkup2[data-name=<?= $name ?>]', function() {
  RockTabulator.init(this, {
    // Optional: Set data via JS.
    // Note: If JS data is not set, the grid will load data from PHP file.
    // data: [{foo:'bar1'},{foo:'bar2'},{foo:'bar3'}],

    // optional tabulator config options
    config: {},
  });
});
