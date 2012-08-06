# Skeletron - WORK IN PROGRESS

Copy a template directory to a desired destination parsing the content of each file with handlebars.


## Example

```javascript
var skeletron = require('skeletron');

var data = {
  name: 'widgetName',
  version: '0.0.1',
  dependencies:{
    'widget': '>0.2',
    'widget2': '=0.1.x'
  },
  css: ['main.css', 'main2.css'],
  html: ['template.html', 'template2.html']
}

var cb = function (finder) {
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

skeletron({
  skel: __dirname + '/skel',
  dest: __dirname + "/widget",
  data: data,
  mode: '0777',
  followLinks: true
}, cb);

```

Every file in the skel tree can be a handlebar template. It is possible to define helpers trough ```this.Handlebars```:

```
var hb = require('skeletron').Handlebars;
hb.registerHelper('helperName', function(items, options) {
  ...
});
```

## License
MIT