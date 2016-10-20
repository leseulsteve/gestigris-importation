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

      results = _.filter(_.flatten(results), function (cs) {
        return (cs.name != 'NA') && (cs.name != 'N/A');
      });

      exporter.send(apiRoute, results, cb);
    })
  }
};
