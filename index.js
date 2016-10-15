'use strict';

var splittedArgs = process.argv[2].split(':');

if (splittedArgs[0] === '--export') {

	require('./entities/' + splittedArgs[1]).export(function(err) {
		if (err) {
			return console.error(err);
		}
		console.log('Exportation réussie!');
	});
}
