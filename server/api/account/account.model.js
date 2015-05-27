'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
  provider: String,
  username: String,
  smtp: String,
  port: Number,
  active: Boolean
});

module.exports = mongoose.model('Account', AccountSchema);
