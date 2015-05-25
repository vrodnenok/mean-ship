'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
    },
  phone: String,
  phoneMob: String,
  company: String,
  isBroker: {
    type: Boolean,
    default: false
    },
  isOwner: {
    type: Boolean,
    default: false
    },
  isCharterer: {
    type: Boolean,
    default: false
    },
  size: {type: Schema.ObjectId, ref: "Size"},
  region: {type: Schema.ObjectId, ref: "Region"},
  comment: String,
  active: {
    type: Boolean,
    default: true
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
