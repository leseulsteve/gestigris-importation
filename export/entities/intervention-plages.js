'use strict';

const dataReader = require('../lib/data-reader');
const getter = require('../lib/getter');
const exporter = require('../lib/exporter');
const apiRoute = 'api/v1/plage-intervention';
const _ = require('lodash');

module.exports = {

  export: function(plages, cb) {

    getter.get('etablissement', function(err, etablissements) {
      if (err) { return cb(err); }

      getter.get('contact', function(err, contacts) {
        if (err) { return cb(err); }

        getter.get('intervention-tag', function(err, tags) {
          if (err) { return cb(err); }

          plages = _.map(plages, function(plage) {
            var etablissement = _.find(etablissements, plage.etablissement);
            plage.etablissement = etablissement._id;

            var contact = _.find(contacts, plage.contact);
            plage.contact = contact;

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
