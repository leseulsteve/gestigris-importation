'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/commission-scolaire';
const _ = require('lodash');

module.exports = {

  export: function(cb) {
    dataReader.get('commissionsScolaires', function(err, results) {
      if (err) { return cb(err); }
      exporter.send(apiRoute, _.flatten(results), cb);
    });
  }

};
