'use strict';

var _ = require('lodash');
var validate = require('swagger-validation');
var models = require('../models');

module.exports = swaggerValidation;

function swaggerValidation(spec) {
  return function swaggerValidation(req, res, next) {
    var result = validate(spec, req, models);

    // empty result means validation was successful
    // move on to next action.
    if (!result || !result.length)
      return void next();

    var errors = _.map(_.map(result, 'error'), 'message');
    var message = 'Validation Error: ' + errors;
    return void next({
      status: 422,
      statusText: 'Unprocessable Entity',
      message: message
    });
  };
}
