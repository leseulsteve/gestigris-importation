'use strict';

const mysql = require('mysql');
const writer = require('../lib/data-writer');
const telephones = require('../lib/telephones-getter');
const login = require('../lib/login');
const requetes = require('../requetes');
const _ = require('lodash');

function normalize(ville) {
  switch (ville) {
    case 'Ancienne-Lorette':
      ville = "L'Ancienne-Lorette";
      break;
    case 'St-Augustin':
      ville = 'Saint-Augustin-de-Desmaures';
      break;
    case 'St-Marc-des-Carrières':
      ville = 'Saint-Marc-des-Carrières';
      break;
    case 'Chicoutimi':
      ville = 'Saguenay';
      break;
    case 'St-Gabriel-de-Valcartier ':
      ville = 'Saint-Gabriel-de-Valcartier';
      break;
    case 'Sainte-Catherine de la Jacques-Cartier':
    case 'Sainte-Catherine-de-la-Jacques-Cartier ':
      ville = 'Sainte-Catherine-de-la-Jacques-Cartier';
      break;
    case 'Val-Bélair':
    case 'Québec (Sainte-Foy-Sillery-Cap-Rouge)':
      ville = 'Québec';
      break;
    default:
      break;
  }

  return ville;
}

module.exports = {

  import: function(cb) {
    telephones.get('etablissements', function(err, numeros) {
      if (err) { return cb(err); }

      var requete;
      try {
        requete = requetes.get('etablissements');
      } catch (error) {
        return cb(error);
      }

      var connection = mysql.createConnection(login);

      connection.query(requete, function(err, etablissements) {
        if (err) { return cb(err); }

        etablissements = _.map(etablissements, function(etablissement) {
          etablissement.telephones = numeros[etablissement.id];

          // Assemblage du type d'établissement
          if (etablissement.type) {
            etablissement.type = {
              name: etablissement.type
            };
          } else {
            delete etablissement.type;
          }

          // Assemblage de la commission scolaire
          if (etablissement.commissionScolaire) {
            etablissement.commissionScolaire = {
              name: etablissement.commissionScolaire
            };
          } else {
            delete etablissement.commissionScolaire;
          }

          // Assemblage de l'adresse
          if (etablissement.province == 'QC') {
            etablissement.province = 'Québec';
          } else {
            console.warn('Province innatendue : ' + etablissement.province);
          }

          etablissement.address = {
            street: etablissement.street,
            city: {
              name: normalize(etablissement.city)
            },
            province: {
              name: etablissement.province
            },
            postalCode: etablissement.postalCode
          };
          delete etablissement.street;
          delete etablissement.city;
          delete etablissement.province;
          delete etablissement.postalCode;

          // Assemblage des coordonnées géographiques
          if (etablissement.lat && etablissement.lon) {
            etablissement.coordinates = {
              lat: etablissement.lat,
              long: etablissement.lon
            };
          }
          delete etablissement.lat;
          delete etablissement.lon;

          // Assemblage des notes
          if (etablissement.notes) {
            etablissement.notes = {
              admin: etablissement.notes
            };
          } else {
            delete etablissement.notes;
          }

          // Trim key with null and undefined values
          return _.omitBy(etablissement, _.isNil);
        });

        writer.writeRecord('etablissements', 'etablissements', etablissements);
        cb(null, etablissements);
      });

      connection.end();
    });
  }

};
