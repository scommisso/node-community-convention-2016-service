'use strict';

var winston = require('winston');
var nconf = require('../config/nconf');

var transports = nconf.get('logger').transports
  .map(function (transport) {
    return new winston.transports
      [transport.transport]
      (transport.options);
  });

var logger = new (winston.Logger)({
  transports: transports
});

module.exports = function loggerMiddleware(req, res, next) {
  req.logger = logger;
  next();
};
