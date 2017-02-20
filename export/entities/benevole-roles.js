'use strict';

const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/benevole-role';

module.exports = {
  export: function(cb) {
    var roles = [
      {
        description: 'Observateur',
        code: 0
        },
      {
        description: 'Intervenant',
        code: 1
        },
      {
        description: 'Expérimenté',
        code: 2
        }];
    exporter.send(apiRoute, roles, cb);
  }
};
