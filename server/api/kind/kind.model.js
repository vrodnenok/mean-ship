'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KindSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Kind', KindSchema);