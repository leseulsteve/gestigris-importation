'use strict';

const villes = require('../ville.json');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/adresse/ville';

module.exports = {

  export: function(cb) {
    exporter.send(apiRoute, villes.map(function(ville) {
      return {
        name: ville
      };
    }), cb);
  }

};
