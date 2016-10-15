'use strict';

var fs = require('fs'),
	path = require('path'),
	repertoires = require('../data/repertoires.json');

module.exports = {

	get: function(collectionName, cb) {

		var collection = [],
			collectionPath = path.join('.', repertoires[collectionName]);

		fs.readdir(collectionPath, function(err, fileNames) {
			if (err) {
				return cb(err);
			}
			fileNames.forEach(function(fileName, index) {
				collection.push(require(path.join('../', collectionPath, fileName)));
			});

			try {
				JSON.stringify(collection);
			} catch (error) {
				return cb(error);
			}

			cb(null, collection);
		});
	}
};