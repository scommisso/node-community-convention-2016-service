'use strict';

module.exports = function getHelloWorld(req, res) {
  res.status(200).send(JSON.stringify('Hello, ' + req.params.person));
};
