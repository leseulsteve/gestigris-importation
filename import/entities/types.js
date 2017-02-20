const mysql = require('mysql');
const wtr = require('../lib/data-writer');
const login = require('../lib/login');
const requetes = require('../requetes');
const _ = require('lodash');

module.exports = {
  import: function(cb) {

    try {
      var requeteTypes = requetes.get('types');
      var requetePostes = requetes.get('postes');
    } catch (err) {
      return cb(err);
    }
    var aggregat = {};

    var error;
    var connection = mysql.createConnection(login);

    connection.query(requeteTypes, [3], function(err, results) {
      if (err) { error = err; }
      // wtr.writeRecord('etablissementTypes', 'etablissementTypes', results);
      aggregat.etablissementTypes = results;
    });

    connection.query(requeteTypes, [5], function(err, results) {
      if (err) { error = err; }
      // wtr.writeRecord('interventionTypes', 'interventionTypes', results);
      aggregat.tags = results;
    });

    connection.query(requeteTypes, [6], function(err, results) {
      if (err) { error = err; }
      // wtr.writeRecord('commissionsScolaires', 'commissionsScolaires', results);
      aggregat.commissionsScolaires = results;
    });

    connection.query(requetePostes, function(err, results) {
      if (err) { error = err; }

      var postes = _.map(results, function(poste) {
        poste.description = _.capitalize(poste.description);
        return poste;
      });

      // wtr.writeRecord('postes', 'postes', postes);
      aggregat.postes = postes;
    });

    connection.end(function(err) {
      if (error) { return cb(error); }
      if (err) { return cb(err); }

      return cb(null, aggregat);
    });
  }

};
