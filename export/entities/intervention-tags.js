'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/intervention-tag';
const _ = require('lodash');

module.exports = {

  export: function(tags, cb) {
    exporter.send(apiRoute, tags, cb);
  }

};
