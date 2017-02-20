'use strict';

const data = require('../lib/data-reader');
const db = require('../lib/getter');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/benevole';
const _ = require('lodash');

module.exports = {

  export: function(benevoles, cb) {

    db.get('benevole-role', function(err, roles) {
      if (err) { return cb(err); }

      // db.get('adresse/telephone', function(err, telephones) {
      //   if (err) { return cb(err); }

      benevoles = _.map(_.flatten(benevoles), function(benevole) {
        var role = _.find(roles, benevole.role);
        if (!role) {
          console.error('Code de rôle erroné : ' + benevole.role);
        }
        benevole.role = role._id;

        // benevole.telephones = _.map(benevole.telephones, function(telephone) {
        //   var result = _.find(telephones, telephone);
        //   if (!result) {
        //     console.error('Téléphone manquant : ' + JSON.stringify(telephone));
        //     return undefined;
        //   }
        //   return result._id;
        // });

        return benevole;
      });

      exporter.send(apiRoute, benevoles, cb);
      // });
    });
  }

};
