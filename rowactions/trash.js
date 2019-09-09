'use strict';
$(document).on('rowaction.RT', function(e, name, row, grid) {
  if(name != 'trash') return;

  var action = grid.getRowaction(name);
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
