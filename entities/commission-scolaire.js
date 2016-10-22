'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/commission-scolaire',
  _ = require('lodash');

module.exports = {

  export: function (cb) {
    dataReader.get('commissionsScolaires', function (err, results) {
      if (err) {
        return cb(err);
      }

      exporter.send(apiRoute, _.flatten(results), cb);
    })
  }
};
