'use strict'

const importation = require('./import');
const exportation = require('./export');
const success = 'Exportation réussie !    ';

// Standalone
exportation.villes.export(function(err) {
  if (err) { return console.error(err); }
  console.log(success + 'Villes');

  exportation.province.export(function(err) {
    if (err) { return console.error(err); }
    console.log(success + 'Province');

    exportation.roles.export(function(err) {
      if (err) { return console.error(err); }
      console.log(success + 'Rôles bénévoles');


      // Types
      importation.types.import(function(err, types) {
        if (err) { return console.error(err); }

        exportation.commissionScolaire.export(types.commissionsScolaires, function(err) {
          if (err) { return console.error(err); }
          console.log(success + 'Commissions scolaires');

          exportation.etablissementTypes.export(types.etablissementTypes, function(err) {
            if (err) { return console.error(err); }
            console.log(success + "Types d'établissement");

            exportation.postes.export(types.postes, function(err) {
              if (err) { return console.error(err); }
              console.log(success + 'Postes des contacts');

              // exportation.tags.export(types.tags, function(err) {
              //   if (err) { return console.error(err); }
              //   console.log(success + 'Tags des interventions');


              // Téléphones
              // importation.telephones.import(function(err, telephones) {
              //   if (err) { return console.error(err); }
              //
              //   exportation.telephones.export(telephones, function(err) {
              //     if (err) { return console.error(err); }
              //     console.log(success + 'Téléphones');


              // Établissements
              importation.etablissements.import(function(err, etablissements) {
                if (err) { return console.error(err); }


                exportation.etablissements.export(etablissements, function(err) {
                  if (err) { return console.error(err); }
                  console.log(success + 'Établissements');


                  // Contacts
                  importation.contacts.import(etablissements, function(err, contacts) {
                    if (err) { return console.error(err); }

                    exportation.contacts.export(contacts, function(err) {
                      if (err) { return console.error(err); }
                      console.log(success + 'Contacts');


                      // Bénévoles
                      importation.benevoles.import(function(err, benevoles) {
                        if (err) { return console.error(err); }

                        exportation.benevoles.export(benevoles, function(err) {
                          if (err) { return console.error(err); }
                          console.log(success + 'Bénévoles');


                          // Interventions & plages
                          // importation.interventions.import(etablissements, contacts, benevoles, function(err, aggregat) {
                          //   if (err) { return console.error(err); }
                          //
                          //   exportation.plages.export(aggregat.plages, function(err) {
                          //     if (err) { return console.error(err); }
                          //     console.log(success + "Plages d'intervention");
                          //
                          //     exportation.interventions.export(aggregat.interventions, function(err) {
                          //       if (err) { return console.error(err); }
                          //       console.log(success + 'Interventions');
                          //     });
                          //   });
                          // });
                        });
                      });
                    });
                  });
                });
              });
              // });
              // }); Téléphones
              // });
            });
          });
        });
      });
    });
  });
});
