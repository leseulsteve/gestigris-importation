'use strict';

const writer = require('../lib/data-writer');
const telGetter = require('../lib/telephones-getter');

module.exports = {
  import: function(cb) {
    telGetter.get('all', function(err, telephones) {
      if (err) { return cb(err); }

      // writer.writeRecord('telephones', 'telephones', telephones);
      return cb(null, telephones);
    });
  }
}
