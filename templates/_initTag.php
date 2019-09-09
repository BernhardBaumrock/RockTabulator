<?php namespace ProcessWire;
/**
 * Load the init script tag for this grid.
 * 
 * We wait for the document to load so that all columns can be calculated
 * correctly. If we did that earlier we would have to do a redraw() later to
 * take scrollbars (decreasing screen with) into account.
 */
?>
<i class="fa fa-spin fa-spinner"></i>
<script>
(function() {
  var init = function() { RockTabulator.initGrid('<?= $id ?>', <?= $json ?>); }
  $(document).ajaxComplete(function() { init() }); // ajax inputfield
  $(window).load(function() { init() }); // opened inputfield
})();
</script>
