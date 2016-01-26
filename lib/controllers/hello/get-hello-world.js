'use strict';

module.exports = function getHelloWorld(req, res) {
  setTimeout(function () {
    res.status(200).send(JSON.stringify('Hello, ' + req.params.person));
  }, 500);
};
