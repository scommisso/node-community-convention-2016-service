'use strict';

var widgets = require('../../services/widget-service');

module.exports = function putWidget(req, res) {
  widgets.upsert(req.body);
  res.sendStatus(201);
};
