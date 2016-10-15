'use strict';

var request = require('request');

module.exports = {

	send: function(apiRoute, data, cb) {

		var options = {
			uri: 'http://localhost:9011/' + apiRoute,
			method: 'POST',
			json: data
		};

		request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				return cb(null);
			}
			return cb(error ||  {
				error: response.statusCode,
				reason: body.replace(/(\r\n|\n|\r)/gm,"")
			});
		});
	}
};