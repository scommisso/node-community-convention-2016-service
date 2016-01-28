'use strict';

function validateWidgetId(req, res, next) {
  if (req.params.widgetId !== (req.body && req.body.id)) {
    return void next({
      status: 400,
      statusText: 'Bad Request',
      message: 'Widget id in the request body must match the widget id specified in the path'
    });
  }
  next();
}

module.exports = validateWidgetId;
