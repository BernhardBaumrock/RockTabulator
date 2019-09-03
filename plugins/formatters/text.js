/**
 * Basic custom formatters for RockTabulator
 */
Tabulator.prototype.extendModule("format", "formatters", {
  'rt-bold':function(cell, formatterParams){
    $(cell.getElement()).addClass("uk-text-bold");
    return cell.getValue();
  },
  'rt-upper':function(cell, formatterParams){
      return cell.getValue().toUpperCase(); //make the contents of the cell uppercase
  }
});
