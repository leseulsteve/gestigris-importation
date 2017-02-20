const mysql = require('mysql');
const writer = require('../lib/data-writer');
const telephones = require('../lib/telephones-getter');
const login = require('../lib/login')
const requetes = require('../requetes');
const _ = require('lodash');

module.exports = {

  import: function(etablissements, cb) {

    var requeteContact;
    var requeteEtablissements;

    var contacts;
    var contactEtabs; // Une liste d'établissement pour chaque contact.

    try {
      var requeteContact = requetes.get('contacts');
      var requeteEtablissements = requetes.get('contact-etablissements');
    } catch (e) {
      return cb(e);
    }

    // Trouve les numéros de téléphones, trouve les contacts, puis
    // assemble le tout et sauvegarde chaque contact dans un fichier
    telephones.get('contacts', function(err, numeros) {
      if (err) { return cb(err); }
      // Pour garantir d'appeler cb qu'une seule fois, on doit retenir
      // une potentielle erreur mysql.
      var error;

      var connection = mysql.createConnection(login);

      connection.query(requeteContact, function(err, results) {
        if (err) {
          error = err;
          return;
        }

        contacts = results;
      });

      connection.query(requeteEtablissements, function(err, results) {
        if (err) {
          error = err;
          return;
        }

        contactEtabs = _.groupBy(results, 'profile_id');
      });

      connection.end(function(err) {
        if (error) { return cb(error); }
        if (err) { return cb(err); }

        // Préparation
        etablissements = _.keyBy(etablissements, 'id');

        // Traitement des contacts
        contacts = _.map(contacts, function(contact) {
          var etabList = contactEtabs[contact.profile_id];

          contact.etablissements = _.map(etabList, function(etab) {
            var etablissement = etablissements[etab.etablissement_id];

            if (!etablissement) {
              console.log('Établissements inconnu ! id = ' + etab.etablissement_id);
            }
            return _.pick(etablissement, ['name']);
          });

          contact.telephones = numeros[contact.profile_id] || [];

          if (contact.poste) {
            contact.poste = {
              'description': _.capitalize(contact.poste)
            };
          } else {
            delete contact.poste;
          }

          if (contact.note) {
            contact.notes = {
              'admin': contact.note
            };
          }
          delete contact.note;

          return _.omitBy(contact, _.isNil);
        });

        // writer.writeRecord('contacts', 'contacts', contacts);
        cb(null, contacts);
      });
    });
  }

};
