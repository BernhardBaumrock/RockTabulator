<?php namespace ProcessWire;
/** @var InputfieldRockTabulator $that */
?>

<script type="text/javascript">
// attach data to this tabulator instance
var grid = RockTabulator.addGrid('<?= $name ?>');
grid.setData(<?= $json ?>);
<?= $that->loadGlobalData() ?>
</script>