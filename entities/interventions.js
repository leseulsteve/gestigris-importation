'use strict';

var dataReader = require('../lib/data-reader');
var getter = require('../lib/getter');
var exporter = require('../lib/exporter');
const apiRoute = 'api/v1/intervention';
var _ = require('lodash');

module.exports = {

  export: function (cb) {
    dataReader.get('interventions', function (err, interventions) {
      if (err) { return cb(err); }

      getter.get('plage-intervention', function (err, plages) {
        if (err) { return cb(err); }

        getter.get('benevole', function (err, benevoles) {
          if (err) { return cb(err); }

          getter.get('contact', function (err, contacts) {
            if (err) { return cb(err); }

            getter.get('intervention-tag', function (err, tags) {
              if (err) { return cb(err); }

              getter.get('etablissement', function (err, etablissements) {
                if (err) { return cb(err); }

                interventions = _.map(_.flatten(interventions), function (intervention) {
                  var plage = _.find(plages, intervention.plage);
                  if (!plage) { console.log("Plage not found! "); }
                  intervention.plage = plage._id;


                  var contact = _.find(contacts, intervention.contact);
                  if (!contact) { console.log("Contact not found! ", intervention.contact); }
                  intervention.contact = contact._id;


                  var etablissement = _.find(etablissements, intervention.etablissement);
                  if (!etablissement) { console.log("Établissement not found! "); }
                  intervention.etablissement = etablissement._id;


                  intervention.tags = _.map(intervention.tags, function (tagName) {
                    var tag = _.find(tags, ['name', tagName]);
                    if (!tag) { console.log('Tag not found: ' + tagName); }
                    return tag._id;
                  });

                  intervention.participants = _.map(intervention.participants, function (participant) {
                    var benevole = _.find(benevoles, participant);
                    if (!benevole) { console.log(participant); }
                    return benevole._id
                  });

                  delete intervention.responsableGroupe;
                  return intervention;
                });

                exporter.send(apiRoute, interventions, cb);
              });
            });
          });
        });
      });
    });
  }
};
