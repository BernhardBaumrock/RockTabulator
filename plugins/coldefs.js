$(document).on('pluginsReady.RT', function(event, grid) {

  var formatter = function(cell){ return cell.getValue(); }

  /**
   * Default column
   */
  grid.addPlugin('def.default', function(name, options) {
    var options = $.extend({
      headerFilter: true,
      width: null,
      formatter,
    }, options);

    grid.setColdef(name, {
      headerFilter:options.headerFilter,
      title: options.title || grid._(name),
      width: options.width,
      formatter: function(cell) {
        var val = options.formatter(cell);
        return val;
      },
    });
  });

});
