'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/etablissement-type',
  _ = require('lodash');

module.exports = {

  export: function (cb) {
    dataReader.get('etablissementTypes', function (err, results) {
      if (err) {
        return cb(err);
      }

      exporter.send(apiRoute, _.flatten(results), cb);
    });
  }
};
