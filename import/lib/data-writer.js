var fs = require('fs');
var path = require('path');

var dirs = {
  data: './data',
  contacts: './data/contacts',
  postes: './data/postes',
  etablissements: './data/etablissements',
  etablissementTypes: './data/etablissement-types',
  commissionsScolaires: './data/commissions-scolaires',
  interventions: './data/interventions',
  plagesInterventions: './data/plages-interventions',
  interventionTypes: './data/intervention-types',
  benevoles: './data/benevoles',
  telephones: './data/telephones'
};

module.exports = {
  createDirectories: function() {
    try {
      fs.accessSync(dirs.data, fs.W_OK);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Les répertoires n'existent pas alors on les crées
        fs.mkdirSync(dirs.data);
        fs.mkdirSync(dirs.contacts);
        fs.mkdirSync(dirs.postes);
        fs.mkdirSync(dirs.etablissements);
        fs.mkdirSync(dirs.etablissementTypes);
        fs.mkdirSync(dirs.interventions);
        fs.mkdirSync(dirs.plagesInterventions);
        fs.mkdirSync(dirs.interventionTypes);
        fs.mkdirSync(dirs.commissionsScolaires);
        fs.mkdirSync(dirs.benevoles);
        fs.mkdirSync(dirs.telephones);

        var villesData = fs.readFileSync('./ville.json', 'utf-8');
        fs.writeFileSync('./data/ville.json', villesData, 'utf-8');
      }
    }
  },

  writeRecord: function(type, id, obj) {
    var dirPath = path.join(dirs[type], id + '.json');

    fs.writeFile(dirPath, JSON.stringify(obj), 'utf-8', function(error) {
      if (error) { console.log(error); }
    });
  },

  writeDirectories: function() {
    var dirPath = path.join(dirs.data, 'repertoires.json');
    fs.writeFile(dirPath, JSON.stringify(dirs), 'utf-8');
  }
}
