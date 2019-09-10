'use strict';
$(document).on('rowaction.RT', function(e, name, container) {
  if(name != 'panel') return;

  // init panel
  pwPanels.addPanel($(e.target));

  // add the action name to the panel
  var qty = pwPanels.qty;
  var id = '#pw-panel-container-'+qty;
  var $panel = $(id);
  $panel.data('rowaction', $(e.target));

  // open panel
  $(e.target).click();
});
