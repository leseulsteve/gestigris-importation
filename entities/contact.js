'use strict';

const dataReader = require('../lib/data-reader');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/contact';
const getter = require('../lib/getter');
const _ = require('lodash');

module.exports = {
  export: function(cb) {
    dataReader.get('contacts', function(err, contacts) {
      if (err) { return cb(err); }

      getter.get('etablissement', function(err, etablissements) {
        if (err) { return cb(err); }

        getter.get('poste', function(err, postes) {
          if (err) { return cb(err); }

          getter.get('adresse/telephone', function(err, telephones) {
            if (err) { return cb(err); }

            contacts = _.map(_.flatten(contacts), function(contact) {
              if (contact.poste) {
                var poste = _.find(postes, contact.poste);
                if (!poste) {
                  console.log('Poste introuvable : ' + JSON.stringify(contact.poste));
                  return null;
                }
                contact.poste = poste._id;
              }

              contact.etablissements = _.map(contact.etablissements, function(etab) {
                var etablissement = _.find(etablissements, etab);
                if (!etablissement) {
                  console.log('Établissement introuvable : ' + JSON.stringify(etab));
                  return null;
                }

                return etablissement._id;
              });


              contact.telephones = _.map(contact.telephones, function(tel) {
                var telephone = _.find(telephones, tel);
                if (!telephone) {
                  console.log('Téléphone introuvable : ' + JSON.stringify(tel));
                  return null;
                }

                return telephone._id;
              });

              return contact;
            });

            exporter.send(apiRoute, contacts, cb);
          });
        });
      });
    });
  }

};
