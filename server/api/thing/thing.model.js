'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  user: {type: Schema.ObjectId, ref: 'User'}
});

ThingSchema.plugin(timestamps);

module.exports = mongoose.model('Thing', ThingSchema);
