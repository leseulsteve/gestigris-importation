'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/adresse/telephone';
const _ = require('lodash');

module.exports = {

  export: function(cb) {
    dataReader.get('telephones', function(err, telephones) {
      if (err) { return cb(err); }
      exporter.send(apiRoute, _.flatten(telephones), cb);
    });
  }

};
