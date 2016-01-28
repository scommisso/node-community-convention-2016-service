'use strict';

var Swagger = require('../swagger');

module.exports = function (app) {

  // Redirect root requests to Swagger documentation
  app.get('/', function (req, res) {
    res.redirect(302, '/docs');
  });

  var swagger = new Swagger();
  swagger.setupSwagger(app);
};
