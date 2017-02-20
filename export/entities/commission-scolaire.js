'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/commission-scolaire';
const _ = require('lodash');

module.exports = {

  export: function(cs, cb) {
    exporter.send(apiRoute, cs, cb);
  }

};
