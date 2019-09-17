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
   * Options ID to Text
   */
  grid.addPlugin('def.options', function(name, options) {
    var options = $.extend({
      headerFilter: true,
      formatter,
      icons: {},
    }, options);

    var getText = function(id) {
      var items = options.items || grid.data.options[name];
      return items[id];
    }

    var getIcon = function(val) {
      var icon = options.icons[val];
      if(!icon) return '';
      return '<span class="cellicon"><i class="fa fa-'+icon+'"></i></span>';
    }

    grid.setColdef(name, {
      headerFilter:options.headerFilter,
      title: options.title || grid._(name),
      width: options.width,
      formatter: function(cell) {
        var val = cell.getValue()*1;
        var icon = getIcon(val);
        return icon + getText(val);
      },
      headerFilterFunc: function(headerValue, rowValue, rowData, filterParams){
        var str = getText(rowValue).toLowerCase();
        var search = headerValue.toLowerCase();
        return str.indexOf(search) >= 0;
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
    if(options.default) grid.getPlugin('def.default')(name, options);

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
        var data = relation.relationData[id];
        if(!data) return;
        return data[col];
      }
      else if(relation) {
        if(relation === true) relation = name;
        
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
        var val = cell.getValue()+"";
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
