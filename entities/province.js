'use strict';

const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/adresse/province';

module.exports = {
  export: function(cb) {
    exporter.send(apiRoute, [{ name: 'Québec' }], cb);
  }

};
