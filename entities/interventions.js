'use strict';

var dataReader = require('../lib/data-reader'),
  getter = require('../lib/getter'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/intervention',
  _ = require('lodash');

// function getType(current, tout) {
//   return _.find(tout, ['name': current]]);
// }

module.exports = {

  export: function (cb) {
    dataReader.get('interventions', function (err, interventions) {
      if (err) {
        return cb(err);
      }

      interventions = _.flatten(interventions);
      // getter.get('intervention-types', function (err, types) {
      //   if (err) {
      //     return cb(err);
      //   }

        interventions = _.map(interventions, function (intervention) {
          //var type = getType(intervention.type, types);
          return {
            date: {
              start: "13:00",
              end: "14:00"
            },
            tags: []
          };
        });

        exporter.send(apiRoute, interventions, cb);
      // });
    });
  }
};
