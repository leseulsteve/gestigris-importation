'use strict';

module.exports = {
  villes: require('./entities/ville'),
  province: require('./entities/province'),
  roles: require('./entities/benevole-roles'),

  commissionScolaire: require('./entities/commission-scolaire'),
  etablissementTypes: require('./entities/etablissement-types'),
  postes: require('./entities/postes'),
  tags: require('./entities/intervention-tags'),

  telephones: require('./entities/telephones'),

  etablissements: require('./entities/etablissements'),

  contacts: require('./entities/contacts'),

  benevoles: require('./entities/benevoles'),

  plages: require('./entities/intervention-plages'),
  interventions: require('./entities/interventions')
};
