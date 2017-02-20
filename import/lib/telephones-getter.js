const mysql = require('mysql');
const login = require('./login');
const _ = require('lodash');
const requetes = require('../requetes');

// Définitions
var bundles = {
  etablissements: 'etablissement_demystifications',
  contacts: 'contact_tablissement',
  benevoles: 'profil_demystificateur',
  employes: 'employ_',
};

// Regroupe les numéros par numéro d'entité
function groupNumbers(list) {
  var telephones = _.groupBy(list, function(tel) {
    // Remove redundant id
    var id = tel.entityID;
    delete tel.entityID;

    return id;
  });

  return telephones;
}

function convertNumbers(telephones) {
  return _.map(telephones, function(tel) {
    tel.no = Number(tel.no.replace(/[^0-9]/g, ""));
    return tel;
  });
}


// Module
module.exports = {

  get: function(sel, cb) {

    var phoneNumbers;

    // Soumission des requetes et traitement
    var connection = mysql.createConnection(login);

    if (sel === 'all') {
      var requete = requetes.get('telephones');

      connection.query(requete, function(err, list) {
        phoneNumbers = convertNumbers(list);
      });

    } else {
      var requete = requetes.get('telephones-per-bundle');

      connection.query(requete, bundles[sel], function(err, list) {
        phoneNumbers = groupNumbers(convertNumbers(list));
      });
    }

    connection.end(function(err) {
      if (err) { return cb(err); }
      return cb(null, phoneNumbers);
    });
  }
};
