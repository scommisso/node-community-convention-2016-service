'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var async = require('async');
var _ = require('lodash');
//var setupFlipr = require('./config/setup-flipr');
//var secureConfig = require('./config/secure-config');

var server = express();
initialize(server);
server.listen(3000);

function initialize(app) {
  registerMiddleware(app);
  //registerParamHandlers(app);
  app.enable('trust proxy');

  // We use all instead of use because we need req
  // properties set up by app.param handlers.
  // MUST be before route wireup.
  //app.all('*', fliprMiddleware);

  // This will make sure the latest config will be in the request object
  // It has to happen AFTER the flipr middleware.
  //app.use(require('./middleware/populate-config'));

  // Wire up the controller logic through Swagger
  require('./util/register-routes')(app);

  // Error handlers should be last in the middleware chain
  app.use(require('./middleware/error-handler'));
}

function registerMiddleware(app) {

  // TooBusy will detect event loop lag and respond with a 503 if the lag passes
  // a certain threshold.
  //app.use(require('./middleware/busy')(config.busyMaxLag));

  app.use('/public', require('serve-static')(__dirname + '/static/public'));

  // Setup timeouts at the individual route level in order to support different
  // timeout requirements for different actions.
  /*if (Array.isArray(config.timeout)) {
    config.timeout.forEach(function (value) {
      app[value.method || 'all'](value.path,
        require('./middleware/timeout')(
          value.timeout, { respond: true }
        )
      );
    });
  }*/

  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('method-override')());
  app.use(require('./middleware/cors'));
  app.use(require('./middleware/populate-user'));
}

function registerParamHandlers(app) {
  app.param('shopperId', require('./util/paramHandlers/shopper-id-validator'));
  app.param('optionalWebsiteId', require('./util/paramHandlers/optional-website-id-validator'));
  app.param('websiteId', require('./util/paramHandlers/required-website-id-validator'));
  app.param('pageId', require('./util/paramHandlers/page-id-validator'));
  app.param('elementId', require('./util/paramHandlers/element-id-validator'));
  app.param('themeId', require('./util/paramHandlers/theme-id-validator'));
  app.param('parentThemeId', require('./util/paramHandlers/parent-theme-id-validator'));
  app.param('localeId', require('./util/paramHandlers/locale-id-validator'));
}