'use strict';

var widgets = require('../../services/widget-service');

module.exports = function putWidget(req, res) {
  widgets.delete(req.params.widgetId);
  res.sendStatus(204);
};
