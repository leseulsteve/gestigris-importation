'use strict';

var dataReader = require('../lib/data-reader'),
  getter = require('../lib/getter'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/benevole',
  _ = require('lodash');

function getRoleID(code, roles, warn) {
  var role = _.find(roles, ['code', code]);

  if (role) {
    return role._id;
  } else if (warn) {
    console.log('Code inconnu : ' + code);
  }

  return undefined;
}

module.exports = {

  export: function (cb) {
    dataReader.get('users', function (err, benevoles) {
      if (err) { return cb(err); }

      getter.get('benevole-role', function (err, roles) {
        if (err) { return cb(err); }

        getter.get('adresse/telephone', function (err, telephones) {
          if (err) { return cb(err); }

          benevoles = _.map(benevoles, function (benevole) {

            benevole.role = getRoleID(benevole.role, roles, true);

            benevole.telephones = _.map(benevole.telephones, function (tel) {
              var result = _.find(telephones, tel);
              if (result) { return result._id; }
              else { return undefined; }
            });

            return benevole;
          });

          exporter.send(apiRoute, benevoles, cb);
        });
      });
    });
  }
};
