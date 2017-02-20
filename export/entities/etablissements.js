'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const getter = require('../lib/getter');
const _ = require('lodash');
const apiRoute = 'api/v1/etablissement';

module.exports = {

  export: function(etablissements, cb) {

    getter.get('adresse/ville', function(err, villes) {
      if (err) { return cb(err); }

      getter.get('adresse/province', function(err, provinces) {
        if (err) { return cb(err); }

        getter.get('commission-scolaire', function(err, commissions) {
          if (err) { return cb(err); }

          getter.get('etablissement-type', function(err, types) {
            if (err) { return cb(err); }

            // getter.get('adresse/telephone', function(err, telephones) {
            //   if (err) { return cb(err); }

            etablissements = _.map(_.flatten(etablissements), function(etablissement) {

              var adresse = etablissement.address;
              var city = _.find(villes, adresse.city);
              if (!city) {
                console.error('Ville manquante ou erronée : ' + adresse.city);
              }
              adresse.city = city;

              var province = _.find(provinces, adresse.province);
              if (!province) {
                console.error('Province manquante : ' + adresse.province);
              }
              adresse.province = province;

              if (etablissement.commissionScolaire) {
                var commission = _.find(commissions, etablissement.commissionScolaire);
                if (!commission) {
                  console.error('Commission scolaire manquante : ' + etablissement.commissionScolaire);
                }
                etablissement.commissionScolaire = commission;
              }

              var type = _.find(types, etablissement.type);
              if (!type) {
                console.error('Type manquant : ' + etablissement.type);
              }
              etablissement.type = type;

              // etablissement.telephones = _.map(etablissement.telephones, function(tel) {
              //   var result = _.find(telephones, tel);
              //   if (!result) {
              //     console.error('Téléphone manquant : ' + JSON.stringify(tel));
              //     return undefined;
              //   }
              //
              //   return result._id;
              // });

              return etablissement;
            });

            exporter.send(apiRoute, etablissements, cb);
            // });
          });
        });
      });
    });
  }

};
