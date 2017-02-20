'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/adresse/telephone';
const _ = require('lodash');

module.exports = {

  export: function(telephones, cb) {
    exporter.send(apiRoute, telephones, cb);
  }

};
