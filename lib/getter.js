'use strict';

var request = require('request');

module.exports = {

	get: function(apiRoute, cb) {

		var options = {
			uri: 'http://localhost:9011/api/v1/' + apiRoute,
			method: 'GET'
		};

		request(options, function(error, response, body) {

			if (!error && response.statusCode == 200) {
				return cb(null, response.body);
			}
			return cb(error ||  {
				error: response.statusCode,
				reason: body.replace(/(\r\n|\n|\r)/gm,"")
			});
		});
	}
};
