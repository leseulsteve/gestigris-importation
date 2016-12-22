'use strict';

var dataReader = require('../lib/data-reader'),
  getter = require('../lib/getter'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/plage-intervention',
  _ = require('lodash');

function getEtablissement(current, tout) {
  var results = _.filter(tout, ['name', current]);

  if (results.length === 1) {
    return results[0];
  } else if (results.length > 0) {
    // Yé plus d'un établissement possède ce nom !
    return results[0];
  } else {
    console.log("L'établissement :" + current + " manque à l'appel dans la nouvelle base de données !");
    return null;
  }
}

function getIntervention(current, tout) {
}

function getTag(current, tout) {
}




module.exports = {

  export: function (cb) {
    dataReader.get('plagesInterventions', function (err, plages) {
      if (err) {
        return cb(err);
      }

      getter.get('etablissement', function (err, etablissements) {
        if (err) {
          return cb(err);
        }

        // getter.get('intervention', function (err, interventions) {
        //   if (err) {
        //     return cb(err);
        //   }
        //
        //   getter.get('intervention-tag', function (err, tags) {
        //     if (err) {
        //       return cb(err);
        //     }
            plages = _.map(plages, function (plage) {

              var etablissement = getEtablissement(plage.etablissement, etablissements);

              return {
                date: plage.date,
                // etablissement: {
                //   type: Schema.ObjectId,
                //   ref: 'etablissement'
                // },
                // interventions: [{
                //   type: Schema.ObjectId,
                //   ref: 'intervention'
                // }],
                conversation: null,
                tags: []
              };
            });

            exporter.send(apiRoute, plages, cb);
          });
        // });
      // });
    });
  }
};
