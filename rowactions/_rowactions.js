/**
 * Extend Grid to support Rowactions
 */
$(document).on('RockTabulatorGridReady', function(event, grid) {
  /**
   * Update columns based on a colDefs array
   */
  RockTabulatorGrid.prototype.setRowactions = function(actions, options) {
    var grid = this;
    var actions = actions || ['panel', 'trash'];

    var options = options || {}
    var column = options.column || 'id';

    // count actions
    var cnt = 0;
    var rowactions = grid.rowactions || {};
    $.each(actions, function(i, action) {
      if(typeof action == "string") action = rowactions[action];
      if(action) cnt++;
    });
    
    this.setColdef(column, {
      title: '',
      width: options.width || (cnt*28+5),
      formatter: function(cell) {
        // replace tags by row values
        return grid.renderRowactions(cell, actions, {label: false});
      },
      sorter:function(a, b, aRow, bRow) {
        a = aRow.getData()[column];
        b = bRow.getData()[column];
        return a - b;
      },
    });
  }

  RockTabulatorGrid.prototype.renderRowaction = function(cell, action, options) {
    var grid = this;
    var options = options || {};

    // if the action is a string we get it from the grid
    if(typeof action == "string") action = grid.rowactions[action];
    if(typeof action != 'object') return '';

    // setup options
    var defaults = {
      label: null,
      icon: null,
    };
    var action = $.extend({}, defaults, action);

    // setup url
    var href = grid.replaceTags(action.href, cell.getRow().getData(), options.replace);
    if(options.fields) href += '&fields=' + options.fields;

    // setup class
    var cls = action.class || '';
    if(options.onHover) cls += ' show-on-hover ';

    // prepare output
    var out = '<li>';
    out += '<a href="' + href + '"';
    if(action.hover) out += 'title="'+action.hover+'"';
    out += 'data-name="' + action.name + '"';
    if(cls) out += 'class="' + cls + '">';
    if(options.icon !== false) out += '<i class="fa fa-' + action.icon + '"></i>';
    if(options.label !== false) out += action.label || '';
    out += '</a>';
    out += '</li>';

    return out;
  }

  RockTabulatorGrid.prototype.renderRowactions = function(cell, actions, options) {
    var options = options || {};
    $(cell.getElement()).addClass("rt-rowactions PageList");
    var grid = this;

    var out = '<ul class="PageListActions actions">';
    $.each(actions, function(i, action) {
      out += grid.renderRowaction(cell, action, options);
    });
    out += '</ul>'; 

    return out;
  }
});

// handle clicks on rowactions
$(document).on('click', '.RockTabulator .PageListActions a', function(e) {
  // trigger rowaction event on the link element
  var $a = $(e.target).closest('a');
  $a.trigger('rowaction.rt', [
    $a.data('name'), // name of action
    $a.closest('.RockTabulator'), // RockTabulator container
  ]);
  return false;
});
