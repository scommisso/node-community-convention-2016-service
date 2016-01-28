'use strict';

var config = require('../config');

module.exports = function populateConfigMiddleware(req, res, next) {
  req.config = {
    get: config.get.bind(config, req.user)
  };
  next();
};
