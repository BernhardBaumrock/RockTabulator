# RockTabulator

## A message to Russian 🇷🇺 people

If you currently live in Russia, please read [this message](https://github.com/Roave/SecurityAdvisories/blob/latest/ToRussianPeople.md).

[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

---

```
#############################################################
This module is archived and will not be developed any further
#############################################################
```

I'm working on a new version that I will release soon 😎

## Plugins

RockTabulator has its own RockTabulatorPlugins object stored as `plugins`
property of the global RockTabulator object. You can easily add plugins
to your RockTabulator by extending this object:

```
RockTabulatorPlugins.prototype.rowClicked = function(e, row) {
  console.log(e, row);
  ProcessWire.alert('Row clicked! Details logged to console');
}
```

You can easily add plugins in js files inside
`/site/modules/RockTabulator/plugins` and
`/site/assets/RockTabulator/plugins`.

You can see all available plugins in the console:

![img](https://i.imgur.com/w0Cyp4a.png)

---

--- readme TBD ! ---

--- this is just a list of notes ---

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
* buttons

## Sandbox

Todo:

* show prev/next links
* renaming/create-new feature
* add `edit on github` links
