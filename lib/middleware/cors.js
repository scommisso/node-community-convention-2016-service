'use strict';

module.exports = function corsMiddleware(req, res, next) {
  var origin = req.headers.origin;
  //var corsWhitelist = req.config.cors.whitelist;
  var originIsWhitelisted = true; //corsWhitelist.indexOf(origin) !== -1;

  if (originIsWhitelisted) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');

    // Put any other custom headers that your client may pass in this list
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }

  // handle OPTIONS method (bypass controllers)
  if (req.method === 'OPTIONS') {
    if (originIsWhitelisted) return res.status(200).end();
    return next({
      status: 403,
      message: 'Request origin is not whitelisted',
      code: 'cors-middleware-forbidden'
    });
  }

  next();
};
