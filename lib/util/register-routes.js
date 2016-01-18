'use strict';

var glob = require('glob');
var Swagger = require('../swagger');

module.exports = function (app) {

  // Redirect root requests to Swagger documentation
  app.get('/', function (req, res) {
    res.redirect(302, '/docs');
  });

  var swagger = new Swagger();
  swagger.setupSwagger(app);

  // Auto generate routes based on the controllers folder
  var controllerPaths = glob.sync('../controllers/*.js', {
    cwd: __dirname
  });

  controllerPaths.forEach(function (controllerPath) {
    require(controllerPath)(app);
  });
};
