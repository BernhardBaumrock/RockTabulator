Multilanguage in grids need two aspects:

* Translations in the data
* Translations in the GUI

### Translations of data

In this example the data is handled by RockFinder1 which supports multilanguage and therefore requests data in the language that is active for the current user. Try the language switcher in the top menu.

### Translations of GUI elements

Translations for the GUI can be needed either `globally` (for globally available elements like rows, page size, etc) or for a `single grid` (for column headings etc).

Make sure to always use `grid._('yourTranslation')` to make sure that a non-existant translation does not break the execution of your grid. This will also make sure that RockTabulator will try to find the global translation if a translation for this special grid does not exist. This can be handy for defining translations that are used across several grids.

First set the locale mappings. They link ProcessWire language names to Tabulator locales:

![img](https://i.imgur.com/zaZ1aSp.png)

Then translate your files via the PW Translation System: [open translation gui for _langs-php](/tabulator/setup/language-translator/edit/?language_id=1245&textdomain=site--modules--fieldtyperocktabulator--_langs-php)

![img](https://i.imgur.com/W9fVal2.png)

Local translations for one single grid are defined in the PHP file of the grid and also translated via the PW GUI. Here is the result:

![img](https://i.imgur.com/UHct4M7.png)

Global translations can be added via hook:

```php
// site/ready.php
$this->addHookAfter("InputfieldRockTabulator::getTranslations", function(HookEvent $event) {
  $langs = $event->return;
  $langs['foo'] = 'bar';
  $event->return = $langs;
});
```

The translation is then available in the `RockTabulator.langs` object:

![img](https://i.imgur.com/ICzdZ7s.png)

It can be accessed via the RockTabulator translation methods:

```js
grid._('stringName'); // request local translation
RockTabulator._('stringName'); // request global translation
```

This example logs `grid._('foo')` to the console (open console to see the output).
