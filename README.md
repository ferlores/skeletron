# Skeletron - WORK IN PROGRESS

Imagine you have to create a bunch of config files based on some data, skeletron can do this for you! 
It copy a directory tree to a desired destination parsing the content of each file with [handlebars](https://github.com/wycats/handlebars.js).

## Example

```javascript
var skeletron = require('skeletron');

var data = {
  name: 'moduleName',
  version: '0.0.1',
  dependencies:{
    'module': '>0.2',
    'module2': '=0.1.x'
  }
}

skeletron({
  src: __dirname + '/skel',
  dest: __dirname + "/component",
  data: data
});
```

## skeletron(opts, callback)
The first argument is an options object with the following keys:
* ```src```: directory with the templates. Required
* ```dest```: destination where to copy the files (skeletron creates it). Required 
* ```data```: the data that feeds the templates. Required
* ```mode```: permisions for the new files. Optional. Default ```0755```
* ```followLinks```: follow symlinks. Optional. Default ```true```

The callback argument is called with a [finder](https://github.com/substack/node-findit/) object:
```javascript
var callback = function (finder) {
  finder.on('directory', function (dir, stat) {
    console.log(dir);
  });

  finder.on('file', function (file, stat) {
    console.log(file);
  });

  finder.on('link', function (link, stat) {
    console.log(link);
  });
}
```

## Templates
Every file in the src tree is treated as a handlebar template. The path to the files can also have handlebar tags:
```
src/{{version}}/{{name}}.js => src/0.0.1/moduleName.js
```  

## Helpers
It is also possible to define helpers trough ```this.Handlebars```:
```
var hb = require('skeletron').Handlebars;
hb.registerHelper('helperName', function(items, options) {
  ...
});
```

## Install
``` 
npm install skeletron
```

## License
MIT