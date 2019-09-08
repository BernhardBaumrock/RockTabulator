'use strict';
$(document).on('rowaction.RT', function(e, name, grid) {
  if(name != 'trash') return;

  var $a = $(e.target).closest('a'); // link element
  var grid = RockTabulator.getGrid(e.target);
  var action = grid.rowactions[name];
  var rowElement = $(e.target).closest('.tabulator-row')[0];
  var row = grid.table.getRow(rowElement);
  var msg = grid.replaceTags(action.confirm, row.getData());
  var spinner = '<i class="fa fa-spin fa-spinner"></i> ';
  var check = '<i class="fa fa-check"></i> ';

  UIkit.modal.confirm(msg).then(function() {
    // on confirm
    var status = UIkit.notification(
      spinner+'Executing action "' + name + '"',
      {timeout: 0},
    );
    RockTabulator.post({
      url: grid.replaceTags(action.href, row.getData()),
      name: grid.name,
      done: function(result) {
        // check type json
        if(!result || typeof result != 'object') {
          UIkit.modal.alert("Wrong response type (JSON required)");
          return;
        }

        // error message?
        if(result.error) {
          UIkit.notification(result.error, {status:'danger'});
          console.error(result.error);
          return;
        }

        // success
        UIkit.notification(check + result.success, {timeout: 3000});
        grid.reload();
      },
      error: function(data) {
        UIkit.notification('AJAX error', {status:'danger'});
        console.error(data);
      },
      always: function() {
        status.close();
      },
    });
  },
  function(){}
  );
});
