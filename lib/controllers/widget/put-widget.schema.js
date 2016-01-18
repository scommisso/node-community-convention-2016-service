'use strict';

var multiAction = require('../../util/multi-action');
var swaggerValidation = require('../../middleware/swagger-validation');
var validateWidgetId = require('../../validators/validate-widget-id');

var spec = {
  method: 'PUT',
  path: '/widget/{widgetId}',
  nickname: 'putWidget',
  summary: 'Create a widget.',
  description: 'Creates a widget at the specified URI.',

  // See http://swagger.io/specification/ for more documentation on param types and data types
  parameters: [
    require('./parameters/path-widget-id'),
    {
      name: 'widget',
      description: 'The widget to create.',
      type: 'Widget',
      required: true,
      paramType: 'body'
    }],
  responseMessages: [{
    code: 422,
    message: 'Request body must be a valid widget.',
    responseModel: 'HttpError'
  }, {
    code: 400,
    message: 'Widget id in the request body must match the widget id specified in the path',
    responseModel: 'HttpError'
  }]
};

exports.putWidget = {
  action: multiAction([
    swaggerValidation(spec),
    validateWidgetId,
    require('./put-widget')
  ]),
  spec: spec
};
