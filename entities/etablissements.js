'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  getter = require('../lib/getter'),
  _ = require('lodash'),
  apiRoute = 'api/v1/etablissement';

function getVille(current, tout) {
  var ville = getEntityNamed(current, tout);

  if (!ville) {
    switch (current) {
    case 'Ancienne-Lorette':
      ville = getEntityNamed("L'Ancienne-Lorette", tout);
      break;
    case 'St-Augustin':
      ville = getEntityNamed('Saint-Augustin-de-Desmaures', tout);
      break;
    case 'St-Marc-des-Carrières':
      ville = getEntityNamed('Saint-Marc-des-Carrières', tout);
      break;
    case 'Chicoutimi':
      ville = getEntityNamed('Saguenay', tout);
      break;
    case 'St-Gabriel-de-Valcartier ':
      ville = getEntityNamed('Saint-Gabriel-de-Valcartier', tout);
      break;
    case 'Sainte-Catherine de la Jacques-Cartier':
    case 'Sainte-Catherine-de-la-Jacques-Cartier ':
      ville = getEntityNamed('Sainte-Catherine-de-la-Jacques-Cartier', tout);
      break;
    case 'Val-Bélair':
    case 'Québec (Sainte-Foy-Sillery-Cap-Rouge)':
      ville = getEntityNamed('Québec', tout);
    break;
    default:
      console.log('VILLE INCONNUE:\n IL MANQUE PEUT-ÊTRE UNE EXCEPTION DANS /entities/etablissements.js' );
    }
  }

  return ville;
}

function getEntityNamed(current, tout) {
  return _.find(tout, ['name', current]);
}

module.exports = {

  export: function (cb) {
    dataReader.get('etablissements', function (err, results) {
      if (err) {
        return cb(err);
      }

      getter.get('adresse/ville', function (err, villes) {
        if (err) {
          return cb(err);
        }

        getter.get('adresse/province', function (err, province) {
          if (err) {
            return cb(err);
          }

          getter.get('commission-scolaire', function (err, commissions) {
            if (err) {
              return cb(err);
            }

            getter.get('etablissement-type', function (err, types) {
              if (err) {
                return cb(err);
              }

              results = _.map(results, function (etab) {
                var v = getVille(etab.city, villes);
                var p = getEntityNamed('Québec', province);
                var cs = getEntityNamed(etab.commissionScolaire, commissions);
                var et = getEntityNamed(etab.etablissementType, types);
                var phn = etab.phoneNumbers;

                return {
                  name: etab.name,
                  type: et._id,
                  address: {
                    street: etab.street,
                    commissionScolaire: cs ? cs._id : null,
                    city: v._id,
                    province: p._id,
                    postalCode: etab.postalCode,
                  },
                  telephone: phn ? phn[0].number : null,
                  coordinates: {
                    lat: etab.lat,
                    long: etab.lon,
                  },
                  osmId: null,
                  osmType: null,
                  placeId: null,
                  placeType: null,
                  notes: {
                    admin: etab.notes,
                    public: null
                  }
                }
              });

              exporter.send(apiRoute, results, cb);
            });
          });
        });
      });
    });
  }
};
