<div class="RockTabulatorWrapper">
  <div class="header uk-margin-small-bottom uk-child-width-1-2@m" uk-grid>
    <div class="uk-text-center uk-text-left@m">
      <span class="pagination"></span>
      <span class="rowcount"></span>
    </div>
    <div class="gridactions uk-text-right@m"></div>
  </div>
  <div class="RockTabulator">
    <?php
    // this will add the grid to the RockTabulator object
    // the init tag will then be removed automatically from the DOM
    echo $tabulator->initTag();
    ?>
  </div>
</div>