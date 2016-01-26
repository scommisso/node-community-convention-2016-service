'use strict';

var path = require('path');
var nconf = require('./nconf');
var flipr = require('./flipr');

nconf.file('secure', {
  file: path.join(__dirname, 'secure-config.json'),
  secure: {
    secretPath: require.resolve(path.join(__dirname, 'secure-config-cert.key')),
    alg: 'aes-256-ctr'
  }
});
nconf.file(path.join(__dirname, 'config.json'));

function getConfigValue(input, key, callback) {
  var staticValue = nconf.get(key);
  var fliprConfig = flipr(input, key, function(err, value) {
    if (err && err.message.substring(0, 21) === 'Config item not found') {
      // Hide flipr config not found error
      return void callback(null, staticValue);
    }
    callback(err, value);
  });
}

module.exports = {
  get: getConfigValue,
  nconf: nconf,
  flipr: flipr
};
