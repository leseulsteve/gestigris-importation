'use strict';

var dataReader = require('../lib/data-reader'),
  getter = require('../lib/getter'),
  exporter = require('../lib/exporter'),
  apiRoute = 'api/v1/plage-intervention',
  _ = require('lodash');

module.exports = {

  export: function(cb) {
    dataReader.get('plagesInterventions', function(err, plages) {
      if (err) { return cb(err); }

      getter.get('etablissement', function(err, etablissements) {
        if (err) { return cb(err); }

        getter.get('intervention-tag', function(err, tags) {
          if (err) { return cb(err); }

          plages = _.map(_.flatten(plages), function(plage) {
            var etablissement = _.find(etablissements, plage.etablissement);
            plage.etablissement = etablissement._id;

            plage.tags = _.map(plage.tags, function(tagName) {
              var tag = _.find(tags, ['name', tagName]);
              return tag._id;
            });

            return plage;
          });

          exporter.send(apiRoute, plages, cb);
        });
      });
    });
  }

};
