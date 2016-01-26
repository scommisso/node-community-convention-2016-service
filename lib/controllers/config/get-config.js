'use strict';

var async = require('async');

module.exports = function getConfig(req, res) {
  var keys = [
    // Nconf Static
    'staticJsonConfig',

    // Nconf Secure
    'db-user-name',
    'db-password',

    // Flipr Static
    'someStaticConfig',
    // Flipr Dynamic
    'someDynamicConfig'];

  var configActions = keys.reduce(function (acc, k) {
    acc[k] = req.config.get.bind(req.config, k);
    return acc;
  }, {});
  async.auto(configActions, function (err, results) {
    res.status(200).send(results);
  });
};
