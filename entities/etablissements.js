'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = '/api/v1/etablissement',
  getter = require('../lib/getter'),
  _ = require('lodash');

var telephones = [];

function getVille(current, tout) {
  
}

function getComissionScolaire(current, tout) {
    return _.find(tout, ['name', current]);
}

module.exports = {

  export: function (cb) {
    dataReader.get('etablissements', function (err, results) {
      if (err) {
        return cb(err);
      }

      getter.get('adresse/ville', function(err, villes) {

          getter.get('adresse/comission-scolaire', function(err, commissions) {

            for (var i; i  < results.length; i++) {
              var etab = {
                name: results[i].name,
                type:,
                address: {
                  street: results[i].street,
                  commissionScolaire: getComissionScolaire(results[i].comission, commissions),
                  city: getVille(results[i].city, villes),
                  province: '5803904db56fe30958573fc5',
                  postalCode: results[i].postalCode,
                }

                telephone:,
                coordinates: {
                  lat: results[i].lat,
                  long: results[i].long,
                }
                osmId: null,
                osmType: null,
                placeId: null,
                placeType: null,
                notes: {
                  admin: results[i].notes,
                  public: null
                }
              };

            }

          });
      })




      var etablissements = [];


      // exporter.send(apiRoute, etablissements, cb);
    });
  }
};
