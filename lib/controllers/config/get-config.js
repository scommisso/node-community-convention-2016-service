'use strict';

var async = require('async');

module.exports = function getConfig(req, res) {
  async.auto({
    // Nconf Static
    'staticJsonConfig': req.config.get.bind(req.config, 'staticJsonConfig'),

    // Nconf Secure
    'db-user-name': req.config.get.bind(req.config, 'db-user-name'),
    'db-password': req.config.get.bind(req.config, 'db-password'),

    // Flipr Static
    'someStaticConfig': req.config.get.bind(req.config, 'someStaticConfig'),

    // Flipr Dynamic
    'someDynamicConfig': req.config.get.bind(req.config, 'someDynamicConfig')
  }, function (err, results) {
    res.status(200).send(results);
  });
};
