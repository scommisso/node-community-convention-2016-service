'use strict';

var spec = {
  method: 'GET',
  path: '/hello/{person}',
  nickname: 'getHelloWorld',
  summary: 'Get a greeting message for a person.',
  description: 'This is a standard "hello world" route that gets a greeting message for a person.',
  notes: 'URL parameter person can be anything you want to say hello to.',
  type: 'string',

  // See http://swagger.io/specification/ for more documentation on param types and data types
  parameters: [{
    name: 'person',
    description: 'The name of a person.',
    type: 'string',
    required: true,
    paramType: 'path'
  }],
  responseMessages: [{
    code: 404,
    message: '"person" parameter was not specified',
    responseModel: 'HttpError'
  }]
};

exports.helloWorld = {
  action: require('./hello-world'),
  spec: spec
};
