$(document).on('rowaction.rt', function(e, name, grid) {
  if(name != 'panel') return;
  pwPanels.addPanel($(e.target));
  $(e.target).click();
});
