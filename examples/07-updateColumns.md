Tabulator has no feature to UPDATE column definitions. It only has a feature to reset them. If you want Tabulator to setup your table automatically from the source data and then modify only certain properties of certain columns you need to get the current column-definitions, update the properties and then reset the table. This can be done at once via two RockTabulator methods:

```js
grid.updateColumn('col1', {foo: bar});
grid.updateColumns({
  'col1': {foo: bar},
  'col2': {foo: bar}
});
```