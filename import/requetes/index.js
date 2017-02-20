'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  get: function(requeteName) {
    var requetePath = path.join('.', 'import', 'requetes', 'sql', requeteName + '.sql');
    return fs.readFileSync(requetePath, 'utf-8');
  }
};
