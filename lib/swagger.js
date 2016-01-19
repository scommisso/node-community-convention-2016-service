'use strict';

var glob = require('glob');
var express = require('express');
var swagger = require('swagger-node-express');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var sortSwaggerRoutes = require('./util/sort-swagger-routes');
var uuidValidator = require('./validators/uuid-validator.js');

function Swagger() {
  this.swagger = null;
}

Swagger.prototype.setupSwagger = function (app) {
  var swaggerInstance = swagger.createNew(app);
  this.swagger = swaggerInstance;

  this.addParamHandlers(app);
  this.addModels();
  this.addRoutes();

  // Add any custom headers here.
  swaggerInstance.setHeaders = function (res) {
    if (!res.headersSent) {
      res.header('Content-Type', 'application/json; charset=utf-8');
    }
  };

  swaggerInstance.configureSwaggerPaths('', 'api-docs', '');
  swaggerInstance.configure('/', '');

  // Serve up swagger ui at /docs via static route
  var fullpath = path.join(__dirname, '..', 'swagger-ui');
  //var fullpath = path.join(__dirname, '..', 'node_modules', 'swagger-node-express', 'swagger-ui');

  var docsHandler = express.static(fullpath);
  var swaggerDocHtml;

  app.get('/docs', function (req, res) {
    if (/\/docs$/.test(req.url) === true) { // express static barfs on root url w/o trailing slash
      return res.redirect(302, req.url + '/');
    }

    if (!swaggerDocHtml) {
      // block for documentation...
      swaggerDocHtml = fs.readFileSync(path.join(fullpath, 'index.html'), 'utf8');
    }

    res.end(swaggerDocHtml);
  });

  app.get('/docs/*', function (req, res, next) {
    // take off leading /docs so that connect locates file correctly
    var url = '/docs';
    req.url = req.url.substr(url.length);
    return docsHandler(req, res, next);
  });
};

Swagger.prototype.addModels = function () {
  var self = this;
  try {
    // Load the swagger models used for documentation and validation
    self.swagger.addModels({
      models: require('./models')
    });
  } catch (e) {
    // We don't want to throw any errors if models
    // don't exist.
  }
};

Swagger.prototype.addRoutes = function (namespace) {
  var self = this;
  var routePaths = glob.sync('./controllers/**/*.schema.js', {
    cwd: __dirname
  });

  var modules = _.map(routePaths, require);
  var routes = sortSwaggerRoutes(modules);

  // Wire up the swagger routes
  routes.forEach(function (route) {
    self.swagger.discover(route);
  });
};

Swagger.prototype.addParamHandlers = function (app) {
  app.param('widgetId', uuidValidator.bind(null, 'widgetId'));
};

module.exports = Swagger;
