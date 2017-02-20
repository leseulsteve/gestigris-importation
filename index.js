'use strict';

const migration = require('./migration');

var splittedArgs = process.argv[2].split(':');

if (splittedArgs[0] === '--export') {

  migration[splittedArgs[1]](function(err) {
    if (err) { return console.error(err); }
    console.log('Exportation réussie!    ' + splittedArgs[1]);
  });
}
