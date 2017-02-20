'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/etablissement-type';
const _ = require('lodash');

module.exports = {

  export: function(types, cb) {
    exporter.send(apiRoute, types, cb);
  }
};
