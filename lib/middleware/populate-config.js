'use strict'

// TODO: Flipr
var config = require('../config');

module.exports = function populateConfigMiddleware(req, res, next) {
  req.config = config;
  next();
};