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
   * Show page id as title + panel link
   */
  grid.addPlugin('def.page', function(name, options) {
    var options = $.extend({
      default: true, // apply default coldef?
      id: 'id', // id of page to open
      col: null, // column name holding page title
      relation: false,
    }, options);

    // apply default formatter
    if(options.default) grid.getPlugin('def.default')(name);

    // setup relation
    var relation = false;
    if(options.relation === true) relation = name;
    else if(options.relation) relation = options.relation;

    // get text for given id of page
    var idToText = function(id, rowData) {
      if(relation) {
        // get page title from relation
        var obj = grid.getRelationItem(relation, id);

        // if no column is set we take the title property of the relation
        var col = options.col || 'title';

        if(obj) return obj[col];
      }
      else {
        // if no column is set we take the name:title column
        var col = options.col || name+':title';
        return rowData[col];
      }
      return false;
    }

    // setup filter
    function customHeaderFilter(headerValue, rowValue, rowData, filterParams){
      // get relation data
      var ids = rowData[name];
      if(!ids) return;

      var str = '';
      $.each(ids.split(','), function(i, id) {
        str += ' ' + idToText(id, rowData);
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
          var rowData = cell.getRow().getData();
          var item = idToText(id, rowData);
          if(!item) return;

          // add panel link icon
          var href = ProcessWire.config.urls.admin + 'page/edit/?id='+id;
          var action = grid.getRowaction({
            name: 'panel',
            icon: 'search',
            class: 'rt-reload bg-gray-500',
            href,
          }).render();

          out += del + action + item;

          del = '<br>';
        });

        return out;
      },
      headerFilterFunc:customHeaderFilter
    });
  });

});
