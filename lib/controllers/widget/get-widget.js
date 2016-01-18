'use strict';

var widgets = require('../../services/widget-service');

module.exports = function getWidget(req, res) {
  var widget = widgets.get(req.params.widgetId);
  if (widget) {
    res.status(200).send(widget);
  } else {
    res.sendStatus(404);
  }
};
