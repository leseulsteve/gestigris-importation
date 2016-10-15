'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/etablissement-type';

module.exports = {

    export: function (cb) {
        dataReader.get('etablissement-type', function (err, results) {
            if (err) {
              return cb(err);
            }

            var resultsTypes = results[0];
            var etabTypes = [];

            for (var i = 0; i < resultsTypes.length; i++) {
              if (resultsTypes[i]) {
                etabTypes.push({
                  name: resultsTypes[i]
                });
              }
            }

            exporter.send(apiRoute, etabTypes, cb);
          });
        }
};
