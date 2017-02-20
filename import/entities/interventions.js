'use strict';
const mysql = require('mysql');
const requetes = require('../requetes');
const _ = require('lodash');
const login = require('../lib/login');
const writer = require('../lib/data-writer');

var interventions;
var participants;
var tags;

function groupInfo(list, key, path) {
  var groupedObjects = _.reduce(list, function(dict, elem) {
    var listForKey = dict[elem[key]] || [];
    listForKey.push(elem[path]);
    dict[elem[key]] = listForKey;
    return dict;
  }, {});

  return groupedObjects;
}

module.exports = {

  import: function(etablissements, contacts, benevoles, cb) {
    var requeteIntervention;
    var requeteParticipants;
    var requeteTags;

    try {
      requeteIntervention = requetes.get('interventions');
      requeteParticipants = requetes.get('intervention-participants');
      requeteTags = requetes.get('intervention-tags');
    } catch (err) {
      return cb(err);
    }

    const connection = mysql.createConnection(login);

    connection.query(requeteIntervention, function(err, result) {
      if (err) { return cb(err); }
      interventions = result;
    });

    connection.query(requeteParticipants, function(err, result) {
      if (err) { return cb(err); }
      participants = groupInfo(result, 'intervention_id', 'benevole_id');
    });

    connection.query(requeteTags, function(err, result) {
      if (err) { return cb(err); }
      tags = groupInfo(result, 'intervention_id', 'tag');
    });

    connection.end(function(err) {
      if (err) { return cb(err); }
      // Regroupe les contacts, les benevoles et les établissements par id
      // pour une recherche rapide.
      contacts = _.keyBy(contacts, 'id');
      etablissements = _.keyBy(etablissements, 'id');
      benevoles = _.keyBy(benevoles, 'id');


      // PRECONDITION: interventions triées par établissement, puis par date.
      var aggregat = _.reduce(interventions, function(acc, intervention) {
        // Ajout d'informations aux interventions
        intervention.tags = tags[intervention.id] || [];

        var etab = etablissements[intervention.etablissement_id];
        if (etab) {
          intervention.etablissement = _.pick(etab, ['name']);
        }

        var contact = contacts[intervention.contact_id];
        if (contact) {
          intervention.contact = _.pick(contact, ['firstname', 'lastname']);
        }

        var pList = participants[intervention.id] || [];
        intervention.participants = _.reduce(pList, function(result, participant_id) {
          var benevole = benevoles[participant_id];
          if (benevole) {
            result.push(_.pick(benevole, ['prenom', 'nomFamille', 'email']));
          }
          return result;
        }, []);

        // Création et gestion des plages d'intervention
        var current_plage = _.last(acc.plages);

        if (!current_plage || !current_plage.includes(intervention)) {
          // L'intervention n'appartient pas à la plage courante.
          current_plage = new Plage(intervention);
          acc.plages.push(current_plage);

        } else {
          // Ajoute les tags de l'intervention à la plage
          // en évitant les doublons
          _.union(current_plage.tags, intervention.tags);
        }
        intervention.plage = {
          date: current_plage.date.toISOString(),
          etablissement: current_plage.etablissement
        };

        // Formattage final des interventions
        // Group dates & notes
        intervention.date = {
          start: intervention.startTime,
          end: intervention.endTime
        };
        delete intervention.startTime;
        delete intervention.endTime;

        // Grouper les notes si elles existent
        if (intervention.notesAdmin || intervention.notesPublic) {
          var notes = {};
          if (intervention.notesAdmin) { notes.admin = intervention.notesAdmin; }
          if (intervention.notesPublic) { notes.public = intervention.notesPublic; }
          intervention.notes = notes;
        }
        delete intervention.notesAdmin;
        delete intervention.notesPublic;

        delete intervention.etablissement_id;
        delete intervention.contact_id;

        // Trim null & undefined values
        intervention = _.omitBy(intervention, _.isNil);

        acc.interventions.push(intervention);

        return acc;
      }, {
        plages: [],
        interventions: [],
      });

      // writer.writeRecord('interventions', 'interventions', aggregat.interventions);
      // writer.writeRecord('plagesInterventions', 'plages', aggregat.plages);

      return cb(null, aggregat);
    });
  }

};


function Plage(intervention) {
  this.date = intervention.date;
  this.etablissement = intervention.etablissement;
  this.tags = Array.isArray(intervention.tags) ? intervention.tags.slice() : [];
}

Plage.prototype.includes = function(intervention) {
  return (this.date.getTime() === intervention.date.getTime()) &&
    (this.etablissement_id === intervention.etablissement_id);
};
