'use strict';

var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  getter = require('../lib/getter'),
  _ = require('lodash'),
  apiRoute = 'api/v1/etablissement';

function getIDForName(nom, entities) {
  var result = _.find(entities, ['name', nom]);
  if (result) { return result._id; }
  else { return undefined; }
}

function getVilleID(nom, villes) {
  var id = getIDForName(nom, villes);
  if (!id) {
    console.log("Cette ville: " + nom + " ne figure pas dans la liste !");
    return undefined;
  }

  return id;
}


module.exports = {

  export: function (cb) {
    dataReader.get('etablissements', function (err, etablissements) {
      if (err) {
        return cb(err);
      }

      getter.get('adresse/ville', function (err, villes) {
        if (err) {
          return cb(err);
        }

        getter.get('adresse/province', function (err, provinces) {
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

              getter.get('adresse/telephone', function (err, telephones) {
                if (err) {
                  return cb(err);
                }

                etablissements = _.map(etablissements, function (etab) {
                  if (etab.address) {
                    etab.address.city = getVilleID(etab.address.city, villes);
                    etab.address.province = getIDForName(etab.address.province, provinces);
                  }

                  etab.commissionScolaire = getIDForName(etab.commissionScolaire, commissions);

                  etab.type = getIDForName(etab.type, types);

                  etab.telephones = _.map(etab.telephones, function (tel) {
                    var result = _.find(telephones, tel);
                    if (result) { return result._id; }
                    else { return undefined; }
                  });
                  return etab;
                });

                exporter.send(apiRoute, etablissements, cb);
              });
            });
          });
        });
      });
    });
  }
};
