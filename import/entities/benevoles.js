const mysql = require('mysql');
const _ = require('lodash');
const writer = require('../lib/data-writer');
const telGetter = require('../lib/telephones-getter');
const login = require('../lib/login');
const requetes = require('../requetes');


module.exports = {

  import: function(cb) {
    try {
      var requeteBenevoles = requetes.get('benevoles');
      var requeteLangues = requetes.get('benevole-langues');
    } catch (e) {
      return cb(e);
    }


    telGetter.get('benevoles', function(err, numeros) {
      if (err) { return cb(err); }

      var benevoles;
      var langues;

      var sql_err;
      var connection = mysql.createConnection(login);

      connection.query(requeteBenevoles, function(err, results) {
        if (err) {
          sql_err = err;
          return;
        }

        benevoles = results;
      });

      connection.query(requeteLangues, function(err, results) {
        if (err) {
          sql_err = err;
          return;
        }

        langues = _.groupBy(results, 'profile_id');
      });

      connection.end(function(err) {
        if (sql_err) { return cb(sql_err); }
        if (err) { return cb(err); }

        benevoles = _.map(benevoles, function(benevole) {
          benevole.telephones = numeros[benevole.profile_id] || [];

          benevole.role = {
            code: benevole.role
          };

          benevole.langues = _.map(langues[benevole.profile_id], function(elem) {
            return elem.langue;
          });

          return benevole;
        });

        writer.writeRecord('benevoles', 'benevoles', benevoles);
        cb(null, benevoles);
      });
    });
  }
};
