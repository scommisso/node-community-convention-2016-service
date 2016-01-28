'use strict';

module.exports = function populateUserMiddleware(req, res, next) {
  req.user = {
    id: req.headers['x-userid'] || 'anonymous'
  };
  next();
};
