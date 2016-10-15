'use strict';

var villes = require('../data/ville.json'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/adresse/ville';

module.exports = {
  export: function (cb) {
      exporter.send(apiRoute, villes.map(function(ville) {
       return {
          name: ville
       };
     }), cb);
    }
  };
