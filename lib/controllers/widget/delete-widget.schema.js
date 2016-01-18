'use strict';

var spec = {
  method: 'DELETE',
  path: '/widget/{widgetId}',
  nickname: 'deleteWidget',
  summary: 'Deletes a widget.',
  description: 'Deletes a widget at the specified URI.',

  // See http://swagger.io/specification/ for more documentation on param types and data types
  parameters: [require('./parameters/path-widget-id')],
  responseMessages: [{
    code: 404,
    message: 'The specified widget does not exist',
    responseModel: 'HttpError'
  }]
};

exports.deleteWidget = {
  action: require('./delete-widget'),
  spec: spec
};
