'use strict';
var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/contact',
  getter = require('../lib/getter'),
  _ = require('lodash');

function getEtabs(currents, toutOld, toutNew) {
  var etabs = _.map(currents, (function (current) {
    // Cherche les établissements courant par nom dans toutNew
    var results = _.filter(toutNew, ['name', current.name]);
    if (results.length === 1) {
      return results[0];
    } else if (results.length > 0) {
      // Yé plus d'un établissement possède ce nom !
      return results[0];
    } else {
      console.log("L'établissement :" + current + " manque à l'appel dans la nouvelle base de données !");
      return [];
    }
  }));
  return etabs;
}

function getPoste(current, tout) {
  return _.find(tout, ['description', current]);
}
module.exports = {
  export: function (cb) {
    dataReader.get('contacts', function (err, contacts) {
      if (err) {
        return cb(err);
      }
      // Récupère les établissements dans './data/etablissements'
      // Les contacts contiennent une liste de numéros d'établissements
      // qui proviennent de la DB mysql.
      dataReader.get('etablissements', function (err, oldEtabs) {
        if (err) {
          return cb(err);
        }
        // Récupère les établissements de la nouvelle base de donnée
        getter.get('etablissement', function (err, newEtabs) {
          if (err) {
            return cb(err);
          }
          getter.get('poste', function (err, postes) {
            if (err) {
              return cb(err);
            }

            contacts = _.map(contacts, function (contact) {
              // Récupère de la nouvelle base de donnée les établissements
              // associés au contact
              var etabsContact = getEtabs(contact.etablissements, oldEtabs, newEtabs);
              // Récupère de la nouvelle base de donnée le poste
              // occupé par le contact
              var poste = getPoste(contact.poste, postes);
              return {
                firstname: contact.firstname,
                lastname: contact.lastname,
                poste: poste,
                email: contact.courriel,
                etablissements: etabsContact
              };
            });

            exporter.send(apiRoute, contacts, cb);
          });
        });
      });
    });
  }
};
