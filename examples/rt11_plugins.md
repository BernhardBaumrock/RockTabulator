This example was built to implement basic plugin support for RockTabulator. The
example here uses custom callback functions. If you need to share such functions
across multiple grids you can extend the RockTabulatorPlugins object:

```js
RockTabulatorPlugins.prototype.myPlugin = function(args) {
  // do something
}
```