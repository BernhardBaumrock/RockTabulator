
// only for superusers
if(ProcessWire.config.roles.indexOf('superuser') > -1) {
  // show name of tabulator on hover of label
  $(document).on('mouseover', 'li.InputfieldRockTabulator label.InputfieldHeader:not([title])', function() {
    var $label = $(this);
    var $li = $label.closest('li');
    $label.attr('title', "Tabulator grid name: " + $li.data('name'));
  });
}
