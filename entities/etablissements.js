'use strict';

var dataReader = require('../lib/data-reader'),
	exporter = require('../lib/exporter'),
	apiRoute = 'etablissement';

module.exports = {

	export: function(cb) {
		dataReader.get('etablissements', function(err, results) {
			if (err) {
				return cb(err);
			}
			// TODO: Transformer le data avant de l'exporter


			exporter.send(apiRoute, results, cb);
		});
	}
};