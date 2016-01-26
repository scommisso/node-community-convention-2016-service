'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var async = require('async');
var _ = require('lodash');
var config = require('./config');

var server = express();
initialize(server);
server.listen(3000);

function initialize(app) {
  registerMiddleware(app);

  app.enable('trust proxy');

  // Wire up the controller logic through Swagger
  require('./util/register-routes')(app);

  // Error handlers should be last in the middleware chain
  app.use(require('./middleware/error-handler'));
}

function registerMiddleware(app) {

  // TooBusy will detect event loop lag and respond with a 503 if the lag passes
  // a certain threshold.
  app.use(require('./middleware/busy')(config.nconf.get('busyMaxLag')));

  app.use('/public', require('serve-static')(__dirname + '/static/public'));

  // Setup timeouts at the individual route level in order to support different
  // timeout requirements for different actions.
  var timeoutOptions = config.nconf.get('timeout');
  if (Array.isArray(timeoutOptions)) {
    timeoutOptions.forEach(function (value) {
      app[value.method || 'all'](value.path,
        require('./middleware/timeout')(
          value.timeout, { respond: true }
        )
      );
    });
  }

  app.use(require('body-parser').json({ extended: true }));
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('method-override')());
  app.use(require('./middleware/populate-user'));
  app.use(require('./middleware/populate-config'));
  app.use(require('./middleware/logger'));
  app.use(require('./middleware/cors'));
}
