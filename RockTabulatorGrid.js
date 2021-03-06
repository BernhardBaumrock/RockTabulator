'use strict';

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
}

/**
 * Get JSON from PHP and set all properties of the grid
 */
RockTabulatorGrid.prototype.setDataProperties = function(data) {
  for(var prop in data) this[prop] = data[prop];
  // trigger event so that other plugins can do their work
  // eg rowactions must be converted from plain objects to Rowaction objects
  // this must happen also after each ajax request
  this.getWrapper().trigger('setDataProperties.RT', [this]);
}

/**
 * Initialize the tabulator table for this grid
 */
RockTabulatorGrid.prototype.initTable = function(config, options) {
  var config = config || {};
  var options = options || {};

  // find DOM element for current grid
  var $field = this.getInputfield();
  var $el = $field.find('.RockTabulator');
  if(!$el.length) {
    alert('init of table failed, element with class RockTabulator not found');
    return;
  }

  // save grid instance
  var grid = this;

  // rendered debounce
  var rendered = RockMarkup2.debounce(function() {
    grid.getWrapper().trigger('rendered.RT', [grid]);
  }, 100);

  // setup table config
  var defaults = {
    // Set data of the tabulator
    // We enable reactive data so that tabulator automatically updates whenever
    // the source data changes.
    reactiveData: true,
    data: grid.getTableData(),
    placeholder:grid._('no-data'),
    paginationElement: $field.find('.pagination')[0],
    
    // set columns from datasource
    autoColumns: true,

    // pagination
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: true,

    // layout
    layout:"fitColumns",

    // locale
    locale: RockTabulator.locale,
    langs: RockTabulator.langs,

    // ajax callback that is triggered after every ajax request
    ajaxResponse:function(url, params, response) {
      // check if that request is an internal request
      // if not (eg external json) we do not modify the data
      if(url != RockTabulator.url) return response;
      var data;

      // save response to grid
      grid.response = response;

      // check if response data is a tabulatorgrid data object
      if(typeof response == 'object') {
        // did we get an error?
        if(response.error) {
          UIkit.notification('Error while loading data', {status:'danger'});
          console.error(response.error);
          return grid.getTableData(); // set old data
        }

        // return data array
        if(response.type == 'sql') data = response.data;
        if(response.type == 'array') data = response.data;
        if(response.type == 'RockFinder1') {
          grid.setDataProperties(response);
          data = response.data;
        }
        if(response.type == 'RockFinder2') {
          grid.setDataProperties(response);
          data = response.data.data;
        }
      }

      if(!data) {
        UIkit.notification('Unknown type of data', {status:'danger'});
        console.warn(response);
      }

      grid.getWrapper().trigger('tableReady.RT', [grid]);
      return data || [];
    },

    // callbacks
    cellClick: function(e, cell) {
      $(grid.getWrapper()).trigger('cellClick.RT', [e, cell]);
    },

    // trigger debounced rendered callback
    renderComplete:rendered,
  }

  // load defaults?
  // if set to false you can load a completely custom tabulator
  if(options.loadDefaults !== false) config = $.extend(defaults, config);

  this.table = new Tabulator($el[0], config);
  grid.getWrapper().trigger('tableReady.RT', [grid]);
  return this.table;
}

/**
 * Get data array for the grid.
 */
RockTabulatorGrid.prototype.getTableData = function() {
  if(this.type == 'RockFinder2') return this.data.data;
  return this.data;
}

/**
 * Get data array of one column
 */
RockTabulatorGrid.prototype.pluck = function(column, options) {
  // get options
  var options = $.extend({
    filterAndSort: false,
    distinct: false,
  }, (options||{}));

  // get data of table
  var data = this.table.getData(options.filterAndSort);

  // distinct values?
  var arr = [];
  for(var i=0; i<data.length; i++) {
    var val = data[i][column];
    var exists = arr.indexOf(val) > -1;

    // if value already exists in array continue with next
    if(options.distinct && exists) continue;

    // add value to array
    arr.push(val);
  }

  return arr;
}

/**
 * Get relation data item
 */
RockTabulatorGrid.prototype.getRelationItem = function(relationname, id) {
  var rel = this.data.relations[relationname];
  if(!rel) console.warn('relation not found', relationname);
  return this.getRelationData(rel)[id];
}

/**
 * Populate relation data cache object
 */
RockTabulatorGrid.prototype.getRelationData = function(relation) {
  if(this.relationData) return this.relationData;

  if(typeof relation == 'string') {
    relation = this.data.relations[relation];
  }
  if(!relation) return [];

  // create data
  var rows = relation.data;
  var data = {}
  for(var i=0; i<rows.length; i++) {
    var row = rows[i];
    data[row.id] = row;
  }
  relation.relationData = data;
  return data;
}

/**
 * AJAX reload data of this grid
 */
RockTabulatorGrid.prototype.reload = function(options) {
  if(options === true) options = {msg: true};
  var options = options || {}

  // show reload message?
  var notify;
  if(options.msg) {
    notify = UIkit.notification("Reloading data...");
  }

  // if the grid has a custom reload function call it
  if(typeof this._reload == 'function') {
    var exit = this._reload(options);
    
    // if the custom reload function returns FALSE we continue with execution
    if(exit !== false) return;
  }

  // prepare lang
  var lang = null;
  if(ProcessWire.config.LanguageSupport) {
    lang = ProcessWire.config.LanguageSupport.language.id;
  }
  
  // setup grid variable
  var grid = this;

  // get payload for this ajax request
  // this is necessary if a grid shows only junks of data
  // eg show all entries of one year
  var payload = {
    name: grid.name, // name of the grid
    lang: lang, // language id
  }
  if(typeof grid.addPayload == 'function') payload = grid.addPayload(payload);

  // send request
  grid.table.setData(RockTabulator.url, payload, "post").then(function(response) {
    $(grid.getWrapper()).trigger('tableReady.RT', [grid]);
    if(notify) notify.close();
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
 * TODO: create setColdefs method to do multiple at once
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
  return this.lang[name] || RockTabulator._(name) || name;
}
