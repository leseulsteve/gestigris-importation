'use strict';
var dataReader = require('../lib/data-reader'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/contact',
  getter = require('../lib/getter'),
  _ = require('lodash');

function getEtabIDs(partialObjList, objWithIDList, warn) {
  var idList = _.map(partialObjList, (function (partialObj) {
    var objWithID = _.find(objWithIDList, partialObj);

    if (objWithID) { return objWithID._id; }

    if (warn) { console.log("Aucun id trouvé pour : ", partialObj); }
    return undefined
  }));
  return idList;
}

function getPosteID(posteName, postes, warn) {
  var posteObj = _.find(postes, { description: posteName });

  if (posteObj) { return posteObj._id; }

  if (warn) { console.log("Aucun id trouvé pour : ", posteName); }
  return undefined;
}


module.exports = {
  export: function (cb) {
    dataReader.get('contacts', function (err, contacts) {
      if (err) { return cb(err); }

      getter.get('etablissement', function (err, etablissements) {
        if (err) { return cb(err); }

        getter.get('poste', function (err, postes) {
          if (err) { return cb(err); }

          getter.get('adresse/telephone', function (err, telephones) {
            if (err) {
              return cb(err);
            }

            contacts = _.map(contacts, function (contact) {

              contact.etablissements =
                getEtabIDs(contact.etablissements, etablissements);

              contact.poste = getPosteID(contact.poste, postes);

              contact.telephones = _.map(contact.telephones, function (tel) {
                var result = _.find(telephones, tel);
                if (result) { return result._id; }
                else { return undefined; }
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
