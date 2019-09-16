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
      relation: null, // is this a joined page or a relation?
      hideTitle: true, // hide title column?
      width: null,
    }, options);

    // apply default formatter
    if(options.default) grid.getPlugin('def.default')(name);

    // setup relation
    var relation = false;
    if(grid.data.relations && grid.data.relations[name]) {
      relation = grid.data.relations[name];
    }

    if(options.relation) relation = options.relation;
    else if(options.relation === false) relation = false;
    
    // get title column
    var col = options.col || 'title';
    if(!relation) col = options.col || name+':title';

    // get text for given id of page
    var idToText = function(id, rowData) {
      if(relation.relationData) {
        return relation.relationData[id][col];
      }
      else if(relation) {
        // get page title from relation
        var obj = grid.getRelationItem(relation, id);
        if(obj) return obj[col];
      }
      else {
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
      width: options.width,
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
    
    // hide title column if that was a join
    if(!relation && options.hideTitle) grid.setColdef(col, {visible:false});
  });
});
