var fs = require('fs');

module.exports = function (opts, callback) {
  var skel = opts.skel,
      destination = opts.dest,
      data = opts.data,
      mode = opts.mode,
      followLinks = opts.followLinks || false;

  var hb = this.Handlebars = require('handlebars');

  var cb = function (err) { 
    if (typeof callback === 'undefined') throw err;
    callback.apply(null, arguments); 
  }

  fs.mkdir(destination, mode, function (err) {
    if (err) cb(err); 
    
    var finder = require('findit').find(skel);

    var processFile = function (file, stat) {
      fs.readFile(file, function (err, content) {
        var dest = file.replace(skel, destination),
            templateName = hb.compile(dest),
            templateContent = hb.compile(content.toString('utf8'));

        fs.writeFile(templateName(data), templateContent(data));

      });
    }

    finder.on('file', processFile);

    if (opts.followLinks) {
      finder.on('link', processFile); 
    }

    finder.on('directory', function (dir, stat) {
      var dest = dir.replace(skel, destination);
      fs.mkdirSync(dest, mode);
    });

    if (typeof callback === 'function') callback(finder);
  }); 
}
