'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var CircularSchema = new Schema({
  text: String,
  html: String,
  subj: String,
  tonnage: {
    type: Number,
    min: 100,
    max: 500000
  },
  toBrokers: {
    type: Boolean,
    default: false
    },
  toOwners: {
    type: Boolean,
    default: false
    },
  toCharterers: {
    type: Boolean,
    default: false
    },
  toKind: {type: Schema.ObjectId, ref: "Kind"},
  toRegion: {type: Schema.ObjectId, ref: "Region"},
  comment: String,
  user: {type: Schema.ObjectId, ref: "User"}
});

CircularSchema.plugin(timestamps);

module.exports = mongoose.model('Circular', CircularSchema);
