'use strict';

var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'warn' })
  ]
});

module.exports = function loggerMiddleware(req, res, next) {
  req.logger = logger;
  next();
};
