'use strict';

var toobusy = require('toobusy-js');

module.exports = function (max) {
  max = parseInt(max, 10);
  if (!isNaN(max)) {
    if (Number.isFinite(max) && max > 0) {
      toobusy.maxLag(max);
    }
  }
  return function busy(req, res, next) {
    var isBusy = (max > 0) && toobusy();
    req.responseLag = toobusy.lag();
    next(
      isBusy && {
        status: 503,
        message: 'Service Unavailable',
        detail: {
          diagnostics: {
            lag: req.responseLag
          }
        }
      } || null);
  };
};
