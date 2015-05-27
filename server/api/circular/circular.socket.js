/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Circular = require('./circular.model');

exports.register = function(socket) {
  Circular.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Circular.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('circular:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('circular:remove', doc);
}