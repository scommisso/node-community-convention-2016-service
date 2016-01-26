'use strict';

var path = require('path');
var nconf = require('nconf');

nconf.file('secure', {
  file: path.join(__dirname, 'secure-config.json'),
  secure: {
    secretPath: require.resolve(path.join(__dirname, 'secure-config-cert.key')),
    alg: 'aes-256-ctr'
  }
});
nconf.file(path.join(__dirname, 'config.json'));

module.exports = nconf;
