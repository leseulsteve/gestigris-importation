'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/poste';
const _ = require('lodash');

module.exports = {

  export: function(cb) {
    dataReader.get('postes', function(err, results) {
      if (err) { return cb(err); }
      exporter.send(apiRoute, _.flatten(results), cb);
    });
  }
};
