'use strict';

var connectTimeout = require('connect-timeout');

module.exports = function connectTimeoutWrapper() {
  var connectTimeoutHandler = connectTimeout.apply(null, Array.prototype.slice.call(arguments));
  return function (req, res, next) {
    if ('_connectTimeout' in req) {
      // only process timeout on first matching rule
      return void next();
    }
    req._connectTimeout = true;
    connectTimeoutHandler.call(null, req, res, next);
  };
};
