'use strict';

var db = {};

function upsertWidget(widget) {
  db[widget.id] = widget;
}

function deleteWidget(id) {
  delete db[id];
}

function getWidget(id) {
  return db[id];
}

module.exports = {
  upsert: upsertWidget,
  delete: deleteWidget,
  get: getWidget
};
