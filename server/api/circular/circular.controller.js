'use strict';

var _ = require('lodash');
var Circular = require('./circular.model');

var Contact = require('../contact/contact.model');
var Account = require('../account/account.model');
var email = require('emailjs');

// sends circular to selected email group

function sendMail(req, res){
  Contact.find(function(err, contacts){
    var acc;
    if(err) { return handleError(res, err)}
    if(req.body.account){
      Account.findById(req.body.accout, function(err, account){
        acc = account;
      });
    }
    var server = email.server.connect({
        user: "chart@vrodnenok.in.ua",
        password: "8102977aa",
        host: "194.0.200.218",
        ssl: false
    });
    var mailOptions = {
      from: "Victor Rodnenok <chart@vrodnenok.in.ua>",
      to: "",
      subject: req.body.subj,
      text: req.body.text,
      attachment:
      {
        data: req.body.html,
        alternative:true
      }
    }
    for(var i=0; i < contacts.length; i++){
      mailOptions.to = contacts[i].email;
      server.send(mailOptions, function(error, info){
        if(error) {return res.json("there was an error" + error);}
      });
    }
    return;
  });
};


// Get list of circulars
exports.index = function(req, res) {
  Circular.find(function (err, circulars) {
    if(err) { return handleError(res, err); }
    return res.json(200, circulars);
  });
};

// Get a single circular
exports.show = function(req, res) {
  Circular.findById(req.params.id, function (err, circular) {
    if(err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    return res.json(circular);
  });
};

// Creates a new circular in the DB.
exports.create = function(req, res) {
  req.body._id = null;
  Circular.create(req.body, function(err, circular) {
    if(err) { return handleError(res, err); }
    sendMail (req, res);
    return res.json(201, circular);
  });
};

// Updates an existing circular in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Circular.findById(req.params.id, function (err, circular) {
    if (err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    var updated = _.merge(circular, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, circular);
    });
  });
};

// Deletes a circular from the DB.
exports.destroy = function(req, res) {
  Circular.findById(req.params.id, function (err, circular) {
    if(err) { return handleError(res, err); }
    if(!circular) { return res.send(404); }
    circular.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
