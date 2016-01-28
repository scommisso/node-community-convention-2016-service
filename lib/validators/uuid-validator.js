'use strict';

var uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

module.exports = function (fieldName, req, res, next, value) {
  if (!uuidRegex.test(value)) {
    return void next({
      status: 400,
      statusText: 'Bad Request',
      message: 'Invalid ' + fieldName + ': ' + value
    });
  }
  next();
};
