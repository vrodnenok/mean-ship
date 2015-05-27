'use strict';

var _ = require('lodash');
var Kind = require('./kind.model');

// Get list of kinds
exports.index = function(req, res) {
  Kind.find(function (err, kinds) {
    if(err) { return handleError(res, err); }
    return res.json(200, kinds);
  });
};

// Get a single kind
exports.show = function(req, res) {
  Kind.findById(req.params.id, function (err, kind) {
    if(err) { return handleError(res, err); }
    if(!kind) { return res.send(404); }
    return res.json(kind);
  });
};

// Creates a new kind in the DB.
exports.create = function(req, res) {
  Kind.create(req.body, function(err, kind) {
    if(err) { return handleError(res, err); }
    return res.json(201, kind);
  });
};

// Updates an existing kind in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Kind.findById(req.params.id, function (err, kind) {
    if (err) { return handleError(res, err); }
    if(!kind) { return res.send(404); }
    var updated = _.merge(kind, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, kind);
    });
  });
};

// Deletes a kind from the DB.
exports.destroy = function(req, res) {
  Kind.findById(req.params.id, function (err, kind) {
    if(err) { return handleError(res, err); }
    if(!kind) { return res.send(404); }
    kind.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}