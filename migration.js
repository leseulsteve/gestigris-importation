'use strict'

const importation = require('./import');
const exportation = require('./export');

module.exports = {

  villes: function(cb) {
    exportation.villes.export(cb);
  },

  provinces: function(cb) {
    exportation.province.export(cb);
  },

  roles: function(cb) {
    exportation.roles.export(cb);
  },

  types: function(cb) {
    importation.types.import(function(err, types) {
      if (err) { return cb(err); }

      exportation.commissionScolaire.export(types.commissionsScolaires, function(err) {
        if (err) { return cb(err); }

        exportation.etablissementTypes.export(types.etablissementTypes, function(err) {
          if (err) { return cb(err); }

          exportation.postes.export(types.postes, function(err) {
            if (err) { return cb(err); }


            exportation.tags.export(types.tags, function(err) {
              if (err) { return console.error(err); }

              return cb(null);
            });
          });
        });
      });
    });
  },

  benevoles: function(cb) {
    importation.benevoles.import(function(err, benevoles) {
      if (err) { return cb(err); }

      exportation.benevoles.export(benevoles, function(err) {
        if (err) { return cb(err); }
        return cb(null);
      });
    });
  },

  etablissements: function(cb) {
    importation.etablissements.import(function(err, etablissements) {
      if (err) { return cb(err); }

      exportation.etablissements.export(etablissements, function(err) {
        if (err) { return cb(err); }
        return cb(null);
      });
    });
  },

  contacts: function(cb) {
    importation.etablissements.import(function(err, etablissements) {
      if (err) { return cb(err); }

      importation.contacts.import(etablissements, function(err, contacts) {
        if (err) { return cb(err); }

        exportation.contacts.export(contacts, function(err) {
          if (err) { return cb(err); }
          cb(null);
        });
      });
    });
  },

  interventions: function(cb) {
    importation.etablissements.import(function(err, etablissements) {
      if (err) { return cb(err); }

      importation.contacts.import(etablissements, function(err, contacts) {
        if (err) { return cb(err); }

        importation.benevoles.import(function(err, benevoles) {
          if (err) { return cb(err); }

          importation.interventions.import(etablissements, contacts, benevoles, function(err, aggregat) {
            if (err) { return cb(err); }

            exportation.plages.export(aggregat.plages, function(err) {
              if (err) { return cb(err); }

              exportation.interventions.export(aggregat.interventions, function(err) {
                if (err) { return console.error(err); }
                cb(null);
              });
            });
          });
        });
      });
    });
  },


  plages: function(cb) {
    importation.etablissements.import(function(err, etablissements) {
      if (err) { return cb(err); }

      importation.contacts.import(etablissements, function(err, contacts) {
        if (err) { return cb(err); }

        importation.benevoles.import(function(err, benevoles) {
          if (err) { return cb(err); }

          importation.interventions.import(etablissements, contacts, benevoles, function(err, aggregat) {
            if (err) { return console.error(err); }

            exportation.plages.export(aggregat.plages, function(err) {
              if (err) { return console.error(err); }
              cb(null);
            });
          });
        });
      });
    });
  }

};
