<div class="RockTabulatorWrapper">
  <div class="header uk-margin-small-bottom uk-child-width-1-2@m" uk-grid>
    <div class="gridactions"></div>
    <div class="uk-text-center uk-text-right@m">
      <span class="rows"></span>
      <span class="pagination"></span>
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