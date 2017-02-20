'use strict';

const request = require('request');

module.exports = {

  get: function(apiRoute, cb) {
    var options = {
      uri: 'http://localhost:9011/api/v1/' + apiRoute,
      method: 'GET'
    };

    // var options = {
    //   uri: 'http://138.197.154.99:90/ws/api/v1/' + apiRoute,
    //   method: 'GET'
    // };

    request(options, function(error, response, body) {

      if (!error && response.statusCode == 200) {
        try {
          return cb(null, JSON.parse(response.body));
        } catch (e) {
          error = e;
        }
      }

      return cb(error ||  {
        error: response.statusCode,
        reason: body.replace(/(\r\n|\n|\r)/gm, "")
      });
    });
  }
};
