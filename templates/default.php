<div class="RockTabulatorWrapper">
  <div class="top uk-hidden">
    <div class="filter uk-margin-small-bottom"><?= $tabulator->topMarkup() ?></div>
    <div class="header uk-margin-small-bottom" uk-grid>
      <div class="uk-width-1-1 uk-width-expand@m uk-text-center uk-text-left@m">
        <span class="pagination"></span>
        <span class="rowcount"></span>
      </div>
      <div class="uk-width-1-1 uk-width-auto@m gridactions uk-text-right@m"></div>
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
