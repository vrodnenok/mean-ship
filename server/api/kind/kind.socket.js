/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Kind = require('./kind.model');

exports.register = function(socket) {
  Kind.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Kind.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('kind:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('kind:remove', doc);
}