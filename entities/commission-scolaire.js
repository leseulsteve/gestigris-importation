'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/commission-scolaire';

module.exports = {

  export: function (cb) {
    dataReader.get('commission-scolaire', function (err, results) {
      if (err) {
        return cb(err);
      }

      var results = results[0];
      var csList = [];

      results.forEach(function(cs) {
        if (cs && (cs !== 'N/A') && (cs !== 'NA'))  {
          csList.push({
            name: cs
          });
        }
      });

      exporter.send(apiRoute, csList, cb);
    })
  }
};
