'use strict';

var spec = {
  method: 'GET',
  path: '/widget/{widgetId}',
  nickname: 'getWidget',
  summary: 'Gets a widget.',
  description: 'Gets a widget at the specified URI.',
  type: 'Widget',

  // See http://swagger.io/specification/ for more documentation on param types and data types
  parameters: [require('./parameters/path-widget-id')],
  responseMessages: [{
    code: 404,
    message: 'The specified widget does not exist',
    responseModel: 'HttpError'
  }]
};

exports.getWidget = {
  action: require('./get-widget'),
  spec: spec
};
