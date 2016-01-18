'use strict'

module.exports = function populateUserMiddleware(req, res, next) {
  req.user = {};
  next();
};