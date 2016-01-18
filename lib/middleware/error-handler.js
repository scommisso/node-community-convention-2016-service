/*jshint unused:vars*/
// This is needed to keep the next param in the errorHandler function
// For some reason, the middleware won't function correctly without it.
'use strict';

var _ = require('lodash');
var hostname = require('os').hostname();
var processId = process.pid;

module.exports = function errorHandlerMiddleware(err, req, res, next) {
  if (err.details) err.detail = err.details;
  var errDetail = _.isString(err.detail) ? { detailedMessage: err.detail } : err.detail;
  var errDefault = {
    name: err.name || 'HttpError',
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    detail: _.assign({}, errDetail || {}, {
      original: err,
      diagnostics: _.assign({}, errDetail && errDetail.diagnostics || {}, {
        request: {
          url: req.url,
          method: req.method,
          headers: _.omit(req.headers, ['authorization', 'cookie']),
          jwt: req.jwt || null,
          body: filterPossiblyLargeObject(_.cloneDeep(req.body))
        },
        server: {
          host: hostname,
          pid: processId
        }
      })
    })
  };

  if (_.isString(err)) {
    err = _.merge(errDefault, { message: err });
  } else if (_.isNumber(err)) {
    err = _.merge(errDefault, { status: err });
  } else if (Array.isArray(err)) {
    err = errDefault;
  } else {
    err = _.merge(errDefault, _.pick(err, [
      'stack',
      'code',
      'remoteIp',
      'header'
    ]));
  }

  // log the error
  var level = err.status >= 500 ? 'error' : 'warn';

  if (req.logger) {
    req.logger[level](err.message, err);
  } else {
    console.log('LOGGER MISSING - attempted to log: ',
      require('util').inspect(err, { showHidden: false, depth: 2, colorize: true }));
  }

  if (res.headersSent) {
    res.end();
  } else {
    // send error to the client, without stack information
    var omitStack = _.partialRight(_.omit, 'stack');
    var errWithoutStack = _.cloneDeep(err, omitStack);
    errWithoutStack.detail = omitStack(errWithoutStack.detail);
    var userVisibleError = _.omit(errWithoutStack, 'detail');
    res.status(errWithoutStack.status).send({ error: userVisibleError });
  }
};

function filterPossiblyLargeObject(obj) {
  if (Buffer.isBuffer(obj)) return '<buffer>';
  if (_.isString(obj)) return obj.slice(0, Math.min(obj.length, 2000));
  if (_.isObject(obj)) {
    _.forOwn(obj, function (value, key) {
      obj[key] = filterPossiblyLargeObject(value);
    });
  }
  return null;
}
