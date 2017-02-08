'use strict';

var exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/adresse/province';

module.exports = {
  export: function (cb) {
      exporter.send(apiRoute, [{name: 'Québec', id: 'ugh'}], cb);
    }
  };
