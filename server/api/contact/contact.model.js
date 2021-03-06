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
  tonnage: {
    type: Number,
    default: 5000
  },
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
  isFiltered: {
    type: Boolean,
    default: false
    },
  prefAccount: {
    type: String,
    default: 'mg'
    },
  kind: {type: Schema.Types.ObjectId, ref: "Kind"},
  region: {type: Schema.Types.ObjectId, ref: "Region"},
  comment: String,
  active: {
    type: Boolean,
    default: true
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
