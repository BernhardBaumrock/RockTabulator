# RockTabulator

## Goals

* Set Data easily
  * via SQL
  * via PHP / RockFinder
  * via JS -> eg runtime tables, aggregations of other tables
  * from JSON
* Good documentation
* Events for interaction (init, draw, redraw?)
* Extendable via plugins
  * custom formatters, filters etc. in the module
  * easy for the user to add own plugins
  * plugins should be built in a way that they can be submitted as PR directly to tabulator (eg smart filter could be a good contribution)
* Support only backend
* Support only Uikit Theme
* ONE Endpoint for all operations --> RockFinder needs to return data at /admin/rockfinder/field_x AND this should also be used for executing actions (eg /field_x/addPage/?parent=123)
* easy colDef JS syntax (see example below)
* easy one-click editing of cells (eg paid today)

## Features

* column aggregations
* smart filter
* rowActions
* tooltips
* icons (like addIcons)
* buttons (like addIcons but with labels, maybe combined with icons)
* batcher (https://processwire.com/talk/topic/15524-previewdiscussion-rockdatatables/?do=findComment&comment=167165)
* action buttons (+batcher)
* ProcessModule for Preview/Debugging
* easy API to get data (get rows, cols, selections etc)
* handle "no rows" situation properly, make $('#field').trigger('reload') possible; this is necessary when you create new entries for an empty grid (where the grid does not now proper column headings, because there is no data)
* events for reloading data when panels are closed
* predefined regions to add custom UI elements (buttons, filters, notes)

## Formatters

* colored cells
* colored bars / progress bars / quota bars
* yes/no columns (https://i.imgur.com/P8Bhmfw.png)
* icons before/after aways/on hover
* currency
* date
* numbers (digits after comma)

## Syntax

Coldefs

```js
grid.getCol('mycolumn')
  .width(100)
  .header('My Heading')
  .doFoo('foo')
  .doBar('bar');
```

## Sandbox

Todo:

* show prev/next links
* renaming/create-new feature
* add `edit on github` links
