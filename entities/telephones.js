'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/adresse/telephone',
  _ = require('lodash');

  module.exports = {
    export: function (cb) {
        dataReader.get('telephones', function(err, telephones) {
          if (err) {
            cb(err);
          }

          exporter.send(apiRoute, _.flatten(telephones), cb);
        });
    }
  };
