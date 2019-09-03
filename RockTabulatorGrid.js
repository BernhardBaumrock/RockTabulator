/**
 * Rocktabulator Grid Class
 */
function RockTabulatorGrid(name) {
  // name of the grid
  this.name = name;

  // data of the grid
  this.data = [];

  // the tabulator instance
  this.table = null;

  // how often was this grid rendered?
  // important for ajax init callbacks
  this.rendered = 0;
}

/**
 * Get JSON from PHP and set all properties of the grid
 */
RockTabulatorGrid.prototype.setDataProperties = function(data) {
  for(prop in data) this[prop] = data[prop];
}

/**
 * AJAX reload data of this grid
 */
RockTabulatorGrid.prototype.reload = function() {
  var spinner = '<i class="fa fa-spin fa-spinner"></i> ';
  var loading = UIkit.notification(spinner+'Reloading grid...', {timeout: 0});
  this.table.replaceData()
  .then(function(){
    loading.close();
  })
  .catch(function(error){
    UIkit.notification(error, {status:'danger'});
  });
}

/**
 * Update a single column
 */
RockTabulatorGrid.prototype.updateColumn = function(name, def, instant = true) {
  // get current coldefs
  var current = this.table.getColumnDefinitions();
  var old = this.table.columnManager.findColumn(name);
  old.definition = $.extend(old.definition, def);

  // merge new coldefs
  if(instant) this.table.setColumns(current);
}

/**
 * Update columns based on a colDefs array
 */
RockTabulatorGrid.prototype.updateColumns = function(colDefs) {
  // get current coldefs
  var current = this.table.getColumnDefinitions();

  // loop all new definitions and update old colDefs
  for(var key in colDefs) {
    this.updateColumn(key, colDefs[key], false);
  }

  // merge new coldefs
  this.table.setColumns(current);
}

/**
 * Get dom element of inputfield
 */
RockTabulatorGrid.prototype.getInputfield = function() {
  return $('#Inputfield_'+this.name);
}

/**
 * Get dom element of inputfield
 */
RockTabulatorGrid.prototype.getWrapper = function() {
  return this.getInputfield().find('.RockTabulatorWrapper');
}

/**
 * Set new coldef for column
 */
RockTabulatorGrid.prototype.setColdef = function(column, newColdef, replace) {
  var replace = replace || false;

  // get column definitions
  var coldefs = this.table.getColumnDefinitions();
  $.each(coldefs, function(i, oldColdef) {
    if(oldColdef.field != column) return;

    // we found the right coldef!
    if(replace) coldefs[i] = newColdef;
    else {
      for(var prop in newColdef) coldefs[i][prop] = newColdef[prop];
    }
  });
  this.table.setColumns(coldefs);
}

/**
 * Replace url tags by data values
 */
RockTabulatorGrid.prototype.replaceTags = function(string, data, tags) {
  var string = string || '#';
  var tags = tags || {};
  const regex = /\{.*?\}/gm;
  let m;

  while ((m = regex.exec(string)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if(m.index === regex.lastIndex) regex.lastIndex++;
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      var col = match.replace('{', '').replace('}', '');
      // if column was set manually get the set column name
      if(tags[col]) col = tags[col];
      string = string.replace(match, data[col]);
    });
  }
  
  return string;
}

/**
 * Get translation value
 * 
 * Using this function makes sure the grid does not break when a translation
 * is not available. If a single translation does not exist for the current grid
 * it looks in the global translations object
 */
RockTabulatorGrid.prototype._ = function(name) {
  return this.lang[name] || RockTabulator._(name);
}

