/**
 * Extend Grid to support Rowactions
 */
$(document).on('gridReady.RT', function(event, grid) {
  
  /**
   * Setup Rowaction class
   * @param {object} data
   */
  class Rowaction {
    constructor(data) {
      this.grid = grid;
      // set all properties of this action
      for (var prop in data) this[prop] = data[prop];
    }
  }
  /**
   * Add a new rowaction to this grid
   */
  RockTabulatorGrid.prototype.addRowaction = function(name) {
    var exists = this.getRowaction(name);
    if(exists) return exists;

    var action = new Rowaction({
      name: name,
    });

    this.rowactions[name] = action;
  }

  /**
   * Render this action
   */
  Rowaction.prototype.render = function(cell, options) {
    var action = this;
    var grid = action.grid;
    var options = options || {};

    // setup options
    var action = $.extend({}, action, options);

    // setup url
    var href = action.href;
    if(cell) href = grid.replaceTags(action.href, cell.getRow().getData(), action.replace);
    if(action.fields) href += '&fields=' + action.fields;

    // setup class
    var cls = 'uk-background-primary';

    // add classes set by PHP $action->addClass('foo bar')
    if(action.class) cls += ' ' + action.class;

    // prepare output
    var out = '<span class="rt-rowaction">';
    out += '<a href="' + href + '"';
    if(action.hover) out += 'title="'+action.hover+'"';
    if(action.name) out += 'data-name="' + action.name + '"';
    out += 'class="' + cls + '"';
    out += '>';
    if(action.icon) out += '<i class="fa fa-' + action.icon + '"></i>';
    if(action.label) out += '<span class="label">' + action.label + '</span>' || '';
    out += '</a>';
    out += '</span>';

    return out;
  }

  /**
   * Init rowactions
   */
  RockTabulatorGrid.prototype.initRowactions = function() {
    var grid = this;
    // initialize all actions
    for(var name in grid.rowactions) {
      var data = grid.rowactions[name];
      var action = new Rowaction(data);
      grid.rowactions[name] = action;
    }
  }
  
  /**
   * init rowactions and add event listener to init them after each ajax request
   */
  grid.initRowactions();
  $(document).on('setDataProperties.RT', function(e, grid) {
    grid.initRowactions();
  });

  /**
   * Get rowaction by name
   */
  RockTabulatorGrid.prototype.getRowaction = function(data) {
    if(!data) return new Rowaction();
    if(typeof data == 'object') return new Rowaction(data);
    if(this.rowactions[data]) return this.rowactions[data];
    return false;
  }

  /**
   * Update columns based on a colDefs array
   */
  RockTabulatorGrid.prototype.setRowactions = function(actions, options) {
    var grid = this
    var actions = actions || ['panel', 'trash']
    var options = options || {}
    var column = options.column || 'id'

    // count actions
    var cnt = 0;
    var rowactions = grid.rowactions || {};
    $.each(actions, function(i, action) {
      if(typeof action == "string") action = rowactions[action];
      if(action) cnt++;
    });
    
    grid.setColdef(column, {
      title: '',
      width: options.width || (cnt*28+5),
      formatter: function(cell) {
        // replace tags by row values
        var out = '';
        for(var i=0; i<actions.length; i++) {
          var action = grid.getRowaction(actions[i]);
          if(action) out += action.render(cell, {label: false});
        }
        return out;
      },
      sorter:function(a, b, aRow, bRow) {
        a = aRow.getData()[column];
        b = bRow.getData()[column];
        return a - b;
      },
    });
  }
});

// handle clicks on rowactions
$(document).on('click', '.rt-rowaction a', function(e) {
  // trigger rowaction event on the link element
  var $a = $(e.target).closest('a');

  var grid = RockTabulator.getGrid(e.target);
  var rowElement = $(e.target).closest('.tabulator-row')[0];
  var row = grid.table.getRow(rowElement);

  $a.trigger('rowaction.RT', [
    $a.data('name'), // name of action
    row,
    grid,
  ]);
  return false;
});
