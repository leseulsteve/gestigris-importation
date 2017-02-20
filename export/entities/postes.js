'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/poste';
const _ = require('lodash');

module.exports = {

  export: function(postes, cb) {
    exporter.send(apiRoute, postes, cb);
  }

};
