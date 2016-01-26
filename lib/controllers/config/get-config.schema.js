'use strict';

var spec = {
  method: 'GET',
  path: '/config',
  nickname: 'getConfig',
  summary: 'Get the configuration for the current user.',
  description: 'This is a contrived example that shows how configuration can be dynamic.',
  notes: 'Configuration is dynamic based on the "x-userid" header.',
  type: 'string'
};

exports.getConfig = {
  action: require('./get-config'),
  spec: spec
};
