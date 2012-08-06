var skeletron = require('../index.js');

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
  mode: '0777'
}, cb);
