'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Region', RegionSchema);
