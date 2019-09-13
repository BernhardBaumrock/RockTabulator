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

  /**
   * Show relation data as page title
   */
  grid.addPlugin('def.relation', function(name, options) {
    var options = $.extend({
      default: true, // apply default coldef?
      col: 'title', // column to return as text
      id: 'id', // id of page to open
      relation: name,
    }, options);

    // apply default formatter
    if(options.default) grid.getPlugin('def.default')(name);

    function customHeaderFilter(headerValue, rowValue, rowData, filterParams){
      // get relation data
      var ids = rowData[name];
      if(!ids) return;

      var str = '';
      $.each(ids.split(','), function(i, id) {
        var item = grid.getRelationItem(options.relation, id);
        str += ' ' + item[options.col];
      });

      var search = headerValue.toLowerCase();
      var str = str.toLowerCase();
  
      return str.indexOf(search) >= 0;
    }

    // set coldef
    grid.setColdef(name, {
      formatter: function(cell) {
        var val = cell.getValue();
        if(!val) return;
        
        val = val.split(',');
        var out = '';
        var del = '';
        $.each(val, function(i, id) {
          var item = grid.getRelationItem(options.relation, id);
          if(!item) return;

          // add panel link icon
          var href = ProcessWire.config.urls.admin + 'page/edit/?id='+id;
          var action = grid.getRowaction({
            name: 'panel',
            icon: 'search',
            class: 'rt-reload bg-gray-500',
            href,
          }).render();

          out += del + action + item[options.col];

          del = '<br>';
        });

        return out;
      },
      headerFilterFunc:customHeaderFilter
    });
  });

});
