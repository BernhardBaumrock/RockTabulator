<div class="RockTabulatorWrapper">
  <div class="loading">
    <div class="uk-flex uk-flex-middle uk-flex-center uk-height-1-1">
      <div><i class="fa fa-spin fa-spinner"></i></div>
    </div>
  </div>
  <div class="RockTabulator">
    <?php
    // this will add the grid to the RockTabulator object
    // the init tag will then be removed automatically from the DOM
    echo $tabulator->initTag();
    ?>
  </div>
</div>