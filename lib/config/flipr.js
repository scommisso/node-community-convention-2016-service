'use strict';

var flipr = require('flipr');
var FliprYaml = require('flipr-yaml');
var source = new FliprYaml({
  folderPath: './lib/config',
  fileName: 'ab-config.yaml'
});

flipr.init({
  source: source,
  rules: [{
    type: 'percent',
    input: 'id'
  }]
});

module.exports = flipr;
