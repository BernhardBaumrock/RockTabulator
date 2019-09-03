$(document).on('loaded', '.RockMarkup2[data-name=rt11_plugins]', function() {
  var RT = RockTabulator;

  /**
   * Show row actions (show, edit, trash)
   */
  var addRowactions = function(table, options) {
    var defaults = {
      // name of column that holds the data for the actions id
      // by default we use the ID column
      col: 'id',

      // replace by the new one or show both?
      replace: true,

      title: null,
    }
    var options = $.extend(defaults, options || {});

    // add column
    table.addColumn({
      title: options.title,
      width: options.width || 100,
      formatter: function(cell) {
        $(cell.getElement()).addClass("rt-rowactions PageList");
        var out = '<ul class="PageListActions actions">';
        out += '<li><a href="#" class="pw-panel pw-panel-reload"><i class="fa fa-search"></i></a></li>';
        out += '<li><a href="#" class="pw-panel pw-panel-reload"><i class="fa fa-trash"></i></a></li>';
        out += '<li><a href="#" class="pw-panel pw-panel-reload"><i class="fa fa-spinner fa-spin"></i></a></li>';
        out += '<li><a href="#" class="pw-panel pw-panel-reload"><i class="fa fa-edit"></i> Edit</a></li>';
        out += '<li><a href="#" class="pw-panel pw-panel-reload">Edit</a></li>';
        out += '</ul>'; 
        return out;
      },
      sorter:function(a, b, aRow, bRow) {
        a = aRow.getData()[options.col];
        b = bRow.getData()[options.col];
        return a - b;
      },
    });

    // move column to the left
    var columns = table.getColumns();
    var col = columns[columns.length-1];
    col.move(columns[0]);

    if(options.replace) table.deleteColumn(options.col);
  }

  /**
   * Show an alert when a row is clicked
   */
  var rowClicked = function(e, row) {
    // did the user click on a link?
    if($(e.target).closest('a').length) return;

    console.log(e, row);
    ProcessWire.alert('Row clicked! Details logged to console');
  }

  /**
   * Handle clicks on rowaction links
   */
  $(document).on('click', '.RockTabulator .rt-rowactions a', function(e) {
    alert('rowaction clicked');
    return false; // prevent scroll
  });

  // init the grid
  RT.init(this, {
    afterInit: function(grid) {
      var table = grid.table;
  
      // update column definitions
      // see http://tabulator.info/docs/4.4/columns#manipulation
      // add column after id column (empty)
      table.addColumn({title:"js-column", field:"js-col"}, false, "id");
  
      // add a custom JS based dynamic column
      table.addColumn({title:"test", formatter: function(cell) {
        var data = cell.getRow().getData();
        return "ID is: " + data.id;
      }, sorter:function(a, b, aRow, bRow) {
        // sorting string "ID is: ..." is not possible
        // we setup a custom sorter that is based on the ID data property
        a = aRow.getData().id;
        b = bRow.getData().id;
        return a - b;
      }});
  
      // hide path column
      table.hideColumn('path');
  
      addRowactions(table, {
        col: 'bar',
        replace: false,
        width: 175,
      });
    },

    // grid config
    config: {
      // The rowClick event is fired by tabulator every time a row is clicked.
      // Here we apply a callback that is stored in the RockTabulator object.
      // So we are using built-in tabulator features and applying custom functionality.
      rowClick: rowClicked,
    },
  });
});
